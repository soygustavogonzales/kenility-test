# NestJS Store Application

A robust RESTful API built with NestJS and MongoDB for managing products and orders with JWT authentication.

## Table of Contents

- [System Design Diagram](#system-design-diagram)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Data Models](#data-models)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Testing Authentication Endpoints](#testing-authentication-endpoints)
- [Testing](#testing)
- [Troubleshooting](#troubleshooting)
- [License](#license)

## System Design Diagram

```mermaid
graph TD
    subgraph Client
        UI[User Interface] --> |HTTP Requests| API
    end
    
    subgraph "NestJS Application"
        API[API Gateway] --> |JWT Auth| Auth
        API --> |Validated Requests| ServiceLayer
        
        subgraph Authentication
            Auth[Auth Module] --> |Validate| JWT[JWT Strategy]
            Auth --> |Generate Token| TokenService[Token Service]
        end
        
        subgraph ServiceComponents
            ServiceLayer[Service Layer] --> ProductService[Product Service]
            ServiceLayer --> OrderService[Order Service]
            ServiceLayer --> ClientService[Client Service]
        end
        
        subgraph Controllers
            ProductService --> ProductController[Product Controller]
            OrderService --> OrderController[Order Controller]
            ClientService --> ClientController[Client Controller]
        end
        
        subgraph DTOs
            ProductController --> |Uses| ProductDTO[Product DTOs]
            OrderController --> |Uses| OrderDTO[Order DTOs]
            ClientController --> |Uses| ClientDTO[Client DTOs]
        end
        
        subgraph "MongoDB Models"
            ProductService --> |Uses| ProductModel[Product Model]
            OrderService --> |Uses| OrderModel[Order Model]
            ClientService --> |Uses| ClientModel[Client Model]
        end
    end
    
    subgraph Database
        MongoDB[(MongoDB)] --> |Stores| ProductCollection[Products]
        MongoDB --> |Stores| OrderCollection[Orders] 
        MongoDB --> |Stores| ClientCollection[Clients]
    end
    
    subgraph "API Documentation"
        Swagger[Swagger UI] --> |Documents| API
    end
    
    subgraph "Docker Environment"
        AppContainer[App Container] --> |Contains| NestJSApp[NestJS App]
        DBContainer[MongoDB Container] --> |Contains| MongoDB
    end 


## Features

- **Product Management**: Create and retrieve products
- **Order Management**: Create, update, and analyze orders
- **Sales Analytics**: Get total sales for different time periods and highest amount orders
- **Authentication**: JWT-based authentication for secure API access
- **API Documentation**: Swagger UI for easy API exploration and testing

## Technology Stack

- **Framework**: NestJS
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT with Passport
- **API Documentation**: Swagger
- **Containerization**: Docker and Docker Compose

## Project Structure

The application follows a modular architecture with the following main components:

- **Products Module**: Handles product-related operations
- **Orders Module**: Manages order processing and analytics
- **Auth Module**: Provides authentication and authorization
- **Clients Module**: Manages client information

## API Endpoints

### Authentication

- `POST /auth/login` - User login (returns JWT token)

### Products

- `POST /product` - Create a new product
- `GET /product/:id` - Get a product by ID

### Orders

- `POST /orders` - Create a new order
- `PUT /orders/:id` - Update an existing order
- `GET /orders/sales?fix_period=last month` - Get total sales for a specified period
- `GET /orders/highest-amount-order` - Get the order with the highest amount

## Data Models

### Product

- `name`: String (required)
- `sku`: String (required, unique)
- `picture`: String
- `price`: Number (required)

### Order

- `client_name`: String (required)
- `total`: Number (required)
- `product_list`: Array of Product IDs

### Client

- `name`: String (required)
- `lastname`: String (required)
- `address`: String

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn
- Docker and Docker Compose (for containerized deployment)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/nestjs-store-app.git
   cd nestjs-store-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following content:
   ```
   MONGODB_URI=mongodb://mongo:27017/nest-store
   JWT_SECRET=your_jwt_secret_key
   JWT_EXPIRATION=3600s
   ```

### Running the Application

#### Using npm (Locally)

1. Make sure MongoDB is installed and running locally:
   ```bash
   # On macOS with Homebrew
   brew services start mongodb-community

   # On Ubuntu
   sudo systemctl start mongod
   ```

2. Update the MongoDB connection in `src/app.module.ts` to use localhost:
   ```typescript
   MongooseModule.forRoot('mongodb://localhost:27017', {
     dbName: 'store',
   }),
   ```

3. Start the application:
   ```bash
   # Development mode
   npm run start:dev

   # Production mode
   npm run build
   npm run start:prod
   ```

4. The API will be available at http://localhost:3000

#### Using Docker

```bash
# Start the application and MongoDB
docker-compose up

# Start in detached mode
docker-compose up -d
```

When using Docker, make sure the MongoDB connection in `src/app.module.ts` points to the MongoDB container:
```typescript
MongooseModule.forRoot('mongodb://mongo:27017', {
  dbName: 'store',
}),
```

## API Documentation

Swagger documentation is available at `http://localhost:3000/api` when the application is running.

## Testing Authentication Endpoints

### 1. Login to get a JWT token

```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username": "test", "password": "password"}'
```

This will return a JWT token:

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### 2. Use the token to access protected endpoints

```bash
# Get the highest amount order
curl -X GET http://localhost:3000/orders/highest-amount-order \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"

# Create a product
curl -X POST http://localhost:3000/product \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{"name": "New Product", "sku": "PROD123", "picture": "http://example.com/image.jpg", "price": 99.99}'

# Create an order
curl -X POST http://localhost:3000/orders \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{"client_name": "John Doe", "total": 100, "product_list": ["VALID_PRODUCT_ID"]}'
```

Replace `YOUR_TOKEN_HERE` with the actual token received from the login request, and `VALID_PRODUCT_ID` with an actual MongoDB ObjectId of a product.

## Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov
```

## Troubleshooting

### Connection Issues

- **MongoDB Connection Error**: If you see `getaddrinfo ENOTFOUND mongo`, ensure you're using the correct connection string:
  - For local development: `mongodb://localhost:27017`
  - For Docker: `mongodb://mongo:27017`

- **JWT Authentication Issues**: If you receive 401 Unauthorized errors, ensure:
  - Your JWT token is valid and not expired
  - You're including it in the `Authorization` header with the `Bearer` prefix

- **Mongoose Schema Errors**: If you encounter schema validation errors:
  - For Product IDs in orders, ensure you're using valid MongoDB ObjectIds (24-character hex strings)
  - Check that required fields are provided in your request payload

### Docker Issues

- **Container Communication**: If the NestJS app can't connect to MongoDB:
  - Ensure both containers are on the same Docker network
  - Check that the MongoDB service is named `mongo` in docker-compose.yml
  - Verify the MongoDB container is running: `docker-compose ps`

- **Port Conflicts**: If port 3000 is already in use:
  - Change the port mapping in docker-compose.yml: `"3001:3000"`

## License

This project is licensed under the MIT License - see the LICENSE file for details.

