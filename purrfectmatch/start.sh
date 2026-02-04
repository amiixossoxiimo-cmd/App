#!/bin/bash

echo "🐱 PurrfectMatch - Cat Adoption Platform"
echo "========================================"
echo ""

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

echo "✅ Docker and Docker Compose are installed"
echo ""

# Stop and remove existing containers
echo "🧹 Cleaning up existing containers..."
docker-compose down -v

echo ""
echo "🏗️  Building and starting all services..."
echo "This may take a few minutes on first run..."
echo ""

# Build and start services
docker-compose up --build -d

echo ""
echo "⏳ Waiting for services to be ready..."
sleep 10

# Check if services are running
if docker-compose ps | grep -q "Up"; then
    echo ""
    echo "✅ All services are up and running!"
    echo ""
    echo "📍 Access points:"
    echo "   Frontend:  http://localhost"
    echo "   Backend:   http://localhost:8080/api/cats"
    echo "   Database:  localhost:5432"
    echo ""
    echo "📝 View logs with: docker-compose logs -f"
    echo "🛑 Stop services with: docker-compose down"
    echo ""
    echo "🎉 Happy cat adopting!"
else
    echo ""
    echo "❌ Some services failed to start. Check logs with:"
    echo "   docker-compose logs"
fi
