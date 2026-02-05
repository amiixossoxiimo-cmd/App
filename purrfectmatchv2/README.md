# 🐾 AdoptMe - Animal Adoption Platform

A modern, full-stack animal adoption application with a beautiful green-themed design. Built with React, Spring Boot, and PostgreSQL.

![Version](https://img.shields.io/badge/version-2.0-green.svg)
![Status](https://img.shields.io/badge/status-active-success.svg)

## 🎨 Design Features

- **Modern Green Theme** - Professional color scheme (#2d6a4f)
- **Fully Responsive** - Works perfectly on desktop, tablet, and mobile
- **Smooth Animations** - Hover effects and smooth scrolling
- **Professional Typography** - Poppins font family
- **Complete Sections** - Hero, Animals Grid, How It Works, Why Adopt, Footer

## ✨ Key Features

### Animal Management
- 🐕 **Multiple Species** - Dogs and Cats with emoji indicators
- 👫 **Gender Tracking** - Male/Female with badges
- 📍 **Location Info** - City and state for each animal
- 📝 **Descriptions** - Detailed personality information
- 🖼️ **Photo Support** - Beautiful image display

### User Experience
- 📱 **Mobile Responsive** - Hamburger menu and optimized layout
- 🎭 **Modal Forms** - Clean add animal interface
- 🎯 **Smooth Navigation** - Scroll-to-section functionality
- ⚡ **Fast Loading** - Optimized with Docker multi-stage builds
- 🔄 **Real-time Updates** - Instant UI refresh after changes

## 🏗️ Technology Stack

### Frontend
- **React 18** - Modern UI library
- **Vite** - Lightning-fast build tool
- **Nginx** - Production web server
- **Poppins Font** - Professional typography

### Backend
- **Java 17** - Latest LTS version
- **Spring Boot 3.2.1** - Enterprise-grade framework
- **Spring Data JPA** - Database abstraction
- **Hibernate** - ORM implementation

### Database
- **PostgreSQL 16** - Reliable relational database
- **Docker Volume** - Persistent data storage

### DevOps
- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration
- **Multi-stage Builds** - Optimized images

## 🚀 Quick Start

### Prerequisites
- Docker 20.10+
- Docker Compose 2.0+

### Local Deployment

```bash
# Clone repository
git clone https://github.com/amiixossoxiimo-cmd/App.git
cd App/purrfectmatch

# Start application
docker-compose up --build -d

# Add sample data (optional)
chmod +x add-sample-animals.sh
./add-sample-animals.sh

# Visit application
open http://localhost
```

### AWS EC2 Deployment

```bash
# SSH into EC2
ssh -i your-key.pem ubuntu@YOUR_EC2_IP

# Clone and deploy
git clone https://github.com/amiixossoxiimo-cmd/App.git
cd App/purrfectmatch

# Configure for EC2
PUBLIC_IP=$(curl -s http://169.254.169.254/latest/meta-data/public-ipv4)
sed -i "s|http://localhost:8080|http://$PUBLIC_IP:8080|g" frontend/src/api.js

# Start
docker-compose up --build -d

# Visit: http://YOUR_EC2_PUBLIC_IP
```

**Don't forget to open ports 80 and 8080 in your Security Group!**

## 📊 Database Schema

### Animals Table (cats)

| Column | Type | Description |
|--------|------|-------------|
| id | BIGINT | Primary key (auto-increment) |
| name | VARCHAR | Animal's name |
| description | TEXT | Personality description |
| age | INTEGER | Age in years |
| image_url | VARCHAR | Photo URL |
| species | VARCHAR | "Dog" or "Cat" |
| gender | VARCHAR | "Male" or "Female" |
| location | VARCHAR | City, State |

## 🔌 API Endpoints

### Base URL
- Local: `http://localhost:8080/api`
- EC2: `http://YOUR_EC2_IP:8080/api`

### Endpoints

#### Get All Animals
```http
GET /api/cats
```
Returns array of all animals.

#### Get Animal by ID
```http
GET /api/cats/{id}
```
Returns single animal or 404.

#### Create Animal
```http
POST /api/cats
Content-Type: application/json

{
  "name": "Max",
  "age": 3,
  "description": "Friendly dog",
  "imageUrl": "https://example.com/image.jpg",
  "species": "Dog",
  "gender": "Male",
  "location": "Los Angeles, CA"
}
```

#### Update Animal
```http
PUT /api/cats/{id}
Content-Type: application/json

{
  "name": "Max Updated",
  ...
}
```

#### Delete Animal
```http
DELETE /api/cats/{id}
```

## 📁 Project Structure

```
purrfectmatch/
├── backend/
│   ├── src/main/java/com/purrfectmatch/
│   │   ├── PurrfectMatchApplication.java   # Main app
│   │   ├── entity/Cat.java                 # Animal entity
│   │   ├── repository/CatRepository.java   # Data access
│   │   └── controller/CatController.java   # REST API
│   ├── pom.xml                              # Dependencies
│   └── Dockerfile                           # Backend image
├── frontend/
│   ├── src/
│   │   ├── App.jsx                          # Main component
│   │   ├── App.css                          # Styling
│   │   ├── api.js                           # API client
│   │   └── main.jsx                         # Entry point
│   ├── nginx.conf                           # Web server config
│   └── Dockerfile                           # Frontend image
├── docker-compose.yml                       # Orchestration
└── add-sample-animals.sh                    # Sample data
```

## 🎯 Application Sections

### 1. Hero Section
- Eye-catching title and mission statement
- Call-to-action buttons
- Decorative paw emoji background

### 2. Animals Grid
- Responsive card layout
- Species badges with emojis
- Age and gender information
- Location display
- Quick actions (view/delete)

### 3. How It Works
- 4-step adoption process
- Numbered steps with icons
- Clear explanations

### 4. Why Adopt
- 4 key features
- Trust indicators
- Service highlights

### 5. Call to Action
- Encouragement section
- Green gradient background
- Direct action button

### 6. Footer
- About information
- Quick navigation links
- Social media connections
- Contact details

## 🎨 Design System

### Colors
```css
Primary Green:    #2d6a4f
Secondary Green:  #40916c
Light Green:      #95d5b2
Background:       #f8f9fa
Dark Green:       #1a4332
```

### Typography
```css
Font Family: 'Poppins', sans-serif
Headings: 700 weight
Body: 400-500 weight
```

### Spacing
- Sections: 5rem padding
- Cards: 2rem gap
- Elements: 1.5rem spacing

## 📱 Responsive Breakpoints

- **Desktop**: 1200px+
- **Tablet**: 768px - 1199px
- **Mobile**: < 768px

## 🛠️ Development

### Run Backend Locally
```bash
cd backend
./mvnw spring-boot:run
```

### Run Frontend Locally
```bash
cd frontend
npm install
npm run dev
```

### View Logs
```bash
docker-compose logs -f
docker-compose logs -f backend
docker-compose logs -f frontend
```

### Rebuild After Changes
```bash
docker-compose down
docker-compose up --build -d
```

## 🧪 Testing

### Test API
```bash
# Get all animals
curl http://localhost:8080/api/cats

# Add animal
curl -X POST http://localhost:8080/api/cats \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","age":2,"species":"Cat","gender":"Male","location":"Test City"}'
```

### Test Frontend
1. Visit `http://localhost`
2. Click "+ Add Animal"
3. Fill form and submit
4. Verify animal appears in grid
5. Test delete functionality
6. Test responsive design (resize browser)

## 🐛 Troubleshooting

### Frontend Can't Connect to Backend
```bash
# Check API URL in frontend/src/api.js
# Should be: http://YOUR_EC2_IP:8080/api (for EC2)
# Or: http://localhost:8080/api (for local)

# Rebuild frontend
docker-compose up --build frontend
```

### Database Connection Issues
```bash
# Wait for database initialization (15-20 seconds)
docker-compose restart backend

# Check logs
docker-compose logs db
docker-compose logs backend
```

### Port Conflicts
```bash
# Change ports in docker-compose.yml
# Example: Change 80:80 to 8080:80 for frontend
```

## 📈 Future Enhancements

- [ ] User authentication
- [ ] Favorite animals feature
- [ ] Advanced search and filters
- [ ] Adoption application form
- [ ] Email notifications
- [ ] Image upload functionality
- [ ] Animal profiles page
- [ ] Admin dashboard
- [ ] Statistics and analytics
- [ ] Multi-language support

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📄 License

This project is open source and available for educational purposes.

## 📧 Contact

- GitHub: [@amiixossoxiimo-cmd](https://github.com/amiixossoxiimo-cmd)
- Repository: [App/purrfectmatch](https://github.com/amiixossoxiimo-cmd/App/tree/main/purrfectmatch)

## 🙏 Acknowledgments

- Design inspired by modern pet adoption platforms
- Built with love for animals in need
- Powered by open-source technologies

---

**Made with ❤️ for animals looking for their forever home** 🐾
