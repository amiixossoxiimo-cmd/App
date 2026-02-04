#!/bin/bash

echo "🐱 Adding sample cats to PurrfectMatch..."
echo ""

API_URL="http://localhost:8080/api/cats"

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

# Sample cats data
cats=(
    '{"name":"Whiskers","description":"A friendly orange tabby who loves to play and cuddle. Perfect for families!","age":3,"imageUrl":"https://placekitten.com/400/300"}'
    '{"name":"Luna","description":"Calm and elegant black cat. Loves quiet afternoons and gentle pets.","age":5,"imageUrl":"https://placekitten.com/401/300"}'
    '{"name":"Mittens","description":"Playful kitten with white paws. Full of energy and ready for adventure!","age":1,"imageUrl":"https://placekitten.com/402/300"}'
    '{"name":"Shadow","description":"Mysterious grey cat with green eyes. Independent but loving.","age":4,"imageUrl":"https://placekitten.com/403/300"}'
    '{"name":"Oliver","description":"Senior cat looking for a peaceful retirement home. Very gentle and affectionate.","age":10,"imageUrl":"https://placekitten.com/404/300"}'
    '{"name":"Bella","description":"Beautiful calico with a big personality. Loves attention and treats!","age":2,"imageUrl":"https://placekitten.com/405/300"}'
)

# Add each cat
for cat in "${cats[@]}"; do
    name=$(echo "$cat" | grep -o '"name":"[^"]*"' | cut -d'"' -f4)
    echo "➕ Adding $name..."
    
    response=$(curl -s -X POST "$API_URL" \
        -H "Content-Type: application/json" \
        -d "$cat")
    
    if [ $? -eq 0 ]; then
        echo "   ✅ $name added successfully"
    else
        echo "   ❌ Failed to add $name"
    fi
done

echo ""
echo "🎉 Sample data loaded! Visit http://localhost to see the cats."
