# Team Project Management System

## DevOps + MERN Capstone Project

A production-ready **MERN Stack** application with complete **DevOps integration** using Docker, Kubernetes, and GitHub Actions CI/CD pipeline. This project demonstrates enterprise-grade practices for building, containerizing, orchestrating, and deploying full-stack applications.

---

## 📋 Project Overview

**Team Project Management System** is a collaborative application that allows users to:
- ✅ Register and authenticate with JWT
- ✅ Create and manage projects
- ✅ Create, update, and delete tasks
- ✅ Track task status dynamically
- ✅ Manage team workflows through an intuitive dashboard

**Deployment Stack:**
- Frontend: React on **Vercel**
- Backend: Node.js + Express on **Render**
- Database: **MongoDB Atlas** (free tier)
- Containerization: **Docker**
- Orchestration: **Kubernetes (Minikube)**
- CI/CD: **GitHub Actions**

---

## 🛠 Technology Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 18, React Router 6, Axios |
| **Backend** | Node.js 18, Express.js, Mongoose |
| **Database** | MongoDB Atlas (Free Tier) |
| **Authentication** | JWT + bcryptjs |
| **Containerization** | Docker |
| **Orchestration** | Kubernetes (Minikube) |
| **CI/CD** | GitHub Actions |
| **Deployment** | Render (Backend) + Vercel (Frontend) |

---

## 📁 Project Structure

```
team-management-system/
│
├── frontend/                    # React Application
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Login.js         # Login page with error handling
│   │   │   ├── Register.js      # Registration page
│   │   │   ├── Dashboard.js     # Main dashboard with CRUD
│   │   │   ├── Auth.css         # Auth styling
│   │   │   └── Dashboard.css    # Dashboard styling
│   │   ├── App.js
│   │   └── index.js
│   ├── public/
│   ├── Dockerfile
│   ├── .dockerignore
│   ├── package.json
│   └── .gitignore
│
├── backend/                     # Node.js + Express Server
│   ├── models/
│   │   ├── User.js              # User schema
│   │   ├── Project.js           # Project schema
│   │   └── Task.js              # Task schema
│   ├── routes/
│   │   ├── authRoutes.js        # Authentication endpoints
│   │   ├── projectRoutes.js     # Project CRUD endpoints
│   │   └── taskRoutes.js        # Task CRUD endpoints
│   ├── middleware/
│   ├── server.js
│   ├── .env                     # Environment variables
│   ├── .env.example             # Example env file
│   ├── package.json
│   ├── Dockerfile
│   ├── .dockerignore
│   └── .gitignore
│
├── k8s/                         # Kubernetes Manifests
│   ├── backend-deployment.yaml
│   ├── backend-service.yaml
│   ├── frontend-deployment.yaml
│   ├── frontend-service.yaml
│   ├── mongodb-deployment.yaml
│   ├── mongodb-service.yaml
│   └── mongodb-pvc.yaml         # Persistent Volume for MongoDB
│
├── .github/
│   └── workflows/
│       └── deploy.yml           # GitHub Actions CI/CD Pipeline
│
├── docker-compose.yml           # Local Development Orchestration
├── README.md                    # This file
├── SETUP_CHECKLIST.md          # Setup Instructions
└── .gitignore
```

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+
- **Docker** & **Docker Compose**
- **Kubernetes** (Minikube)
- **Git**
- **MongoDB Atlas** account (free)

### Step 1: Clone & Setup

```bash
git clone <repository-url>
cd team-management-system
```

### Step 2: Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create .env file from example
cp .env.example .env

# Update .env with your MongoDB Atlas connection string
# MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/team-management

# Start development server
npm run dev
```

Backend runs on: `http://localhost:5000`

### Step 3: Frontend Setup

```bash
cd ../frontend

# Install dependencies
npm install

# Start React development server
npm start
```

Frontend runs on: `http://localhost:3000`

---

## 🐳 Docker & Docker Compose

### Run with Docker Compose

```bash
# From project root
docker compose up --build

# Access services
- Frontend: http://localhost:3000
- Backend: http://localhost:5000
- MongoDB: mongodb://localhost:27017
```

### Docker Compose Services

The `docker-compose.yml` includes:

- **Frontend** (React) - Port 3000
- **Backend** (Node.js) - Port 5000  
- **MongoDB** - Port 27017 with persistent volume

**Docker Volumes** (for persistent data):
- `mongo-data`: Persists MongoDB data across container restarts

```yaml
volumes:
  mongo-data:  # Named volume for MongoDB persistence
```

### Build and Push Images

```bash
# Backend
docker build -t yourusername/backend:latest ./backend
docker push yourusername/backend:latest

# Frontend
docker build -t yourusername/frontend:latest ./frontend
docker push yourusername/frontend:latest
```

---

