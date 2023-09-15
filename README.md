# Ticketing

Learning project for microservices using Kubernetes.

## Browser setup: Firefox

1. Type about:config in the address bar and press Enter. A warning page may appear. Click Accept the Risk and Continue.
1. Change the following settings:

```
security.insecure_field_warning.contextual.enabled = false
security.certerrors.permanentOverride = false
network.stricttransportsecurity.preloadlist = false
security.enterprise_roots.enabled = true
```

## Project setup

Start Minikube with:

> minikube start

Run skaffold:

> skaffold dev
