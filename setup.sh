#!/bin/bash

# Quick setup script
echo "=== Team Management System - Quick Setup ==="
echo ""

# Create .env file if it doesn't exist
if [ ! -f backend/.env ]; then
    echo "Creating .env file from .env.example..."
    cp backend/.env.example backend/.env
    echo "Please update backend/.env with your MongoDB Atlas connection string"
fi

echo ""
echo "Installing backend dependencies..."
cd backend
npm install
cd ..

echo ""
echo "Ready to start development!"
echo ""
echo "To start with Docker Compose:"
echo "  ./start-dev.sh"
echo ""
echo "To run locally:"
echo "  Terminal 1: cd backend && npm run dev"
echo "  Terminal 2: cd frontend && npm start"
echo ""
echo "To deploy to Kubernetes:"
echo "  ./deploy-k8s.sh"