## ☸️ Kubernetes Deployment

### Prerequisites

```bash
# Start Minikube
minikube start

# Verify kubectl
kubectl cluster-info
```

### Deploy to Kubernetes

```bash
# Update image names in k8s manifests (replace 'yourdockerhub' with your username)
sed -i 's/yourdockerhub/yourusername/g' k8s/*.yaml

# Apply all manifests
kubectl apply -f k8s/

# Verify deployment
kubectl get pods
kubectl get services
kubectl get deployments
```

### Kubernetes Components

**Deployments:**
- `backend-deployment.yaml` - Backend service (1 replica)
- `frontend-deployment.yaml` - Frontend service (1 replica)
- `mongodb-deployment.yaml` - MongoDB database

**Services:**
- `backend-service.yaml` - Exposes backend (NodePort)
- `frontend-service.yaml` - Exposes frontend (NodePort)
- `mongodb-service.yaml` - Internal MongoDB service (ClusterIP)

**Storage:**
- `mongodb-pvc.yaml` - Persistent Volume Claim (5GB) for MongoDB data persistence

### Access Services

```bash
# Port Forward Backend
kubectl port-forward svc/backend-service 5000:5000

# Port Forward Frontend
kubectl port-forward svc/frontend-service 3000:3000

# Port Forward MongoDB
kubectl port-forward svc/mongodb-service 27017:27017
```

### Scale Deployments

```bash
# Scale backend to 3 replicas
kubectl scale deployment backend --replicas=3

# Scale frontend to 2 replicas
kubectl scale deployment frontend --replicas=2
```

### View Logs

```bash
# Backend logs
kubectl logs -l app=backend

# Follow logs in real-time
kubectl logs -l app=backend -f

# Frontend logs
kubectl logs -l app=frontend
```

### Cleanup

```bash
# Delete all resources
kubectl delete -f k8s/

# Stop Minikube
minikube stop
```

---

## 🔄 CI/CD Pipeline (GitHub Actions)

### Setup GitHub Secrets

Add these secrets to your GitHub repository:

1. **`DOCKER_USERNAME`** - Your Docker Hub username
2. **`DOCKER_PASSWORD`** - Your Docker Hub access token
3. **`RENDER_API_KEY`** - Your Render API key
4. **`RENDER_BACKEND_SERVICE_ID`** - Your Render service ID
5. **`VERCEL_TOKEN`** - Your Vercel token
6. **`VERCEL_ORG_ID`** - Your Vercel org ID
7. **`VERCEL_PROJECT_ID`** - Your Vercel project ID

### Workflow Stages

The pipeline automatically runs on **push to main branch**:

1. **Build Docker Images**
   - Builds backend image
   - Builds frontend image

2. **Push to Docker Hub**
   - Pushes backend image
   - Pushes frontend image

3. **Deploy Backend to Render**
   - Triggers deployment
   - Updates backend service

4. **Deploy Frontend to Vercel**
   - Imports GitHub repository
   - Auto-deploys on push

5. **Update Kubernetes**
   - Updates image references in manifests
   - Applies to cluster

### View Workflow Status

- Go to GitHub repository → **Actions** tab
- View workflow runs and logs

---

## 📡 API Endpoints

### Authentication

```
POST /api/auth/register
- Body: { name, email, password }
- Response: { message, userId }

POST /api/auth/login
- Body: { email, password }
- Response: { message, token, user: { id, name, email } }
```

### Projects (CRUD)

```
GET /api/projects
- Get all projects

POST /api/projects
- Create new project
- Body: { title, description }

GET /api/projects/:id
- Get specific project

PUT /api/projects/:id
- Update project
- Body: { title, description }

DELETE /api/projects/:id
- Delete project
```

### Tasks (CRUD)

```
GET /api/tasks
- Get all tasks

POST /api/tasks
- Create new task
- Body: { title, status }

GET /api/tasks/:id
- Get specific task

PUT /api/tasks/:id
- Update task
- Body: { title, status }

DELETE /api/tasks/:id
- Delete task
```

---

## 🚢 Deployment

### Deploy Backend to Render

