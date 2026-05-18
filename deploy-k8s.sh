#!/bin/bash

# Kubernetes deployment script
echo "Deploying to Kubernetes..."

# Start Minikube if not running
echo "Checking Minikube status..."
minikube start

# Apply Kubernetes manifests
echo "Applying Kubernetes manifests..."
kubectl apply -f k8s/

# Wait for deployments to be ready
echo "Waiting for deployments to be ready..."
kubectl wait --for=condition=available --timeout=300s deployment/backend
kubectl wait --for=condition=available --timeout=300s deployment/frontend

# Get service info
echo ""
echo "Deployment complete! Services:"
kubectl get services
echo ""
echo "Port forwarding setup:"
echo "To access backend: kubectl port-forward svc/backend-service 5000:5000"
echo "To access frontend: kubectl port-forward svc/frontend-service 3000:3000"
