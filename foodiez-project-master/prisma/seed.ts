import { prisma } from "@/lib/prisma";

async function main() {
  console.log("Seeding database...");

  await prisma.menuItem.deleteMany(); // Clears old data
  await prisma.type.deleteMany(); // Clears old data

  await prisma.type.createMany({
    data: [
      {
        name: "Fast Food",
        description: "Burger, Pizzas, Fries, Sandwiches",
        image: "https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg"
      },
      {
        name: "Beverages",
        description: "Soft Drinks, Juices, Shakes, Coffee, Tea",
        image: "https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg"
      },
      {
        name: "Desserts",
        description: "Ice Cream, Cakes, Pastries, Puddings",
        image: "https://media.istockphoto.com/id/649518642/photo/chocolate-and-vanilla-caramel-cupcakes-served-with-dark-and-white-chocolate-chippings.jpg?s=1024x1024&w=is&k=20&c=705-DeFHrrzGTBN61EE9i-l45PxykcZsv6CyatBOAdI="
      },


      {
        name: "Breakfast",
        description: "Pancakes, Omelettes, Waffles, Cereal",
        image: "https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg"
      },
      {
        name: "Main Course",
        description: "Pasta, Rice Bowls, Curries, Steaks",
        image: "https://images.pexels.com/photos/8500/food-dinner-pasta-spaghetti-8500.jpg"
      },
      {
        name: "Appetizers",
        description: "Nachos, Spring Rolls, Mozzarella Sticks",
        image: "https://images.pexels.com/photos/1647164/pexels-photo-1647164.jpeg"
      },
      {
        name: "Healthy Options",
        description: "Salads, Smoothies, Wraps, Low-Calorie Meals",
        image: "https://images.pexels.com/photos/406152/pexels-photo-406152.jpeg"
      },
      {
        name: "Seafood",
        description: "Grilled Fish, Sushi, Shrimp, Lobster",
        image: "https://images.pexels.com/photos/3298689/pexels-photo-3298689.jpeg"
      }
    ]

  })

  await prisma.menuItem.createMany({
    data: [
      {
        name: "Margherita Pizza",
        description: "Classic pizza with tomato sauce, mozzarella, and basil.",
        price: 150,
        imageUrl: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=1981&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        typeName: "Fast Food"
      },
      {
        name: "Cheeseburger",
        description: "Grilled beef patty with cheese, lettuce, tomato, and special sauce.",
        price: 120,
        imageUrl: "https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg",
        typeName: "Fast Food"
      },
      {
        name: "French Fries",
        description: "Crispy golden fries served with ketchup.",
        price: 80,
        imageUrl: "https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        typeName: "Fast Food"
      },
      {
        name: "Cappuccino",
        description: "Espresso coffee with steamed milk and foam.",
        price: 90,
        imageUrl: "https://images.unsplash.com/photo-1533776992670-a72f4c28235e?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        typeName: "Beverages"
      },
      {
        name: "Mango Smoothie",
        description: "Refreshing mango smoothie with yogurt and honey.",
        price: 110,
        imageUrl: "https://www.acouplecooks.com/wp-content/uploads/2020/06/Mango-Smoothie-002.jpg",
        typeName: "Beverages"
      },
      {
        name: "Chocolate Cake",
        description: "Rich and moist chocolate cake with a creamy ganache.",
        price: 200,
        imageUrl: "https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg",
        typeName: "Desserts"
      },
      {
        name: "Grilled Salmon",
        description: "Perfectly grilled salmon with lemon butter sauce.",
        price: 350,
        imageUrl: "https://images.pexels.com/photos/106343/pexels-photo-106343.jpeg",
        typeName: "Seafood"
      },
      {
        name: "Caesar Salad",
        description: "Crisp romaine lettuce, parmesan cheese, croutons, and Caesar dressing.",
        price: 130,
        imageUrl: "https://images.unsplash.com/photo-1599021419847-d8a7a6aba5b4?q=80&w=1958&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        typeName: "Healthy Options"
      },
      {
        name: "Pancakes",
        description: "Fluffy pancakes served with maple syrup and butter.",
        price: 140,
        imageUrl: "https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg",
        typeName: "Breakfast"
      },
      {
        name: "Pepperoni Pizza",
        description: "Crispy thin crust pizza with spicy pepperoni and mozzarella cheese.",
        price: 180,
        imageUrl: "https://images.pexels.com/photos/825661/pexels-photo-825661.jpeg",
        typeName: "Fast Food"
      },
      {
        name: "Tandoori Chicken",
        description: "Spicy grilled chicken marinated with yogurt and Indian spices.",
        price: 250,
        imageUrl: "https://plus.unsplash.com/premium_photo-1695931841253-1e17e7ed59b5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        typeName: "Main Course"
      },
      {
        name: "Spaghetti Carbonara",
        description: "Creamy pasta with bacon, eggs, parmesan, and black pepper.",
        price: 220,
        imageUrl: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        typeName: "Main Course"
      },
      {
        name: "Garlic Bread",
        description: "Toasted baguette with garlic butter and herbs.",
        price: 100,
        imageUrl: "https://images.unsplash.com/photo-1573140401552-3fab0b24306f?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        typeName: "Appetizers"
      },
      {
        name: "Spring Rolls",
        description: "Crispy spring rolls filled with vegetables and served with sweet chili sauce.",
        price: 90,
        imageUrl: "https://images.unsplash.com/photo-1606525437679-037aca74a3e9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        typeName: "Appetizers"
      },
      {
        name: "Sushi Platter",
        description: "Assorted sushi rolls with fresh salmon, tuna, and avocado.",
        price: 300,
        imageUrl: "https://images.unsplash.com/photo-1726824863833-e88146cf0a72?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        typeName: "Seafood"
      },
      {
        name: "Lemon Iced Tea",
        description: "Refreshing iced tea with a hint of lemon.",
        price: 70,
        imageUrl: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        typeName: "Beverages"
      },
      {
        name: "Strawberry Cheesecake",
        description: "Creamy cheesecake topped with fresh strawberries and glaze.",
        price: 220,
        imageUrl: "https://images.pexels.com/photos/3026801/pexels-photo-3026801.jpeg",
        typeName: "Desserts"
      },
      {
        name: "Omelette",
        description: "Fluffy eggs with cheese, tomatoes, and herbs.",
        price: 100,
        imageUrl: "https://images.unsplash.com/photo-1510693206972-df098062cb71?q=80&w=1996&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        typeName: "Breakfast"
      },
      {
        name: "Vegetable Wrap",
        description: "Whole wheat wrap filled with fresh vegetables and hummus.",
        price: 120,
        imageUrl: "https://plus.unsplash.com/premium_photo-1664648119277-ce59c8ba5f43?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        typeName: "Healthy Options"
      },

      {
        name: "Butter Chicken",
        description: "Rich and creamy tomato-based curry with tender chicken pieces.",
        price: 280,
        imageUrl: "https://images.unsplash.com/photo-1728910107534-e04e261768ae?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        typeName: "Main Course"
      },
      {
        name: "Paneer Tikka",
        description: "Marinated and grilled cottage cheese cubes served with mint chutney.",
        price: 220,
        imageUrl: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        typeName: "Appetizers"
      },
      {
        name: "Masala Dosa",
        description: "Crispy South Indian rice crepe stuffed with spiced potato filling.",
        price: 150,
        imageUrl: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        typeName: "Breakfast"
      },
      {
        name: "Chole Bhature",
        description: "Spicy chickpea curry served with deep-fried fluffy bread.",
        price: 180,
        imageUrl: "https://indianinvercargill.co.nz/wp-content/uploads/2021/03/CholeBhature_hd-scaled.jpg",
        typeName: "Main Course"
      },
      {
        name: "Biryani",
        description: "Fragrant basmati rice cooked with aromatic spices and choice of chicken or vegetables.",
        price: 250,
        imageUrl: "https://plus.unsplash.com/premium_photo-1694141252026-3df1de888a21?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        typeName: "Main Course"
      },
      {
        name: "Pani Puri",
        description: "Crispy puris filled with spiced water, potatoes, and chickpeas.",
        price: 90,
        imageUrl: "https://th.bing.com/th/id/OIP.lxlkcpiNlFZByj9c2kZOhwHaE8?rs=1&pid=ImgDetMain",
        typeName: "Fast Food"
      },
      {
        name: "Samosa",
        description: "Crispy fried pastry filled with spicy potato and peas.",
        price: 80,
        imageUrl: "https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        typeName: "Appetizers"
      },
      {
        name: "Dal Tadka",
        description: "Yellow lentils tempered with garlic, cumin, and ghee.",
        price: 160,
        imageUrl: "https://th.bing.com/th/id/OIP.M6_-FAJf2Ui9BKIYb4DxiQHaHa?rs=1&pid=ImgDetMain",
        typeName: "Main Course"
      },
      {
        name: "Rasgulla",
        description: "Soft and spongy cottage cheese balls soaked in sugar syrup.",
        price: 100,
        imageUrl: "https://th.bing.com/th/id/OIP.5mqPDg2MaDbI4nTq1AVeYAHaE8?rs=1&pid=ImgDetMain",
        typeName: "Desserts"
      },
      {
        name: "Jalebi",
        description: "Deep-fried spirals soaked in saffron-flavored sugar syrup.",
        price: 120,
        imageUrl: "https://th.bing.com/th/id/OIP.1vFsCtWhBeYUWASjbFOgXAHaF3?rs=1&pid=ImgDetMain",
        typeName: "Desserts"
      },
      {
        name: "Lassi",
        description: "Traditional yogurt-based drink, available in sweet and salty flavors.",
        price: 90,
        imageUrl: "https://images.unsplash.com/photo-1692620609860-be6717812f71?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        typeName: "Beverages"
      },
      {
        name: "Gulab Jamun",
        description: "Deep-fried dough balls soaked in rose-flavored sugar syrup.",
        price: 130,
        imageUrl: "https://th.bing.com/th/id/OIP.B32bansRI7RS3yfbUSEBNwHaHa?rs=1&pid=ImgDetMain",
        typeName: "Desserts"
      },
      {
        name: "Rajma Chawal",
        description: "Red kidney beans curry served with steamed basmati rice.",
        price: 190,
        imageUrl: "https://images.unsplash.com/photo-1668236534990-73c4ed23043c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        typeName: "Main Course"
      },
      {
        name: "Pav Bhaji",
        description: "Spicy mashed vegetable curry served with buttered bread rolls.",
        price: 150,
        imageUrl: "https://images.unsplash.com/photo-1626132647523-66f5bf380027?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        typeName: "Fast Food"
      },
      {
        name: "Aloo Paratha",
        description: "Stuffed whole wheat bread with spiced mashed potatoes, served with butter and yogurt.",
        price: 140,
        imageUrl: "https://th.bing.com/th/id/OIP.DGnPBCapDFxUP9EF2mhOpAHaEg?w=520&h=316&rs=1&pid=ImgDetMain",
        typeName: "Breakfast"
      }
    ]
  });

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error("Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
