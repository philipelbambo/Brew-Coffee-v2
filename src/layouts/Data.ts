    // data.ts - Sample dessert data for the ordering system
    import { Dessert } from './Types';

    export const desserts: Dessert[] = [
    {
        id: 1,
        name: "Chocolate Lava Cake",
        price: 12.99,
        image: "/images/SliderGallery/bread1.png",
        description: "Indulge in our signature Chocolate Lava Cake, a decadent masterpiece that's sure to satisfy your deepest chocolate cravings.",
        ingredients: [
        "Premium Belgian dark chocolate",
        "Fresh farm eggs",
        "Unsalted butter",
        "Heavy cream",
        "All-purpose flour",
        "Granulated sugar",
        "Vanilla bean ice cream",
        "Fresh raspberries",
        "Powdered sugar",
        "Fresh mint"
        ],
        nutritionalInfo: {
        calories: "520 kcal",
        fat: "32g",
        carbs: "58g",
        protein: "8g",
        sugar: "45g"
        },
        allergens: ["Eggs", "Dairy", "Gluten", "May contain nuts"],
        servingSize: "1 slice (150g)",
        preparationTime: "25 minutes",
        difficulty: "Medium"
    },
    {
        id: 2,
        name: "Strawberry Cheesecake",
        price: 9.99,
        image: "/images/SliderGallery/bread2.png",
        description: "Experience the perfect balance of creamy and fruity with our classic New York-style Strawberry Cheesecake.",
        ingredients: [
        "Philadelphia cream cheese",
        "Fresh strawberries",
        "Graham crackers",
        "Unsalted butter",
        "Fresh eggs",
        "Pure vanilla extract",
        "Granulated sugar",
        "Sour cream",
        "Heavy whipping cream",
        "Strawberry compote"
        ],
        nutritionalInfo: {
        calories: "450 kcal",
        fat: "28g",
        carbs: "42g",
        protein: "9g",
        sugar: "35g"
        },
        allergens: ["Dairy", "Eggs", "Gluten"],
        servingSize: "1 slice (120g)",
        preparationTime: "4 hours (including chill time)",
        difficulty: "Easy"
    },
    {
        id: 3,
        name: "Tiramisu",
        price: 11.99,
        image: "/images/SliderGallery/bread3.png",
        description: "Transport yourself to Italy with our authentic Tiramisu, a beloved classic that perfectly captures the essence of Italian dolce vita.",
        ingredients: [
        "Ladyfinger cookies (Savoiardi)",
        "Mascarpone cheese",
        "Fresh egg yolks",
        "Premium espresso coffee",
        "Coffee liqueur",
        "Marsala wine",
        "Granulated sugar",
        "Heavy cream",
        "Unsweetened cocoa powder",
        "Dark chocolate shavings"
        ],
        nutritionalInfo: {
        calories: "380 kcal",
        fat: "24g",
        carbs: "32g",
        protein: "7g",
        sugar: "28g"
        },
        allergens: ["Dairy", "Eggs", "Gluten", "Contains alcohol"],
        servingSize: "1 portion (100g)",
        preparationTime: "6 hours (including chill time)",
        difficulty: "Medium"
    },
    {
        id: 4,
        name: "Ice Cream Sundae",
        price: 8.99,
        image: "/images/SliderGallery/bread4.png",
        description: "Relive childhood memories with our spectacular Ice Cream Sundae, a towering treat that's as beautiful as it is delicious.",
        ingredients: [
        "House-made vanilla ice cream",
        "Madagascar vanilla beans",
        "Fresh heavy cream",
        "Chocolate fudge sauce",
        "Whipped cream",
        "Toasted almonds",
        "Rainbow sprinkles",
        "Maraschino cherry",
        "Wafer cookie",
        "Whole milk"
        ],
        nutritionalInfo: {
        calories: "620 kcal",
        fat: "38g",
        carbs: "68g",
        protein: "12g",
        sugar: "58g"
        },
        allergens: ["Dairy", "Nuts", "Gluten", "May contain eggs"],
        servingSize: "1 sundae (250g)",
        preparationTime: "10 minutes",
        difficulty: "Easy"
    },
    {
        id: 5,
        name: "Apple Pie",
        price: 10.99,
        image: "/images/SliderGallery/bread5.png",
        description: "Savor the taste of home with our traditional Apple Pie, made from a cherished family recipe that's been passed down through generations.",
        ingredients: [
        "Granny Smith apples",
        "Honeycrisp apples",
        "All-purpose flour",
        "Unsalted butter",
        "Brown sugar",
        "Ground cinnamon",
        "Ground nutmeg",
        "Salt",
        "Ice water",
        "Vanilla ice cream"
        ],
        nutritionalInfo: {
        calories: "410 kcal",
        fat: "18g",
        carbs: "62g",
        protein: "4g",
        sugar: "35g"
        },
        allergens: ["Gluten", "Dairy"],
        servingSize: "1 slice (140g)",
        preparationTime: "1.5 hours",
        difficulty: "Medium"
    },
    {
        id: 6,
        name: "Chocolate Brownie",
        price: 7.99,
        image: "/images/SliderGallery/bread6.png",
        description: "Treat yourself to our Ultimate Chocolate Brownie, a fudgy, decadent square of pure chocolate heaven.",
        ingredients: [
        "Dark chocolate",
        "Semi-sweet chocolate",
        "Unsalted butter",
        "Fresh eggs",
        "Brown sugar",
        "All-purpose flour",
        "California walnuts",
        "Salted caramel sauce",
        "Sea salt flakes",
        "Vanilla extract"
        ],
        nutritionalInfo: {
        calories: "480 kcal",
        fat: "26g",
        carbs: "58g",
        protein: "7g",
        sugar: "42g"
        },
        allergens: ["Dairy", "Eggs", "Gluten", "Nuts"],
        servingSize: "1 brownie (110g)",
        preparationTime: "45 minutes",
        difficulty: "Easy"
    },
    {
        id: 7,
        name: "Crème Brûlée",
        price: 13.49,
        image: "/images/SliderGallery/bread7.png",
        description: "Delight in the elegance of our Crème Brûlée, featuring a creamy custard base topped with a perfectly caramelized sugar crust.",
        ingredients: [
        "Heavy cream",
        "Egg yolks",
        "Granulated sugar",
        "Pure vanilla bean",
        "Salt",
        "Brown sugar (for topping)"
        ],
        nutritionalInfo: {
        calories: "300 kcal",
        fat: "20g",
        carbs: "28g",
        protein: "5g",
        sugar: "24g"
        },
        allergens: ["Dairy", "Eggs"],
        servingSize: "1 ramekin (100g)",
        preparationTime: "1 hour (plus chill time)",
        difficulty: "Medium"
    },
    {
        id: 8,
        name: "Panna Cotta",
        price: 9.49,
        image: "/images/SliderGallery/bread8.png",
        description: "Smooth and silky Italian Panna Cotta, lightly sweetened and paired with a fresh berry coulis.",
        ingredients: [
        "Heavy cream",
        "Whole milk",
        "Gelatin sheets",
        "Granulated sugar",
        "Vanilla extract",
        "Mixed berries",
        "Lemon zest"
        ],
        nutritionalInfo: {
        calories: "280 kcal",
        fat: "18g",
        carbs: "24g",
        protein: "4g",
        sugar: "20g"
        },
        allergens: ["Dairy", "Gelatin"],
        servingSize: "1 cup (90g)",
        preparationTime: "4 hours (chill time included)",
        difficulty: "Easy"
    },
    {
        id: 9,
        name: "Red Velvet Cupcake",
        price: 5.99,
        image: "/images/SliderGallery/bread4.png",
        description: "A soft and moist Red Velvet Cupcake topped with luscious cream cheese frosting.",
        ingredients: [
        "All-purpose flour",
        "Cocoa powder",
        "Buttermilk",
        "Granulated sugar",
        "Unsalted butter",
        "Eggs",
        "Red food coloring",
        "Cream cheese",
        "Powdered sugar",
        "Vanilla extract"
        ],
        nutritionalInfo: {
        calories: "350 kcal",
        fat: "18g",
        carbs: "44g",
        protein: "5g",
        sugar: "32g"
        },
        allergens: ["Dairy", "Eggs", "Gluten"],
        servingSize: "1 cupcake (100g)",
        preparationTime: "40 minutes",
        difficulty: "Easy"
    },
    {
        id: 10,
        name: "Mango Sticky Rice",
        price: 8.49,
        image: "/images/SliderGallery/bread1.png",
        description: "A Thai classic featuring sweet sticky rice, fresh ripe mango, and coconut cream drizzle.",
        ingredients: [
        "Glutinous rice",
        "Fresh mango slices",
        "Coconut milk",
        "Palm sugar",
        "Salt",
        "Toasted sesame seeds"
        ],
        nutritionalInfo: {
        calories: "360 kcal",
        fat: "10g",
        carbs: "65g",
        protein: "6g",
        sugar: "25g"
        },
        allergens: ["Coconut"],
        servingSize: "1 plate (150g)",
        preparationTime: "1 hour",
        difficulty: "Easy"
    }
    ];