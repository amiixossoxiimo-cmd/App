# 🐱 PurrfectMatch - Cat Adoption Platform

A full-stack, containerized cat adoption application built with a modern 3-tier architecture.

## 🏗️ Architecture

- **Frontend**: React 18 + Vite, served by Nginx
- **Backend**: Java Spring Boot 3 with REST API
- **Database**: PostgreSQL 16
- **Orchestration**: Docker Compose

## 📋 Prerequisites

- Docker (version 20.10+)
- Docker Compose (version 2.0+)

## 🚀 Quick Start

1. **Clone or navigate to the project directory:**
   ```bash
   cd purrfectmatch
   ```

2. **Build and start all services:**
   ```bash
   docker-compose up --build
   ```

3. **Access the application:**
   - Frontend: http://localhost
   - Backend API: http://localhost:8080/api/cats
   - Database: localhost:5432

4. **Stop the application:**
   ```bash
   docker-compose down
   ```

5. **Stop and remove all data (including database):**
   ```bash
   docker-compose down -v
   ```

## 📁 Project Structure

```
purrfectmatch/
├── backend/                           # Spring Boot backend
│   ├── src/
│   │   └── main/
│   │       ├── java/com/purrfectmatch/
│   │       │   ├── PurrfectMatchApplication.java
│   │       │   ├── entity/Cat.java
│   │       │   ├── repository/CatRepository.java
│   │       │   └── controller/CatController.java
│   │       └── resources/
│   │           └── application.properties
│   ├── pom.xml
│   ├── Dockerfile
│   └── .dockerignore
├── frontend/                          # React frontend
│   ├── src/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── api.js
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── nginx.conf
│   ├── Dockerfile
│   └── .dockerignore
├── docker-compose.yml
└── README.md
```

## 🔌 API Endpoints

### Cats API (http://localhost:8080/api/cats)

- `GET /api/cats` - Get all cats
- `GET /api/cats/{id}` - Get cat by ID
- `POST /api/cats` - Create a new cat
- `PUT /api/cats/{id}` - Update a cat
- `DELETE /api/cats/{id}` - Delete a cat

### Example Request (Create Cat):
```bash
curl -X POST http://localhost:8080/api/cats \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Whiskers",
    "description": "A friendly orange tabby who loves to play",
    "age": 3,
    "imageUrl": "https://placekitten.com/400/300"
  }'
```

## 🐳 Docker Services

### Database (db)
- **Image**: postgres:16-alpine
- **Port**: 5432
- **Credentials**: 
  - Database: `purrfectmatch`
  - User: `postgres`
  - Password: `postgres`

### Backend (backend)
- **Port**: 8080
- **Technology**: Java 17 + Spring Boot 3.2.1
- **Features**:
  - RESTful API
  - JPA/Hibernate ORM
  - CORS enabled
  - Auto-reconnect to database

### Frontend (frontend)
- **Port**: 80
- **Technology**: React 18 + Vite + Nginx
- **Features**:
  - Modern UI with gradient design
  - Responsive grid layout
  - Add/Delete cats
  - Real-time data fetching

## 🛠️ Development

### Running Backend Locally (without Docker)
```bash
cd backend
./mvnw spring-boot:run
```

### Running Frontend Locally (without Docker)
```bash
cd frontend
npm install
npm run dev
```
Access at: http://localhost:5173

## 🔧 Configuration

### Environment Variables (Docker Compose)

Backend environment variables can be modified in `docker-compose.yml`:
```yaml
environment:
  DB_URL: jdbc:postgresql://db:5432/purrfectmatch
  DB_USER: postgres
  DB_PASSWORD: postgres
```

### Database Connection

The backend automatically connects to the PostgreSQL database using the environment variables. The schema is auto-created using Hibernate's `ddl-auto=update` setting.

## 🎨 Features

- ✅ View all available cats for adoption
- ✅ Add new cats with name, age, description, and image
- ✅ Delete cats from the adoption list
- ✅ Beautiful, responsive UI
- ✅ Full CRUD API
- ✅ Containerized architecture
- ✅ Health checks for all services
- ✅ Persistent database storage

## 🐛 Troubleshooting

### Backend fails to connect to database
- Ensure PostgreSQL container is healthy: `docker-compose ps`
- Check logs: `docker-compose logs db`

### Frontend can't reach backend
- Verify backend is running: `curl http://localhost:8080/api/cats`
- Check CORS configuration in `CatController.java`

### Port already in use
- Change ports in `docker-compose.yml`
- Stop conflicting services

### Rebuild after code changes
```bash
docker-compose down
docker-compose up --build
```

## 📝 Tech Stack Details

### Backend
- Java 17
- Spring Boot 3.2.1
- Spring Data JPA
- PostgreSQL Driver
- Maven

### Frontend
- React 18.2.0
- Vite 5.0.8
- Modern ES6+ JavaScript
- CSS3 with Flexbox/Grid

### DevOps
- Docker multi-stage builds
- Nginx for static file serving
- Docker Compose networking
- Health checks & auto-restart

## 📄 License

This is a demonstration project for educational purposes.

## 👨‍💻 Author

Built by a Senior DevOps and Full Stack Engineer as a complete containerized application example.
