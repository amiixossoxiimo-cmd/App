#!/bin/bash

echo "🐾 Adding upgraded sample animals to AdoptMe..."
echo ""

API_URL="http://localhost:8080/api/cats"

# Check if we're on EC2, use public IP
if curl -s -m 2 http://169.254.169.254/latest/meta-data/public-ipv4 > /dev/null 2>&1; then
    PUBLIC_IP=$(curl -s http://169.254.169.254/latest/meta-data/public-ipv4)
    API_URL="http://$PUBLIC_IP:8080/api/cats"
    echo "✅ Detected EC2 instance: $PUBLIC_IP"
fi

# Wait for backend to be ready
echo "⏳ Waiting for backend to be ready..."
for i in {1..30}; do
    if curl -s "$API_URL" > /dev/null 2>&1; then
        echo "✅ Backend is ready!"
        break
    fi
    if [ $i -eq 30 ]; then
        echo "❌ Backend is not responding. Make sure the application is running."
        exit 1
    fi
    sleep 2
done

echo ""

# Sample animals with new fields
animals=(
    '{"name":"Max","description":"Friendly golden retriever who loves to play fetch and go for long walks. Great with kids!","age":3,"species":"Dog","gender":"Male","location":"Los Angeles, CA","imageUrl":"https://placedog.net/500/500?id=1"}'
    '{"name":"Luna","description":"Calm and elegant black cat. Perfect for quiet homes. Loves sunny windows.","age":2,"species":"Cat","gender":"Female","location":"San Francisco, CA","imageUrl":"https://placekitten.com/500/500"}'
    '{"name":"Rocky","description":"Energetic German Shepherd looking for an active family. Loves hiking and adventures.","age":5,"species":"Dog","gender":"Male","location":"New York, NY","imageUrl":"https://placedog.net/500/500?id=2"}'
    '{"name":"Bella","description":"Sweet calico kitten full of personality. Playful and affectionate.","age":1,"species":"Cat","gender":"Female","location":"Austin, TX","imageUrl":"https://placekitten.com/501/501"}'
    '{"name":"Charlie","description":"Loving labrador who adores children. Gentle giant with a heart of gold.","age":4,"species":"Dog","gender":"Male","location":"Seattle, WA","imageUrl":"https://placedog.net/500/500?id=3"}'
    '{"name":"Milo","description":"Playful orange tabby kitten ready for adventures. Curious and intelligent.","age":1,"species":"Cat","gender":"Male","location":"Boston, MA","imageUrl":"https://placekitten.com/502/502"}'
)

# Add each animal
for animal in "${animals[@]}"; do
    name=$(echo "$animal" | grep -o '"name":"[^"]*"' | cut -d'"' -f4)
    species=$(echo "$animal" | grep -o '"species":"[^"]*"' | cut -d'"' -f4)
    
    echo "➕ Adding $name ($species)..."
    
    response=$(curl -s -X POST "$API_URL" \
        -H "Content-Type: application/json" \
        -d "$animal")
    
    if [ $? -eq 0 ]; then
        echo "   ✅ $name added successfully"
    else
        echo "   ❌ Failed to add $name"
    fi
done

echo ""
echo "🎉 Sample data loaded!"
echo ""
if [ "$PUBLIC_IP" != "" ]; then
    echo "Visit http://$PUBLIC_IP to see the animals"
else
    echo "Visit http://localhost to see the animals"
fi
