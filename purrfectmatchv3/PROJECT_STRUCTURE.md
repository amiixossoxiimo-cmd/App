# 🐾 PurrfectMatch V3 - Complete Animal Adoption Platform

## 🎯 Project Overview

A professional, production-ready animal adoption platform with complete features:
- User Authentication & Authorization
- Role-Based Access Control (Admin/User)
- Advanced Animal Management
- Adoption Application System
- Favorites/Wishlist
- Image Upload & Gallery
- Email Notifications
- Search & Filter System
- Analytics Dashboard

## 📁 Project Structure

```
purrfectmatchv3/
├── backend/
│   ├── src/main/java/com/purrfectmatch/
│   │   ├── PurrfectMatchApplication.java
│   │   │
│   │   ├── config/
│   │   │   ├── SecurityConfig.java           # Spring Security configuration
│   │   │   ├── JwtConfig.java                # JWT settings
│   │   │   ├── CorsConfig.java               # CORS configuration
│   │   │   └── EmailConfig.java              # Email settings
│   │   │
│   │   ├── entity/
│   │   │   ├── User.java                     # User entity
│   │   │   ├── Animal.java                   # Animal entity (enhanced)
│   │   │   ├── AnimalImage.java              # Animal images
│   │   │   ├── AdoptionApplication.java      # Applications
│   │   │   ├── Favorite.java                 # User favorites
│   │   │   └── Shelter.java                  # Shelter info
│   │   │
│   │   ├── repository/
│   │   │   ├── UserRepository.java
│   │   │   ├── AnimalRepository.java
│   │   │   ├── AnimalImageRepository.java
│   │   │   ├── AdoptionApplicationRepository.java
│   │   │   ├── FavoriteRepository.java
│   │   │   └── ShelterRepository.java
│   │   │
│   │   ├── service/
│   │   │   ├── UserService.java
│   │   │   ├── AnimalService.java
│   │   │   ├── ApplicationService.java
│   │   │   ├── FavoriteService.java
│   │   │   ├── ImageService.java
│   │   │   ├── EmailService.java
│   │   │   └── AuthService.java
│   │   │
│   │   ├── controller/
│   │   │   ├── AuthController.java           # Login/Register
│   │   │   ├── AnimalController.java         # CRUD animals
│   │   │   ├── ApplicationController.java    # Applications
│   │   │   ├── FavoriteController.java       # Favorites
│   │   │   ├── UserController.java           # User management
│   │   │   └── AdminController.java          # Admin endpoints
│   │   │
│   │   ├── dto/
│   │   │   ├── LoginRequest.java
│   │   │   ├── RegisterRequest.java
│   │   │   ├── AnimalDTO.java
│   │   │   ├── ApplicationDTO.java
│   │   │   └── JwtResponse.java
│   │   │
│   │   ├── security/
│   │   │   ├── JwtTokenProvider.java         # JWT generation/validation
│   │   │   ├── JwtAuthenticationFilter.java  # Filter requests
│   │   │   └── UserDetailsServiceImpl.java   # Load user details
│   │   │
│   │   └── exception/
│   │       ├── GlobalExceptionHandler.java
│   │       ├── ResourceNotFoundException.java
│   │       └── UnauthorizedException.java
│   │
│   ├── src/main/resources/
│   │   ├── application.properties
│   │   ├── application-dev.properties
│   │   └── application-prod.properties
│   │
│   ├── pom.xml
│   └── Dockerfile
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx                          # Main app component
│   │   ├── main.jsx                         # Entry point
│   │   │
│   │   ├── components/
│   │   │   ├── common/
│   │   │   │   ├── Header.jsx               # Navigation
│   │   │   │   ├── Footer.jsx
│   │   │   │   ├── LoadingSpinner.jsx
│   │   │   │   └── ErrorMessage.jsx
│   │   │   │
│   │   │   ├── auth/
│   │   │   │   ├── Login.jsx
│   │   │   │   ├── Register.jsx
│   │   │   │   ├── ForgotPassword.jsx
│   │   │   │   └── ProtectedRoute.jsx
│   │   │   │
│   │   │   ├── animal/
│   │   │   │   ├── AnimalCard.jsx           # Animal display card
│   │   │   │   ├── AnimalGrid.jsx           # Grid of animals
│   │   │   │   ├── AnimalDetail.jsx         # Detailed profile
│   │   │   │   ├── AnimalForm.jsx           # Add/Edit form
│   │   │   │   ├── ImageGallery.jsx         # Photo gallery
│   │   │   │   └── SearchFilters.jsx        # Search & filters
│   │   │   │
│   │   │   ├── application/
│   │   │   │   ├── ApplicationForm.jsx      # Adoption form
│   │   │   │   ├── ApplicationList.jsx      # User's applications
│   │   │   │   └── ApplicationReview.jsx    # Admin review
│   │   │   │
│   │   │   ├── dashboard/
│   │   │   │   ├── UserDashboard.jsx        # User dashboard
│   │   │   │   ├── AdminDashboard.jsx       # Admin dashboard
│   │   │   │   ├── FavoritesList.jsx        # Saved animals
│   │   │   │   └── Analytics.jsx            # Stats
│   │   │   │
│   │   │   └── pages/
│   │   │       ├── Home.jsx                 # Homepage
│   │   │       ├── Browse.jsx               # Browse animals
│   │   │       ├── About.jsx                # About page
│   │   │       ├── Contact.jsx              # Contact form
│   │   │       └── HowItWorks.jsx           # Process info
│   │   │
│   │   ├── services/
│   │   │   ├── api.js                       # API client
│   │   │   ├── authService.js               # Auth API calls
│   │   │   ├── animalService.js             # Animal API calls
│   │   │   ├── applicationService.js        # Application API
│   │   │   └── favoriteService.js           # Favorites API
│   │   │
│   │   ├── context/
│   │   │   ├── AuthContext.jsx              # Auth state management
│   │   │   └── ThemeContext.jsx             # Theme management
│   │   │
│   │   ├── utils/
│   │   │   ├── validation.js                # Form validation
│   │   │   ├── formatters.js                # Date/number formatting
│   │   │   └── constants.js                 # App constants
│   │   │
│   │   └── styles/
│   │       ├── App.css
│   │       ├── components/                  # Component styles
│   │       └── themes/                      # Theme files
│   │
│   ├── public/
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── Dockerfile
│   └── nginx.conf
│
├── docker-compose.yml
├── docker-compose.prod.yml
├── .env.example
├── .gitignore
├── README.md
└── docs/
    ├── API_DOCUMENTATION.md
    ├── DEPLOYMENT_GUIDE.md
    ├── USER_GUIDE.md
    └── DEVELOPMENT_GUIDE.md
```

