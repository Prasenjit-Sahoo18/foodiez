import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create menu types
  const types = [
    {
      name: 'Appetizers',
      description: 'Start your meal with our delicious appetizers',
      image: '/images/appetizers.jpg'
    },
    {
      name: 'Main Course',
      description: 'Our signature main course dishes',
      image: '/images/main-course.jpg'
    },
    {
      name: 'Desserts',
      description: 'Sweet endings to your meal',
      image: '/images/desserts.jpg'
    },
    {
      name: 'Beverages',
      description: 'Refreshing drinks to complement your meal',
      image: '/images/beverages.jpg'
    }
  ];

  for (const type of types) {
    await prisma.type.upsert({
      where: { name: type.name },
      update: {},
      create: type
    });
  }

  // Create menu items
  const menuItems = [
    {
      name: 'Garlic Bread',
      description: 'Crispy bread topped with garlic butter and herbs',
      price: 5.99,
      imageUrl: '/images/garlic-bread.jpg',
      typeName: 'Appetizers'
    },
    {
      name: 'Caesar Salad',
      description: 'Fresh romaine lettuce with Caesar dressing and croutons',
      price: 7.99,
      imageUrl: '/images/caesar-salad.jpg',
      typeName: 'Appetizers'
    },
    {
      name: 'Grilled Salmon',
      description: 'Fresh salmon fillet grilled to perfection',
      price: 24.99,
      imageUrl: '/images/grilled-salmon.jpg',
      typeName: 'Main Course'
    },
    {
      name: 'Chocolate Cake',
      description: 'Rich chocolate cake with chocolate ganache',
      price: 8.99,
      imageUrl: '/images/chocolate-cake.jpg',
      typeName: 'Desserts'
    },
    {
      name: 'Fresh Lemonade',
      description: 'Homemade lemonade with fresh lemons',
      price: 4.99,
      imageUrl: '/images/lemonade.jpg',
      typeName: 'Beverages'
    }
  ];

  for (const item of menuItems) {
    await prisma.menuItem.upsert({
      where: { id: item.name }, // Using name as a unique identifier for upsert
      update: {},
      create: item
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
