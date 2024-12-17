# MSC (Management System for Consulting)

## Project Overview
MSC is a comprehensive management system designed for consulting firms. It provides features for project management, time tracking, and financial management with role-based access control.

## Technical Stack
- Frontend: React with TypeScript, Material-UI
- Backend: Spring Boot
- Database: PostgreSQL
- Containerization: Docker

## Getting Started

### Prerequisites
- Docker and Docker Compose
- Node.js 18+ (for local development)
- Java 17 (for local development)

### Development Setup
1. Clone the repository
2. Run the development environment:
   ```bash
   docker-compose up
   ```
3. Access the application:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8080
   - Swagger UI: http://localhost:8080/swagger-ui.html

### Local Development
#### Frontend
```bash
cd frontend
npm install
npm start
```

#### Backend
```bash
cd backend
./mvnw spring-boot:run
```

## Project Structure
```
msc/
├── frontend/               # React frontend application
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── services/      # API services
│   │   ├── store/         # Redux store
│   │   └── types/         # TypeScript types
│   └── public/            # Static assets
├── backend/               # Spring Boot backend
│   └── src/
│       └── main/
│           ├── java/      # Java source files
│           └── resources/ # Application properties
└── docker-compose.yml     # Docker composition
```

## Documentation
- [Development Plan](development-plan.md)
- [Phase 1 Specifications](phase1-specs.md)

## Contributing
Please read our contributing guidelines before submitting pull requests.

## License
This project is proprietary and confidential.
