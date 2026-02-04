# 🚀 PurrfectMatch Deployment Guide

## Quick Start (3 Commands)

```bash
cd purrfectmatch
docker-compose up --build
# Wait 30-60 seconds, then visit http://localhost
```

## What You'll Get

✅ **Complete 3-Tier Architecture**
- PostgreSQL Database (Port 5432)
- Java Spring Boot Backend (Port 8080)
- React Frontend on Nginx (Port 80)

✅ **Professional Features**
- REST API with CRUD operations
- Responsive modern UI
- Docker multi-stage builds
- Health checks & auto-restart
- CORS configured
- Production-ready Nginx setup

## Step-by-Step Deployment

### 1. Prerequisites Check
```bash
docker --version    # Should be 20.10+
docker-compose --version  # Should be 2.0+
```

### 2. Navigate to Project
```bash
cd purrfectmatch
```

### 3. Start Everything
```bash
docker-compose up --build
```

Or use the convenience script:
```bash
./start.sh
```

### 4. Verify Services
```bash
# Check all containers are running
docker-compose ps

# Should show 3 services: db, backend, frontend (all "Up")
```

### 5. Access the Application

**Frontend**: http://localhost
- Beautiful UI to browse and add cats

**Backend API**: http://localhost:8080/api/cats
- Returns JSON list of all cats

**Test the API**:
```bash
curl http://localhost:8080/api/cats
```

### 6. Add Sample Data (Optional)
```bash
./add-sample-cats.sh
```

This adds 6 cute cats to get you started!

## Usage Examples

### View All Cats
```bash
curl http://localhost:8080/api/cats
```

### Add a New Cat
```bash
curl -X POST http://localhost:8080/api/cats \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Fluffy",
    "description": "Adorable white Persian cat",
    "age": 2,
    "imageUrl": "https://placekitten.com/400/300"
  }'
```

### Delete a Cat
```bash
curl -X DELETE http://localhost:8080/api/cats/1
```

## Managing the Application

### View Logs
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f db
```

### Restart Services
```bash
docker-compose restart
```

### Stop Services
```bash
docker-compose down
```

### Stop and Remove Data
```bash
docker-compose down -v
```

### Rebuild After Code Changes
```bash
docker-compose down
docker-compose up --build
```

## Troubleshooting

### Backend Can't Connect to Database
**Problem**: Backend logs show connection errors

**Solution**:
```bash
# Check database is healthy
docker-compose ps
# Wait 10-15 seconds for DB to initialize
# Restart backend
docker-compose restart backend
```

### Port Already in Use
**Problem**: Error: "port is already allocated"

**Solution**:
```bash
# Stop conflicting service or change ports in docker-compose.yml
# For example, change frontend port from 80:80 to 8081:80
```

### Frontend Shows Connection Error
**Problem**: Can't fetch cats from backend

**Solution**:
1. Verify backend is running: `curl http://localhost:8080/api/cats`
2. Check browser console for CORS errors
3. Ensure you're accessing via http://localhost (not 127.0.0.1)

### Cannot Build Backend
**Problem**: Maven build fails

**Solution**:
```bash
# Clean Docker cache
docker-compose down
docker system prune -a
docker-compose up --build
```

## Architecture Details

### Container Communication
```
Frontend (nginx:80) 
    ↓ HTTP
Backend (spring:8080)
    ↓ JDBC
Database (postgres:5432)
```

All services communicate via Docker network: `purrfectmatch-network`

### Data Persistence
- Database data persists in Docker volume: `postgres_data`
- Survives container restarts
- Only removed with `docker-compose down -v`

### Environment Variables
Backend reads from environment (set in docker-compose.yml):
- `DB_URL`: Database connection string
- `DB_USER`: Database username
- `DB_PASSWORD`: Database password

## File Structure Reference

```
purrfectmatch/
├── backend/
│   ├── src/main/java/com/purrfectmatch/
│   │   ├── PurrfectMatchApplication.java    # Main app
│   │   ├── entity/Cat.java                   # JPA Entity
│   │   ├── repository/CatRepository.java     # Data access
│   │   └── controller/CatController.java     # REST API
│   ├── src/main/resources/
│   │   └── application.properties            # Config
│   ├── pom.xml                                # Maven deps
│   └── Dockerfile                             # Backend image
├── frontend/
│   ├── src/
│   │   ├── App.jsx                            # Main component
│   │   ├── api.js                             # Backend client
│   │   └── main.jsx                           # Entry point
│   ├── nginx.conf                             # Nginx config
│   └── Dockerfile                             # Frontend image
├── docker-compose.yml                         # Orchestration
├── start.sh                                   # Quick start
└── add-sample-cats.sh                        # Sample data
```

## Production Considerations

For production deployment, consider:

1. **Security**:
   - Change default database password
   - Use environment files (`.env`)
   - Enable HTTPS with SSL certificates
   - Restrict CORS origins

2. **Scalability**:
   - Use external database (RDS, Cloud SQL)
   - Add load balancer for multiple backend instances
   - Implement caching (Redis)

3. **Monitoring**:
   - Add health check endpoints
   - Integrate logging (ELK stack)
   - Set up alerts

4. **CI/CD**:
   - Automate builds with GitHub Actions
   - Push images to registry (Docker Hub, ECR)
   - Deploy with Kubernetes or ECS

## Tech Stack Summary

| Layer | Technology | Version |
|-------|-----------|---------|
| Frontend | React | 18.2.0 |
| Build Tool | Vite | 5.0.8 |
| Web Server | Nginx | Alpine |
| Backend | Spring Boot | 3.2.1 |
| Language | Java | 17 |
| Database | PostgreSQL | 16 |
| ORM | Hibernate/JPA | - |
| Container | Docker | - |
| Orchestration | Docker Compose | - |

## Support

For issues:
1. Check logs: `docker-compose logs -f`
2. Verify all containers are up: `docker-compose ps`
3. Test API directly: `curl http://localhost:8080/api/cats`
4. Check network: `docker network inspect purrfectmatch_purrfectmatch-network`

## Next Steps

1. ✅ Start the application
2. ✅ Add sample cats
3. ✅ Test the UI at http://localhost
4. Customize the frontend styling
5. Add more features (search, filters, adoption requests)
6. Deploy to cloud provider

Happy coding! 🐱