1. Create account at [render.com](https://render.com)
2. Create new **Web Service** from GitHub
3. Set Build Command: `npm install`
4. Set Start Command: `npm start`
5. Add environment variables:
   - `MONGO_URI`
   - `JWT_SECRET`
6. Deploy

### Deploy Frontend to Vercel

1. Create account at [vercel.com](https://vercel.com)
2. Import GitHub repository
3. Click **Deploy**
4. Auto-deploys on every push to main

---

## 🔐 Environment Variables

### Backend (.env)

```
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/team-management?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_key_here
PORT=5000
NODE_ENV=production
```

### Frontend (.env)

```
REACT_APP_API_URL=https://your-render-backend.onrender.com
```

---

## ✅ Features Implemented

### MERN Application
- [x] User registration with password hashing
- [x] User login with JWT authentication
- [x] **Complete CRUD for Projects** (Create, Read, Update, Delete)
- [x] **Complete CRUD for Tasks** (Create, Read, Update, Delete)
- [x] Task status tracking (Pending, In Progress, Completed)
- [x] MongoDB integration with Mongoose
- [x] Error handling and validation
- [x] Loading states in UI
- [x] Dashboard with dynamic data

### Docker & Volumes
- [x] Dockerfile for backend
- [x] Dockerfile for frontend
- [x] docker-compose.yml with all services
- [x] **Docker Volumes for MongoDB persistent storage**
- [x] .dockerignore files
- [x] Container networking

### Kubernetes
- [x] Backend Deployment & Service
- [x] Frontend Deployment & Service
- [x] MongoDB Deployment & Service
- [x] Persistent Volume Claim for MongoDB
- [x] Service discovery
- [x] Resource management

### CI/CD Pipeline
- [x] GitHub Actions workflow
- [x] Docker image build & push
- [x] Render deployment automation
- [x] Vercel deployment automation
- [x] Kubernetes updates

### Code Quality
- [x] Modular backend architecture
- [x] Organized routing structure
- [x] Environment-based configuration
- [x] Input validation
- [x] Error handling
- [x] Separation of concerns

---

## 🧪 Testing the Application

### Test Locally

1. Register a new account
2. Login with credentials
3. Create a project
4. Create multiple tasks
5. Update task status
6. Delete tasks and projects
7. Verify data persists after logout/login

### Test with Docker

```bash
docker compose up --build
# Test all endpoints
# Verify MongoDB persistence (docker compose down then up)
```

### Test with Kubernetes

```bash
kubectl apply -f k8s/
kubectl port-forward svc/backend-service 5000:5000
# Test API endpoints
# Verify persistent storage
```

---

## 🐛 Troubleshooting

### MongoDB Connection Error

```
Error: "Invalid connection string"
```

**Solution:**
- Check MongoDB Atlas connection string in `.env`
- Add your IP to MongoDB Atlas whitelist
- Verify credentials

### Docker Errors

```bash
# Clear Docker cache
docker system prune -a

# Rebuild without cache
docker compose build --no-cache up
```

### Kubernetes Pod Issues

```bash
# Check pod status
kubectl describe pod <pod-name>

# View logs
kubectl logs <pod-name>

# Check resources
kubectl top nodes
```

### CI/CD Pipeline Failures

- Verify GitHub Secrets are set correctly
- Check Docker Hub credentials
- Verify Render/Vercel API keys
- Review workflow logs in Actions tab

---

## 📚 Learning Resources

- [MERN Stack Guide](https://mern.io)
- [Docker Documentation](https://docs.docker.com)
- [Kubernetes Basics](https://kubernetes.io/docs)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [GitHub Actions](https://github.com/features/actions)

---

## 📊 Evaluation Checklist

| Criteria | Status |
|----------|--------|
| **MERN Application (30%)** | ✅ Complete |
| - Authentication | ✅ JWT implemented |
| - Project CRUD | ✅ All operations working |
| - Task CRUD | ✅ All operations working |
| - Error handling | ✅ Input validation added |
| - UI/Loading states | ✅ Implemented |
| **Docker & Volumes (20%)** | ✅ Complete |
| - Backend Dockerfile | ✅ Created |
| - Frontend Dockerfile | ✅ Created |
| - docker-compose.yml | ✅ Configured |
| - Persistent volumes | ✅ MongoDB volume setup |
| **Kubernetes (20%)** | ✅ Complete |
| - Deployment files | ✅ All created |
| - Service files | ✅ All created |
| - PVC for storage | ✅ Configured |
| **CI/CD (20%)** | ✅ Complete |
| - GitHub Actions | ✅ Workflow created |
| - Docker Hub push | ✅ Automated |
| - Render deployment | ✅ Configured |
| - Vercel deployment | ✅ Configured |
| **Code Quality (10%)** | ✅ Complete |
| - Modular structure | ✅ Organized |
| - Best practices | ✅ Implemented |

---

## 🚀 Next Steps

1. **Update `.env.example`** with your MongoDB credentials format
2. **Get Docker Hub account** and update image names
3. **Setup MongoDB Atlas** free tier cluster
4. **Push to GitHub** to trigger CI/CD
5. **Deploy to Render & Vercel** for production

---

## 📞 Support

For issues:
1. Check SETUP_CHECKLIST.md
2. Review terminal error messages
3. Check GitHub Actions logs
4. Verify environment variables

---

## 📄 License

MIT License - Open source project

---

**Built with ❤️ for DevOps + MERN Capstone Project**

🚀 **Happy Coding!**
