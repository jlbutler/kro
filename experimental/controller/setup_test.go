package graphcontroller

import "testing"

func TestGraphNameFromRevision(t *testing.T) {
	tests := []struct {
		revName string
		want    string
	}{
		{"my-graph-g00001", "my-graph"},
		{"simple-g00042", "simple"},
		{"app-g99999", "app"},
		{"staging-gateway-g00001", "staging-gateway"},
		{"my-great-app-g00003", "my-great-app"},
		{"g-test-g00001", "g-test"},
		{"a-g-b-g-c-g00001", "a-g-b-g-c"},
		{"no-generation", "no-generation"},
		{"trailing-g", "trailing-g"},
		{"trailing-gabc", "trailing-gabc"},
		{"g-g00001", "g"},
		{"x-g00001", "x"},
	}
	for _, tt := range tests {
		t.Run(tt.revName, func(t *testing.T) {
			if got := graphNameFromRevision(tt.revName); got != tt.want {
				t.Errorf("graphNameFromRevision(%q) = %q, want %q", tt.revName, got, tt.want)
			}
		})
	}
}
