    import React from 'react';
    import { motion } from "framer-motion";

    interface CoffeeProduct {
    id: number;
    name: string;
    image: string;
    description: string;
    }

    const coffeeProducts: CoffeeProduct[] = [
    { id: 1, name: 'Espresso', image: './images/OurCoffee/coffee1.png', description: 'A strong, concentrated coffee shot made by forcing hot water through finely-ground beans.' },
    { id: 2, name: 'Cappuccino', image: './images/OurCoffee/coffee2.png', description: 'Espresso topped with equal parts steamed milk and milk foam, rich and balanced.' },
    { id: 3, name: 'Latte', image: './images/OurCoffee/coffee3.png', description: 'Espresso with lots of steamed milk and a thin layer of foam, smooth and creamy.' },
    { id: 4, name: 'Americano', image: './images/OurCoffee/coffee4.png', description: 'Espresso diluted with hot water, giving it a lighter taste similar to drip coffee.' },
    { id: 5, name: 'Mocha', image: './images/OurCoffee/coffee5.png', description: 'A sweet mix of espresso, steamed milk, and chocolate, often topped with whipped cream.' },
    { id: 6, name: 'Macchiato', image: './images/OurCoffee/coffee6.png', description: 'Espresso "stained" with a small amount of milk or milk foam for a bold flavor.' },
    { id: 7, name: 'Flat White', image: './images/OurCoffee/coffee7.png', description: 'Espresso with velvety microfoam milk, smoother than cappuccino but stronger than latte.' },
    { id: 8, name: 'Irish Coffee', image: './images/OurCoffee/coffee8.png', description: 'A warming blend of hot coffee, Irish whiskey, sugar, topped with cream.' },
    { id: 9, name: 'Iced Coffee', image: './images/OurCoffee/coffee9.png', description: 'Brewed coffee served over ice, refreshing and versatile with milk or sweeteners.' },
    { id: 10, name: 'Affogato', image: './images/OurCoffee/coffee10.png', description: 'A scoop of vanilla ice cream "drowned" in a shot of hot espresso.' },
    { id: 11, name: 'Cold Brew', image: './images/OurCoffee/coffee11.png', description: 'Coffee brewed slowly with cold water for a smooth, less acidic taste.' },
    { id: 12, name: 'Turkish Coffee', image: './images/OurCoffee/coffee12.png', description: 'Finely ground coffee simmered in a cezve, served unfiltered with bold flavors.' }
    ];

    const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { 
        opacity: 1, 
        y: 0,
        transition: { duration: 0.8, ease: "easeOut" }
    }
    };

    const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
        }
    }
    };

    const staggerItem = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
        opacity: 1, 
        y: 0,
        transition: { duration: 0.6, ease: "easeOut" }
    }
    };

    const CoffeeMenuSection: React.FC = () => {
    return (
        <motion.section 
        id="menu" 
        className="w-full px-6 py-16 relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        >
        <motion.h3 
            variants={fadeInUp}
            className="text-4xl font-bold text-center mb-6 text-[#4B352A]"
        >
            Our Coffee
        </motion.h3>

        <motion.p
            variants={fadeInUp}
            className="text-lg md:text-xl font-semibold tracking-wide text-center mb-12 w-full font-serif text-[#4B352A]"
        >
            At BrewMaster, every cup is crafted to bring warmth and comfort. 
            We roast our beans with care, brew with precision, and serve 
            with passion—so you can enjoy rich flavors, smooth textures, 
            and the perfect aroma in every sip.
        </motion.p>
        
        <motion.div 
            variants={staggerContainer}
            className="grid md:grid-cols-4 gap-8"
        >
            {coffeeProducts.map((coffee) => (
            <motion.div
                key={coffee.id}
                variants={staggerItem}
                whileHover={{ scale: 1.05, y: -10 }}
                className="text-center rounded-lg border border-white hover:bg-[#4B352A] hover:text-white text-[#4B352A] bg-white p-6 transition-colors group shadow-lg"
            >
                <img
                src={coffee.image}
                alt={coffee.name}
                className="w-full h-48 object-contain mb-4"
                />
                <h4 className="text-xl font-semibold mb-2">{coffee.name}</h4>
                <p className="text-sm leading-relaxed" style={{ color: '#000000' }}>
                {coffee.description}
                </p>
            </motion.div>
            ))}
        </motion.div>
        </motion.section>
    );
    };

    export default CoffeeMenuSection;