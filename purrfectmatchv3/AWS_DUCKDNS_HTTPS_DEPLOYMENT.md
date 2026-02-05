# 🌐 PurrfectMatch V3 - AWS EC2 + DuckDNS + HTTPS Deployment

## ✅ You Already Have:
- ✅ DuckDNS domain: `adopteme.duckdns.org`
- ✅ SSL Certificates (Let's Encrypt)
- ✅ AWS EC2 instance running
- ✅ Security groups configured (ports 80, 443, 8080, 22)
- ✅ Nginx with HTTPS

## 🚀 Deploy V3 to Your Existing EC2

### Step 1: SSH Into Your EC2
```bash
ssh -i your-key.pem ubuntu@13.48.195.9
# OR
ssh -i your-key.pem ubuntu@ec2-56-228-21-31.eu-north-1.compute.amazonaws.com
```

### Step 2: Backup V2 (Optional)
```bash
cd ~/App
mv purrfectmatchv2 purrfectmatchv2-backup  # Keep backup
```

### Step 3: Upload & Extract V3
```bash
# Option A: Upload from your computer
# From your local machine:
scp -i your-key.pem purrfectmatchv3-FINAL.tar.gz ubuntu@13.48.195.9:~/

# Then on EC2:
cd ~/
tar -xzf purrfectmatchv3-FINAL.tar.gz
cd purrfectmatchv3

# Option B: Clone from GitHub (if you upload there)
cd ~/App
git clone https://github.com/amiixossoxiimo-cmd/App.git
cd App/purrfectmatchv3
```

### Step 4: Use Your Existing SSL Certificates
```bash
# Copy your existing certificates to V3 project
sudo cp /etc/letsencrypt/archive/adopteme.duckdns.org/fullchain1.pem ~/purrfectmatchv3/frontend/certs/fullchain.pem
sudo cp /etc/letsencrypt/archive/adopteme.duckdns.org/privkey1.pem ~/purrfectmatchv3/frontend/certs/privkey.pem
sudo chmod 644 ~/purrfectmatchv3/frontend/certs/*.pem
```

### Step 5: Update Frontend Nginx Config for HTTPS
```bash
cd ~/purrfectmatchv3/frontend

cat > nginx-ssl.conf << 'EOF'
# Redirect HTTP to HTTPS
server {
    listen 80;
    server_name adopteme.duckdns.org;
    return 301 https://$server_name$request_uri;
}

# HTTPS Server
server {
    listen 443 ssl;
    server_name adopteme.duckdns.org;
    
    # SSL Certificates
    ssl_certificate /etc/nginx/certs/fullchain.pem;
    ssl_certificate_key /etc/nginx/certs/privkey.pem;
    
    # SSL Settings
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;
    
    root /usr/share/nginx/html;
    index index.html;

    # Frontend Routes
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Proxy API to Backend
    location /api {
        proxy_pass http://backend:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Gzip
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
}
EOF
```

### Step 6: Update Frontend Dockerfile
```bash
cat > Dockerfile << 'EOF'
# Stage 1: Build
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Serve with Nginx + SSL
FROM nginx:alpine

# Copy built assets
COPY --from=build /app/dist /usr/share/nginx/html

# Copy SSL certificates
COPY certs/fullchain.pem /etc/nginx/certs/fullchain.pem
COPY certs/privkey.pem /etc/nginx/certs/privkey.pem

# Copy nginx configuration
COPY nginx-ssl.conf /etc/nginx/conf.d/default.conf

# Expose ports
EXPOSE 80 443

CMD ["nginx", "-g", "daemon off;"]
EOF
```

### Step 7: Update Docker Compose for HTTPS
```bash
cd ~/purrfectmatchv3

cat > docker-compose.yml << 'EOF'
version: '3.8'

services:
  db:
    image: postgres:16-alpine
    container_name: purrfectmatch-db
    restart: unless-stopped
    environment:
      POSTGRES_DB: purrfectmatch
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
    volumes:
      - postgres_data:/var/lib/postgresql/data
    networks:
      - purrfectmatch-network
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 10s
      timeout: 5s
      retries: 5

  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    container_name: purrfectmatch-backend
    restart: unless-stopped
    environment:
      DB_URL: jdbc:postgresql://db:5432/purrfectmatch
      DB_USER: postgres
      DB_PASSWORD: postgres
    ports:
      - "8080:8080"
    networks:
      - purrfectmatch-network
    depends_on:
      db:
        condition: service_healthy

  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    container_name: purrfectmatch-frontend
    restart: unless-stopped
    ports:
      - "80:80"
      - "443:443"
    networks:
      - purrfectmatch-network
    depends_on:
      - backend

networks:
  purrfectmatch-network:
    driver: bridge

volumes:
  postgres_data:
EOF
```

### Step 8: Stop V2 and Start V3
```bash
# Stop V2 (if running)
cd ~/App/purrfectmatchv2
docker-compose down

# Start V3
cd ~/purrfectmatchv3
docker-compose up --build -d

# Check status
docker-compose ps
```

### Step 9: Wait for Services to Start
```bash
# Watch logs
docker-compose logs -f

# Wait about 60 seconds for backend to fully start
# Press Ctrl+C to exit logs
```

### Step 10: Create Admin User
```bash
# First, register via the website: https://adopteme.duckdns.org/register
# Register with your email

# Then make yourself admin:
docker exec -it purrfectmatch-db psql -U postgres -d purrfectmatch

UPDATE users SET role = 'ADMIN' WHERE email = 'your@email.com';

# Verify:
SELECT id, email, role FROM users;

\q
```

## ✅ Verification

### Test Your Deployment:
```bash
# Test HTTPS redirect
curl -I http://adopteme.duckdns.org
# Should return 301 redirect to HTTPS

# Test HTTPS
curl -I https://adopteme.duckdns.org
# Should return 200 OK

# Test Backend API
curl https://adopteme.duckdns.org/api/animals
# Should return [] or list of animals
```

### Access Your Application:
- **Main Site:** https://adopteme.duckdns.org
- **Register:** https://adopteme.duckdns.org/register
- **Login:** https://adopteme.duckdns.org/login
- **Browse:** https://adopteme.duckdns.org/browse
- **Admin Dashboard:** https://adopteme.duckdns.org/admin (after making yourself admin)

## 🔄 Certificate Renewal (Every 90 Days)

Your certificates expire every 90 days. Renew them:

```bash
# Stop frontend temporarily
cd ~/purrfectmatchv3
docker-compose stop frontend

# Renew certificates
sudo certbot renew

# Copy new certificates
sudo cp /etc/letsencrypt/archive/adopteme.duckdns.org/fullchain1.pem ~/purrfectmatchv3/frontend/certs/fullchain.pem
sudo cp /etc/letsencrypt/archive/adopteme.duckdns.org/privkey1.pem ~/purrfectmatchv3/frontend/certs/privkey.pem
sudo chmod 644 ~/purrfectmatchv3/frontend/certs/*.pem

# Rebuild and restart frontend
docker-compose up --build -d frontend
```

## 🧪 Test the Features

### 1. Register a User
Visit: https://adopteme.duckdns.org/register
- Fill in your details
- Click Register
- You'll be logged in automatically

### 2. Make Yourself Admin
```bash
docker exec -it purrfectmatch-db psql -U postgres -d purrfectmatch
UPDATE users SET role = 'ADMIN' WHERE email = 'your@email.com';
\q
```

### 3. Test Admin Features
- Visit: https://adopteme.duckdns.org/admin
- Click "+ Add New Animal"
- Fill in the form
- Click "Add Animal"
- You should see your animal!

### 4. Test Search
- Visit: https://adopteme.duckdns.org/browse
- Click "▼ Filters"
- Select species, gender, etc.
- Click "Apply"

## 🎉 You're Live!

Your V3 is now running at:
**https://adopteme.duckdns.org** 🚀

Share your link with the world! 🌍

## 📝 What's Different from V2?

### New Features:
✅ User Authentication (Login/Register)
✅ JWT Security
✅ Role-based Access (User/Admin)
✅ User Dashboard
✅ Admin Dashboard with Statistics
✅ Enhanced Animal Fields (20+ fields)
✅ Advanced Search & Filters
✅ Professional Animal Form (Add/Edit)
✅ Better UI/UX

### Same:
✅ Your domain: adopteme.duckdns.org
✅ Your SSL certificates
✅ HTTPS enabled
✅ AWS EC2 deployment
✅ Docker setup

## 🆘 Troubleshooting

### Backend Not Starting?
```bash
docker-compose logs backend
# Look for errors
# Common: Database not ready - wait 30 more seconds
```

### Frontend Shows 502 Bad Gateway?
```bash
# Backend might not be ready yet
docker-compose restart backend
# Wait 30 seconds
```

### Can't Login?
```bash
# Check if backend is running
curl https://adopteme.duckdns.org/api/auth/me
# Should return 401 Unauthorized (that's good - means backend is up)
```

### Certificate Issues?
```bash
# Verify certificates exist
ls -la ~/purrfectmatchv3/frontend/certs/
# Should show fullchain.pem and privkey.pem

# If missing, copy from Let's Encrypt:
sudo cp /etc/letsencrypt/archive/adopteme.duckdns.org/fullchain1.pem ~/purrfectmatchv3/frontend/certs/fullchain.pem
sudo cp /etc/letsencrypt/archive/adopteme.duckdns.org/privkey1.pem ~/purrfectmatchv3/frontend/certs/privkey.pem
sudo chmod 644 ~/purrfectmatchv3/frontend/certs/*.pem
```

## 🎯 Quick Commands Reference

```bash
# View logs
docker-compose logs -f

# Restart everything
docker-compose restart

# Stop everything
docker-compose down

# Start everything
docker-compose up -d

# Rebuild everything
docker-compose up --build -d

# Connect to database
docker exec -it purrfectmatch-db psql -U postgres -d purrfectmatch

# Check running containers
docker-compose ps
```

**Your V3 is production-ready and running on HTTPS!** 🔒✨
