# 🐾 PurrfectMatch V3 - Professional Animal Adoption Platform

## Features
- ✅ JWT Authentication (Login/Register)
- ✅ Role-Based Access Control (User/Admin)
- ✅ Enhanced Animal Management (20+ fields)
- ✅ Advanced Search & Filters
- ✅ Admin Dashboard
- ✅ Responsive Design
- ✅ Production Ready

## Quick Start

```bash
# Deploy everything
docker-compose up --build -d

# Access
Frontend: http://localhost
Backend: http://localhost:8080

# Create Admin User
docker exec -it purrfectmatch-db psql -U postgres -d purrfectmatch
UPDATE users SET role = 'ADMIN' WHERE email = 'your@email.com';
\q
```

## Technology Stack
- Backend: Java 17, Spring Boot 3, Spring Security, JWT
- Frontend: React 18, React Router, Axios
- Database: PostgreSQL 16
- Deployment: Docker, Docker Compose

Built with ❤️ for animals in need
