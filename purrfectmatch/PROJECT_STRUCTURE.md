# PurrfectMatch - Project Structure

```
purrfectmatch/
├── backend/
│   ├── src/
│   │   └── main/
│   │       ├── java/
│   │       │   └── com/
│   │       │       └── purrfectmatch/
│   │       │           ├── PurrfectMatchApplication.java
│   │       │           ├── entity/
│   │       │           │   └── Cat.java
│   │       │           ├── repository/
│   │       │           │   └── CatRepository.java
│   │       │           └── controller/
│   │       │               └── CatController.java
│   │       └── resources/
│   │           └── application.properties
│   ├── pom.xml
│   └── Dockerfile
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── api.js
│   │   └── main.jsx
│   ├── public/
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── Dockerfile
│   └── nginx.conf
├── docker-compose.yml
└── README.md
```
