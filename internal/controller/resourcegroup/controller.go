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

package resourcegroup

import (
	"context"

	"github.com/go-logr/logr"
	ctrl "sigs.k8s.io/controller-runtime"
	"sigs.k8s.io/controller-runtime/pkg/client"
	"sigs.k8s.io/controller-runtime/pkg/log"

	"github.com/awslabs/kro/api/v1alpha1"
	kroclient "github.com/awslabs/kro/internal/client"
	"github.com/awslabs/kro/internal/dynamiccontroller"
	"github.com/awslabs/kro/internal/graph"
	"github.com/awslabs/kro/internal/metadata"
)

//+kubebuilder:rbac:groups=kro.run,resources=resourcegroups,verbs=get;list;watch;create;update;patch;delete
//+kubebuilder:rbac:groups=kro.run,resources=resourcegroups/status,verbs=get;update;patch
//+kubebuilder:rbac:groups=kro.run,resources=resourcegroups/finalizers,verbs=update

// ResourceGroupReconciler reconciles a ResourceGroup object
type ResourceGroupReconciler struct {
	log        logr.Logger
	rootLogger logr.Logger

	allowCRDDeletion bool

	client.Client
	clientSet  *kroclient.Set
	crdManager kroclient.CRDClient

	metadataLabeler   metadata.Labeler
	rgBuilder         *graph.Builder
	dynamicController *dynamiccontroller.DynamicController
}

func NewResourceGroupReconciler(
	log logr.Logger,
	mgrClient client.Client,
	clientSet *kroclient.Set,
	allowCRDDeletion bool,
	dynamicController *dynamiccontroller.DynamicController,
	builder *graph.Builder,
) *ResourceGroupReconciler {
	crdWrapper := clientSet.CRD(kroclient.CRDWrapperConfig{
		Log: log,
	})
	rgLogger := log.WithName("controller.resourceGroup")

	return &ResourceGroupReconciler{
		rootLogger:        log,
		log:               rgLogger,
		clientSet:         clientSet,
		Client:            mgrClient,
		allowCRDDeletion:  allowCRDDeletion,
		crdManager:        crdWrapper,
		dynamicController: dynamicController,
		metadataLabeler:   metadata.NewKroMetaLabeler("dev", "pod-id"),
		rgBuilder:         builder,
	}
}

// SetupWithManager sets up the controller with the Manager.
func (r *ResourceGroupReconciler) SetupWithManager(mgr ctrl.Manager) error {
	return ctrl.NewControllerManagedBy(mgr).
		For(&v1alpha1.ResourceGroup{}).
		Complete(r)
}

// Reconcile is part of the main kubernetes reconciliation loop which aims to
// move the current state of the cluster closer to the desired state.
// TODO(user): Modify the Reconcile function to compare the state specified by
// the ResourceGroup object against the actual cluster state, and then
// perform operations to make the cluster state reflect the state specified by
// the user.
//
// For more details, check Reconcile and its Result here:
// - https://pkg.go.dev/sigs.k8s.io/controller-runtime@v0.16.3/pkg/reconcile
func (r *ResourceGroupReconciler) Reconcile(ctx context.Context, req ctrl.Request) (ctrl.Result, error) {
	rlog := r.log.WithValues("resourcegroup", req.NamespacedName)
	ctx = log.IntoContext(ctx, rlog)

	var resourcegroup v1alpha1.ResourceGroup
	err := r.Get(ctx, req.NamespacedName, &resourcegroup)
	if err != nil {
		return ctrl.Result{}, client.IgnoreNotFound(err)
	}

	// reconcile resourcegroup fiesta
	err = r.reconcile(ctx, &resourcegroup)
	if err != nil {
		return ctrl.Result{}, err
	}

	return ctrl.Result{}, nil
}

func (r *ResourceGroupReconciler) reconcile(ctx context.Context, resourcegroup *v1alpha1.ResourceGroup) error {
	log, _ := logr.FromContext(ctx)
	// if deletion timestamp is set, call cleanupResourceGroup
	if !resourcegroup.DeletionTimestamp.IsZero() {
		log.V(1).Info("ResourceGroup is being deleted")
		err := r.cleanupResourceGroup(ctx, resourcegroup)
		if err != nil {
			return err
		}

		log.V(1).Info("Setting resourcegroup as unmanaged")
		// remove finalizer
		err = r.setUnmanaged(ctx, resourcegroup)
		if err != nil {
			return err
		}

		return nil
	}

	log.V(1).Info("Setting resource group as managed")
	// set finalizer
	err := r.setManaged(ctx, resourcegroup)
	if err != nil {
		return err
	}

	log.V(1).Info("Syncing resourcegroup")
	topologicalOrder, resourcesInformation, reconcileErr := r.reconcileResourceGroup(ctx, resourcegroup)

	log.V(1).Info("Setting resourcegroup status")
	// set status
	err = r.setResourceGroupStatus(ctx, resourcegroup, topologicalOrder, resourcesInformation, reconcileErr)
	if err != nil {
		return err
	}
	return nil
}
