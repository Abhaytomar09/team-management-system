#!/bin/bash

# Start development environment with Docker Compose
echo "Starting Team Management System..."

docker compose up --build

echo "Services running on:"
echo "Frontend: http://localhost:3000"
echo "Backend: http://localhost:5000"
echo "MongoDB: mongodb://localhost:27017"
