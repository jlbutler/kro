// Copyright Amazon.com Inc. or its affiliates. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License"). You may
// not use this file except in compliance with the License. A copy of the
// License is located at
//
//     http://aws.amazon.com/apache2.0/
//
// or in the "license" file accompanying this file. This file is distributed
// on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
// express or implied. See the License for the specific language governing
// permissions and limitations under the License.

package resourcegraphdefinition

import (
	"context"
	"fmt"
	"strings"

	"github.com/go-logr/logr"
	"github.com/gobuffalo/flect"
	"k8s.io/apimachinery/pkg/runtime/schema"

	"github.com/kro-run/kro/api/v1alpha1"
	"github.com/kro-run/kro/pkg/metadata"
)

// cleanupResourceGraphDefinition handles the deletion of a ResourceGraphDefinition by shutting down its associated
// microcontroller and cleaning up the CRD if enabled. It executes cleanup operations in order:
// 1. Shuts down the microcontroller
// 2. Deletes the associated CRD (if CRD deletion is enabled)
func (r *ResourceGraphDefinitionReconciler) cleanupResourceGraphDefinition(ctx context.Context, rgd *v1alpha1.ResourceGraphDefinition) error {
	log, _ := logr.FromContext(ctx)
	log.V(1).Info("cleaning up resource group", "name", rgd.Name)

	// shutdown microcontroller
	gvr := metadata.GetResourceGraphDefinitionInstanceGVR(rgd.Spec.Schema.Group, rgd.Spec.Schema.APIVersion, rgd.Spec.Schema.Kind)
	if err := r.shutdownResourceGraphDefinitionMicroController(ctx, &gvr); err != nil {
		return fmt.Errorf("failed to shutdown microcontroller: %w", err)
	}

	group := rgd.Spec.Schema.Group
	if group == "" {
		group = v1alpha1.KroDomainName
	}
	// cleanup CRD
	crdName := extractCRDName(group, rgd.Spec.Schema.Kind)
	if err := r.cleanupResourceGraphDefinitionCRD(ctx, crdName); err != nil {
		return fmt.Errorf("failed to cleanup CRD %s: %w", crdName, err)
	}

	return nil
}

// shutdownResourceGraphDefinitionMicroController stops the dynamic controller associated with the given GVR.
// This ensures no new reconciliations occur for this resource type.
func (r *ResourceGraphDefinitionReconciler) shutdownResourceGraphDefinitionMicroController(ctx context.Context, gvr *schema.GroupVersionResource) error {
	if err := r.dynamicController.StopServiceGVK(ctx, *gvr); err != nil {
		return fmt.Errorf("error stopping service: %w", err)
	}
	return nil
}

// cleanupResourceGraphDefinitionCRD deletes the CRD with the given name if CRD deletion is enabled.
// If CRD deletion is disabled, it logs the skip and returns nil.
func (r *ResourceGraphDefinitionReconciler) cleanupResourceGraphDefinitionCRD(ctx context.Context, crdName string) error {
	if !r.allowCRDDeletion {
		log, _ := logr.FromContext(ctx)
		log.Info("skipping CRD deletion (disabled)", "crd", crdName)
		return nil
	}

	if err := r.crdManager.Delete(ctx, crdName); err != nil {
		return fmt.Errorf("error deleting CRD: %w", err)
	}
	return nil
}

// extractCRDName generates the CRD name from a given kind by converting it to plural form
// and appending the Kro domain name.
func extractCRDName(group, kind string) string {
	return fmt.Sprintf("%s.%s",
		flect.Pluralize(strings.ToLower(kind)),
		group)
}