## 🗄️ Database Schema

### Users
```sql
users (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  phone VARCHAR(20),
  address TEXT,
  role ENUM('USER', 'ADMIN') DEFAULT 'USER',
  verified BOOLEAN DEFAULT FALSE,
  verification_token VARCHAR(255),
  reset_token VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### Animals (Enhanced)
```sql
animals (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  species ENUM('Dog', 'Cat', 'Other') NOT NULL,
  breed VARCHAR(100),
  age INTEGER,
  gender ENUM('Male', 'Female', 'Unknown'),
  size ENUM('Small', 'Medium', 'Large', 'X-Large'),
  weight DECIMAL(5,2),
  color VARCHAR(100),
  location VARCHAR(255),
  description TEXT,
  personality_traits TEXT,
  good_with_kids BOOLEAN,
  good_with_dogs BOOLEAN,
  good_with_cats BOOLEAN,
  energy_level ENUM('Low', 'Medium', 'High'),
  special_needs TEXT,
  vaccination_status BOOLEAN DEFAULT FALSE,
  spayed_neutered BOOLEAN DEFAULT FALSE,
  adoption_fee DECIMAL(10,2),
  status ENUM('Available', 'Pending', 'Adopted', 'On Hold', 'Medical Hold') DEFAULT 'Available',
  date_added TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  date_adopted TIMESTAMP NULL,
  shelter_id BIGINT,
  created_by_user_id BIGINT,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (created_by_user_id) REFERENCES users(id)
);
```

### Animal Images
```sql
animal_images (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  animal_id BIGINT NOT NULL,
  image_url VARCHAR(500) NOT NULL,
  is_primary BOOLEAN DEFAULT FALSE,
  display_order INTEGER DEFAULT 0,
  uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (animal_id) REFERENCES animals(id) ON DELETE CASCADE
);
```

### Adoption Applications
```sql
adoption_applications (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  animal_id BIGINT NOT NULL,
  user_id BIGINT NOT NULL,
  status ENUM('Submitted', 'Under Review', 'Approved', 'Rejected', 'Withdrawn') DEFAULT 'Submitted',
  
  -- Applicant Information (JSON or separate columns)
  housing_type ENUM('Own', 'Rent'),
  has_yard BOOLEAN,
  has_other_pets BOOLEAN,
  other_pets_description TEXT,
  household_members INTEGER,
  has_children BOOLEAN,
  children_ages TEXT,
  
  -- Experience & Motivation
  previous_pet_experience TEXT,
  reason_for_adoption TEXT,
  pet_care_plan TEXT,
  
  -- References
  vet_reference_name VARCHAR(100),
  vet_reference_phone VARCHAR(20),
  personal_reference_name VARCHAR(100),
  personal_reference_phone VARCHAR(20),
  
  -- Admin Review
  admin_notes TEXT,
  reviewed_by_user_id BIGINT,
  
  -- Timestamps
  submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  reviewed_at TIMESTAMP NULL,
  decision_date TIMESTAMP NULL,
  
  FOREIGN KEY (animal_id) REFERENCES animals(id),
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (reviewed_by_user_id) REFERENCES users(id)
);
```

### Favorites
```sql
user_favorites (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  user_id BIGINT NOT NULL,
  animal_id BIGINT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (animal_id) REFERENCES animals(id) ON DELETE CASCADE,
  UNIQUE KEY unique_favorite (user_id, animal_id)
);
```

### Shelters (Optional - for multi-shelter support)
```sql
shelters (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  address TEXT,
  city VARCHAR(100),
  state VARCHAR(100),
  zip_code VARCHAR(20),
  phone VARCHAR(20),
  email VARCHAR(255),
  website VARCHAR(255),
  hours_of_operation TEXT,
  logo_url VARCHAR(500),
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 🔐 Authentication Flow

1. **Registration**
   - User fills registration form
   - Backend creates user with hashed password (BCrypt)
   - Email verification sent (optional)
   - JWT token returned

2. **Login**
   - User provides email/password
   - Backend validates credentials
   - JWT token generated (24h expiry)
   - Token stored in localStorage/cookies
   - User redirected to dashboard

3. **Protected Routes**
   - Every API request includes JWT in header
   - Backend validates token
   - User info extracted from token
   - Role-based access control applied

## 🎨 User Roles & Permissions

### USER (Public/Adopter)
- Browse animals
- Search & filter
- View animal profiles
- Save favorites
- Submit adoption applications
- Track application status
- Update profile

### ADMIN (Shelter Staff)
- All USER permissions
- Add/edit/delete animals
- Upload images
- Review applications
- Approve/reject applications
- View analytics
- Manage users
- Update shelter info

## 🚀 API Endpoints

### Authentication
```
POST   /api/auth/register      # Register new user
POST   /api/auth/login         # Login
POST   /api/auth/logout        # Logout
POST   /api/auth/refresh       # Refresh token
POST   /api/auth/forgot        # Forgot password
POST   /api/auth/reset         # Reset password
GET    /api/auth/verify/:token # Verify email
```

### Animals
```
GET    /api/animals            # Get all (with filters)
GET    /api/animals/:id        # Get single animal
POST   /api/animals            # Create (ADMIN)
PUT    /api/animals/:id        # Update (ADMIN)
DELETE /api/animals/:id        # Delete (ADMIN)
GET    /api/animals/search     # Search with filters
POST   /api/animals/:id/images # Upload images (ADMIN)
```

### Applications
```
GET    /api/applications             # Get user's applications
GET    /api/applications/:id         # Get single application
POST   /api/applications             # Submit application
PUT    /api/applications/:id/status  # Update status (ADMIN)
GET    /api/applications/animal/:id  # Get applications for animal (ADMIN)
GET    /api/admin/applications       # Get all applications (ADMIN)
```

### Favorites
```
GET    /api/favorites           # Get user's favorites
POST   /api/favorites/:animalId # Add to favorites
DELETE /api/favorites/:animalId # Remove from favorites
```

### User Management
```
GET    /api/users/profile       # Get current user
PUT    /api/users/profile       # Update profile
GET    /api/admin/users         # Get all users (ADMIN)
PUT    /api/admin/users/:id/role # Update user role (ADMIN)
```

### Analytics (ADMIN)
```
GET    /api/admin/analytics/overview    # Dashboard stats
GET    /api/admin/analytics/animals     # Animal statistics
GET    /api/admin/analytics/applications # Application stats
```

## 📧 Email Notifications

**Triggers:**
- Welcome email on registration
- Email verification
- Password reset
- Application submitted (to user & admin)
- Application status change (to user)
- Animal adopted (to admin)
- New animal matching preferences (optional)

## 🎯 Next Steps

This is the complete architecture. Ready to start building?

**Build Order:**
1. Backend Authentication System
2. Enhanced Animal Entity & CRUD
3. Frontend Auth UI
4. Application System
5. Favorites System
6. Search & Filters
7. Image Upload
8. Email Integration
9. Admin Dashboard
10. Testing & Deployment

Let's begin! 🚀
