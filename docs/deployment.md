# 🚀 Deployment Guide — Smart Advisor

## Docker Setup

### Prerequisites
- Docker installed on your machine
- Docker Compose installed


### Running with Docker

```bash
# Build and start all services
docker-compose up --build

# Stop all services
docker-compose down
```

### Services
| Service | Port | Description |
|---------|------|-------------|
| app | 3000 | Smart Advisor API |
| db | 5432 | PostgreSQL Database |
