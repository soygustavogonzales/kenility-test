# NestJS Store Application

A robust RESTful API built with NestJS and MongoDB for managing products and orders with JWT authentication.

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

#### Using npm

```bash
# Development mode
npm run start:dev

# Production mode
npm run build
npm run start:prod
```

#### Using Docker

```bash
# Start the application and MongoDB
docker-compose up

# Start in detached mode
docker-compose up -d
```

## API Documentation

Swagger documentation is available at `http://localhost:3000/api` when the application is running.

## Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## System Design Diagram

```mermaid
graph TD
    subgraph Client
        UI[User Interface] --> |HTTP Requests| API
    end
    
    subgraph "NestJS Application"
        API[API Gateway] --> |JWT Auth| Auth
        API --> |Validated Requests| Services
        
        subgraph Authentication
            Auth[Auth Module] --> |Validate| JWT[JWT Strategy]
            Auth --> |Generate Token| TokenService[Token Service]
        end
        
        subgraph Services
            Services[Service Layer] --> ProductService[Product Service]
            Services --> OrderService[Order Service]
            Services --> ClientService[Client Service]
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