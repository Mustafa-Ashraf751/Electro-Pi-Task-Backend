import mongoose from 'mongoose';
import * as path from 'path';
import * as dotenv from 'dotenv';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const categorySchema = new mongoose.Schema(
  { id: String, name: String, emoji: String, image: String },
  { timestamps: true },
);
const CategoryModel = mongoose.model('Category', categorySchema);

const categories = [
  { id: 'pizza',    name: 'Pizza',    emoji: '🍕', image: 'https://ik.imagekit.io/rrtcdwb8g/assets/food-pizza.jpg' },
  { id: 'burgers',  name: 'Burgers',  emoji: '🍔', image: 'https://ik.imagekit.io/rrtcdwb8g/assets/food-burger.jpg' },
  { id: 'sushi',    name: 'Sushi',    emoji: '🍣', image: 'https://ik.imagekit.io/rrtcdwb8g/assets/food-sushi.jpg' },
  { id: 'chicken',  name: 'Chicken',  emoji: '🍗', image: 'https://ik.imagekit.io/rrtcdwb8g/assets/food-chicken.jpg' },
  { id: 'desserts', name: 'Desserts', emoji: '🍰', image: 'https://ik.imagekit.io/rrtcdwb8g/assets/food-dessert.jpg' },
  { id: 'drinks',   name: 'Drinks',   emoji: '🥤', image: 'https://ik.imagekit.io/rrtcdwb8g/assets/food-drinks.jpg' },
];

async function seed() {
  await mongoose.connect(process.env.MONGO_URL!);
  console.log('Connected to MongoDB');

CategoryModel.deleteMany({}).then(() => {
  CategoryModel.insertMany(categories).then(() => {
    console.log(`Seeded ${categories.length} categories`);
    }).catch((err) => {
      console.error(err);
      process.exit(1);
    });
  }).catch((err) => {
    console.error(err);
    process.exit(1);
  });
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});