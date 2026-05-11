// src/seed.ts
import mongoose from 'mongoose';
import * as path from 'path';
import * as dotenv from 'dotenv';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const productSchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    price: Number,
    rating: Number,
    category: String,
    image: String,
  },
  { timestamps: true },
);

const ProductModel = mongoose.model('Product', productSchema);

const products = [
  {
    name: 'Margherita Pizza',
    description: 'Fresh mozzarella, basil, San Marzano tomatoes',
    price: 12.99,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400',
    category: 'pizza',
  },
  {
    name: 'Pepperoni Classic',
    description: 'Loaded with pepperoni and melted cheese',
    price: 14.5,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400',
    category: 'pizza',
  },
  {
    name: 'Cheese Burger',
    description: 'Beef patty, cheddar, lettuce, special sauce',
    price: 9.99,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400',
    category: 'burgers',
  },
  {
    name: 'Double Smash',
    description: 'Two smash patties, caramelized onions',
    price: 11.5,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=400',
    category: 'burgers',
  },
  {
    name: 'Salmon Nigiri Set',
    description: '8 pieces of premium salmon nigiri',
    price: 18.0,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1617196034183-421b4040ed20?w=400',
    category: 'sushi',
  },
  {
    name: 'Dragon Roll',
    description: 'Eel, avocado, cucumber, tobiko',
    price: 16.5,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1553621042-f6e147245754?w=400',
    category: 'sushi',
  },
  {
    name: 'Crispy Wings (10pc)',
    description: 'Hand-breaded with secret spice blend',
    price: 10.99,
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=400',
    category: 'chicken',
  },
  {
    name: 'Lava Cake',
    description: 'Warm chocolate with vanilla ice cream',
    price: 6.5,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400',
    category: 'desserts',
  },
  {
    name: 'Berry Smoothie',
    description: 'Strawberry, blueberry, banana, yogurt',
    price: 5.5,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=400',
    category: 'drinks',
  },
];

async function seed() {
  await mongoose.connect(process.env.MONGO_URL!);
  console.log('Connected to MongoDB');

  await ProductModel.deleteMany({});
  console.log('Cleared existing products');

  await ProductModel.insertMany(products);
  console.log(`Seeded ${products.length} products`);

  await mongoose.disconnect();
  console.log('Done!');
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});