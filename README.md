# 💰 WealthBuddy - Personal Finance Manager

A comprehensive personal finance management application built with Angular, Spring Boot, and PostgreSQL.

## 🏗️ Architecture

```
wealthBuddy/
├── backend/           # Spring Boot REST API
├── frontend/          # Angular Web Application  
├── docker-compose.yml # PostgreSQL Database Setup
└── README.md
```

## 🛠️ Technology Stack

### Backend
- **Spring Boot 3.2.0** - REST API Framework
- **Spring Security** - Authentication & Authorization
- **Spring Data JPA** - Database ORM
- **JWT** - Stateless Authentication
- **PostgreSQL** - Primary Database
- **Maven** - Dependency Management

### Frontend
- **Angular 17** - Frontend Framework
- **Angular Material** - UI Components
- **TypeScript** - Programming Language
- **RxJS** - Reactive Programming

### Database
- **PostgreSQL 15** - Relational Database
- **pgAdmin** - Database Administration Tool

## 🚀 Quick Start

### Prerequisites
- Java 17 or higher
- Node.js 18 or higher
- Docker & Docker Compose
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/wealthBuddy.git
cd wealthBuddy
```

### 2. Setup Database

Start PostgreSQL using Docker Compose:

```bash
docker-compose up -d
```

This will start:
- PostgreSQL on port 5432
- pgAdmin on port 5050 (admin@wealthbuddy.com / admin123)

### 3. Setup Backend

```bash
cd backend

# Build the project
mvn clean install

# Run the application
mvn spring-boot:run
```

The backend will be available at: `http://localhost:8080`

### 4. Setup Frontend

```bash
cd frontend

# Install dependencies
npm install

# Start development server
ng serve
```

The frontend will be available at: `http://localhost:4200`

## 📱 Features

### Authentication
- ✅ User Registration
- ✅ User Login
- ✅ JWT Token Authentication
- ✅ Protected Routes
- ✅ Password Strength Validation

### Dashboard
- ✅ Welcome Screen
- ✅ Financial Overview Cards
- ✅ Quick Actions
- ✅ Responsive Design
- 🔄 Real-time Updates (Coming Soon)

### Planned Features
- 📊 Transaction Management
- 💰 Account Management
- 📈 Budget Planning
- 📋 Financial Reports
- 🎯 Savings Goals
- 📱 Mobile App

## 🎨 Design Features

- **Modern UI/UX** - Clean, intuitive interface
- **Responsive Design** - Works on all devices
- **Dark/Light Theme** - Coming soon
- **Accessibility** - WCAG compliant
- **PWA Support** - Coming soon

## 🔐 Security Features

- **JWT Authentication** - Stateless token-based auth
- **Password Encryption** - BCrypt hashing
- **CORS Protection** - Configured for security
- **Input Validation** - Client and server-side
- **SQL Injection Protection** - JPA/Hibernate
- **XSS Protection** - Angular sanitization

## 📚 API Documentation

### Authentication Endpoints

#### Register User
```http
POST /api/auth/signup
Content-Type: application/json

{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe"
}
```

#### Login User
```http
POST /api/auth/signin
Content-Type: application/json

{
  "username": "john_doe",
  "password": "password123"
}
```

**Response:**
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIs...",
  "tokenType": "Bearer",
  "id": 1,
  "username": "john_doe",
  "email": "john@example.com",
  "roles": ["ROLE_USER"]
}
```

### Protected Endpoints

All protected endpoints require:
```http
Authorization: Bearer <your-jwt-token>
```

## 🗄️ Database Schema

### Users Table
```sql
CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    username VARCHAR(20) UNIQUE NOT NULL,
    email VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(120) NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE
);
```

### Roles Table
```sql
CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    name VARCHAR(20) UNIQUE NOT NULL
);

INSERT INTO roles (name) VALUES ('ROLE_USER'), ('ROLE_ADMIN');
```

## 🚀 Deployment

### Production Environment Variables

#### Backend (.env)
```env
DATABASE_URL=jdbc:postgresql://localhost:5432/wealthbuddy_prod
DATABASE_USERNAME=wealthbuddy_prod
DATABASE_PASSWORD=your_secure_password
JWT_SECRET=your_jwt_secret_key_here
```

#### Frontend (environment.prod.ts)
```typescript
export const environment = {
  production: true,
  apiUrl: 'https://your-api-domain.com/api'
};
```

### Docker Deployment

```bash
# Build and run with Docker
docker-compose -f docker-compose.prod.yml up -d
```

## 🧪 Testing

### Backend Tests
```bash
cd backend
mvn test
```

### Frontend Tests
```bash
cd frontend
ng test
ng e2e
```

## 🛠️ Development

### Code Structure

#### Backend Structure
```
backend/src/main/java/com/wealthbuddy/
├── controller/          # REST Controllers
├── dto/                # Data Transfer Objects
├── entity/             # JPA Entities
├── repository/         # Data Repositories
├── security/           # Security Configuration
├── service/            # Business Logic
└── WealthbuddyApplication.java
```

#### Frontend Structure
```
frontend/src/app/
├── auth/               # Authentication Components
├── dashboard/          # Dashboard Components
├── guards/             # Route Guards
├── services/           # Angular Services
├── shared/             # Shared Components
└── app.module.ts
```

### Adding New Features

1. **Backend API Endpoint:**
   - Add Entity (if needed)
   - Create Repository
   - Implement Service
   - Create Controller
   - Add Tests

2. **Frontend Component:**
   - Generate component: `ng generate component feature-name`
   - Add routing
   - Create service
   - Add tests

## 🐛 Troubleshooting

### Common Issues

1. **Database Connection Error**
   ```bash
   # Check if PostgreSQL is running
   docker-compose ps
   
   # Restart database
   docker-compose restart postgres
   ```

2. **CORS Error**
   - Ensure backend CORS is configured for your frontend URL
   - Check `WebSecurityConfig.java`

3. **JWT Token Issues**
   - Check token expiration
   - Verify JWT secret configuration
   - Clear localStorage and login again

4. **Build Errors**
   ```bash
   # Backend
   mvn clean install -U
   
   # Frontend
   npm install --force
   ng build --configuration production
   ```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

- 📧 Email: support@wealthbuddy.com
- 📱 Issues: [GitHub Issues](https://github.com/yourusername/wealthBuddy/issues)
- 📖 Documentation: [Wiki](https://github.com/yourusername/wealthBuddy/wiki)

## 🎯 Roadmap

### Phase 1 (Current) ✅
- User Authentication
- Basic Dashboard
- Database Setup

### Phase 2 (Next) 🔄
- Transaction Management
- Account Management
- Basic Reporting

### Phase 3 (Future) 📋
- Budget Planning
- Goal Setting
- Advanced Analytics
- Mobile App

---

**Built with ❤️ for better financial management**
