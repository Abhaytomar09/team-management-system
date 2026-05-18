# Team Management System - SETUP CHECKLIST

## Pre-Setup Requirements
- [ ] Node.js 18+ installed
- [ ] Docker and Docker Compose installed
- [ ] Kubernetes (Minikube) installed
- [ ] Git installed
- [ ] MongoDB Atlas account created
- [ ] Docker Hub account created
- [ ] Vercel account created (optional)
- [ ] Render account created (optional)

## Step-by-Step Setup

### 1. Backend Setup
- [ ] Navigate to backend folder: `cd backend`
- [ ] Copy `.env.example` to `.env`: `cp .env.example .env`
- [ ] Update `.env` with your MongoDB Atlas connection string
- [ ] Install dependencies: `npm install`
- [ ] Test server: `npm run dev` (should see "Server running on port 5000")

### 2. Frontend Setup
- [ ] Navigate to frontend folder: `cd frontend`
- [ ] Install dependencies: `npm install`
- [ ] Test frontend: `npm start` (should open http://localhost:3000)

### 3. Local Development with Docker
- [ ] From root folder, run: `docker compose up --build`
- [ ] Verify services running on ports 3000, 5000, and 27017
- [ ] Test by logging in at http://localhost:3000

### 4. Docker Hub Setup
- [ ] Create Docker Hub account and login: `docker login`
- [ ] Build images: 
  - [ ] `docker build -t yourusername/backend:latest ./backend`
  - [ ] `docker build -t yourusername/frontend:latest ./frontend`
- [ ] Push images:
  - [ ] `docker push yourusername/backend:latest`
  - [ ] `docker push yourusername/frontend:latest`

### 5. Kubernetes Setup
- [ ] Start Minikube: `minikube start`
- [ ] Update image names in k8s files to your Docker Hub username
- [ ] Deploy: `kubectl apply -f k8s/`
- [ ] Verify pods: `kubectl get pods`
- [ ] Port forward and test services

### 6. GitHub Setup
- [ ] Push code to GitHub repository
- [ ] Add GitHub Secrets:
  - [ ] `DOCKER_USERNAME`
  - [ ] `DOCKER_PASSWORD` (Docker Hub access token)
- [ ] GitHub Actions should automatically run on push

### 7. Production Deployment
- [ ] Deploy Backend to Render:
  - [ ] Connect GitHub repo
  - [ ] Add environment variables
  - [ ] Deploy
- [ ] Deploy Frontend to Vercel:
  - [ ] Import GitHub repo
  - [ ] Vercel auto-deploys
  - [ ] Update API URL to Render backend

## Testing Checklist

### API Testing
- [ ] Test Register: `POST /api/auth/register` with name, email, password
- [ ] Test Login: `POST /api/auth/login` with email, password
- [ ] Test Projects: `GET /api/projects`, `POST /api/projects`
- [ ] Test Tasks: `GET /api/tasks`, `POST /api/tasks`, `PUT /api/tasks/:id`, `DELETE /api/tasks/:id`

### Docker Testing
- [ ] Backend container runs and connects to MongoDB
- [ ] Frontend container runs and loads React app
- [ ] API calls work between frontend and backend
- [ ] MongoDB persists data

### Kubernetes Testing
- [ ] All pods are running: `kubectl get pods`
- [ ] Services are created: `kubectl get svc`
- [ ] Port forwarding works
- [ ] Pod logs show no errors: `kubectl logs <pod-name>`

### CI/CD Testing
- [ ] Make a commit and push to main branch
- [ ] GitHub Actions workflow runs successfully
- [ ] Docker images are pushed to Docker Hub
- [ ] Kubernetes manifests are applied

## Important Notes

1. **Environment Variables**
   - Backend .env file must have MONGO_URI, JWT_SECRET, PORT
   - Update k8s files with your Docker Hub username
   - Update frontend proxy URL to match backend

2. **MongoDB Connection**
   - For local development: use `mongodb://localhost:27017`
   - For production: use MongoDB Atlas connection string
   - Add your IP to MongoDB Atlas whitelist

3. **Docker Hub**
   - Replace `yourdockerhub/` with your actual Docker Hub username
   - Use access tokens instead of passwords for GitHub Actions

4. **Security**
   - Never commit .env file with secrets
   - Use GitHub Secrets for sensitive data
   - Rotate JWT_SECRET regularly in production

## Troubleshooting

- **Port already in use**: Change ports in docker-compose.yml or kill existing process
- **MongoDB connection fails**: Check connection string and whitelist IP
- **Docker build fails**: Check node_modules in .gitignore and .dockerignore
- **Kubernetes pod stuck in pending**: Check `kubectl describe pod <pod-name>` for errors

## Next Steps After Setup

1. Add authentication middleware to routes
2. Implement proper error handling
3. Add input validation
4. Add unit and integration tests
5. Implement CI/CD for testing before deployment
6. Set up monitoring and logging
7. Add API documentation (Swagger/OpenAPI)
8. Implement caching strategies
9. Set up database backups
10. Configure auto-scaling policies for Kubernetes
