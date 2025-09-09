    import React, { useState, useEffect } from 'react';
    import { Menu, X } from "lucide-react";
    import { motion, useInView } from "framer-motion";
    import Footer from './Footer';
    import Header from './Header';
    // Type definitions
    interface CoffeeProduct {
    id: number;
    name: string;
    image: string;
    description: string;
    }

    interface MenuItemProps {
    href: string;
    icon: React.ComponentType<{ className?: string }>;
    children: React.ReactNode;
    onClick: () => void;
    }

    // Animation variants
    const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { 
        opacity: 1, 
        y: 0,
        transition: { duration: 0.8, ease: "easeOut" }
    }
    };

    const fadeInLeft = {
    hidden: { opacity: 0, x: -60 },
    visible: { 
        opacity: 1, 
        x: 0,
        transition: { duration: 0.8, ease: "easeOut" }
    }
    };

    const fadeInRight = {
    hidden: { opacity: 0, x: 60 },
    visible: { 
        opacity: 1, 
        x: 0,
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

    const Homepage: React.FC = () => {
    const [menuOpen, setMenuOpen] = useState<boolean>(false);

    const coffeeProducts: CoffeeProduct[] = [
        { 
        id: 1, 
        name: 'Espresso', 
        image: './images/OurCoffee/coffee1.png',
        description: 'A strong, concentrated coffee shot made by forcing hot water through finely-ground beans.'
        },
        { 
        id: 2, 
        name: 'Cappuccino', 
        image: './images/OurCoffee/coffee2.png',
        description: 'Espresso topped with equal parts steamed milk and milk foam, rich and balanced.'
        },
        { 
        id: 3, 
        name: 'Latte', 
        image: './images/OurCoffee/coffee3.png',
        description: 'Espresso with lots of steamed milk and a thin layer of foam, smooth and creamy.'
        },
        { 
        id: 4, 
        name: 'Americano', 
        image: './images/OurCoffee/coffee4.png',
        description: 'Espresso diluted with hot water, giving it a lighter taste similar to drip coffee.'
        },
        { 
        id: 5, 
        name: 'Mocha', 
        image: './images/OurCoffee/coffee5.png',
        description: 'A sweet mix of espresso, steamed milk, and chocolate, often topped with whipped cream.'
        },
        { 
        id: 6, 
        name: 'Macchiato', 
        image: './images/OurCoffee/coffee6.png',
        description: 'Espresso "stained" with a small amount of milk or milk foam for a bold flavor.'
        },
        { 
        id: 7, 
        name: 'Flat White', 
        image: './images/OurCoffee/coffee7.png',
        description: 'Espresso with velvety microfoam milk, smoother than cappuccino but stronger than latte.'
        },
        { 
        id: 8, 
        name: 'Irish Coffee', 
        image: './images/OurCoffee/coffee8.png',
        description: 'A warming blend of hot coffee, Irish whiskey, sugar, topped with cream.'
        },
        { 
        id: 9, 
        name: 'Iced Coffee', 
        image: './images/OurCoffee/coffee9.png',
        description: 'Brewed coffee served over ice, refreshing and versatile with milk or sweeteners.'
        },
        { 
        id: 10, 
        name: 'Affogato', 
        image: './images/OurCoffee/coffee10.png',
        description: 'A scoop of vanilla ice cream "drowned" in a shot of hot espresso.'
        },
        { 
        id: 11, 
        name: 'Cold Brew', 
        image: './images/OurCoffee/coffee11.png',
        description: 'Coffee brewed slowly with cold water for a smooth, less acidic taste.'
        },
        { 
        id: 12, 
        name: 'Turkish Coffee', 
        image: './images/OurCoffee/coffee12.png',
        description: 'Finely ground coffee simmered in a cezve, served unfiltered with bold flavors.'
        }
    ];

    // Gallery images organized in 3 rows
    const galleryRows: string[][] = [
        // Row 1 - moves right to left
        [
        "./images/SliderGallery/cup7.png",
        "./images/SliderGallery/cup8.png",
        "./images/SliderGallery/cup9.png",
        "./images/SliderGallery/cup10.png",
        "./images/SliderGallery/cup11.png",
        "./images/SliderGallery/cup12.png"
        ],
        // Row 2 - moves left to right
        [
        "./images/SliderGallery/cup13.png",
        "./images/SliderGallery/cup14.png",
        "./images/SliderGallery/cup15.png",
        "./images/SliderGallery/cup16.png",
        "./images/SliderGallery/cup17.png",
        "./images/SliderGallery/cup18.png"
        ],
        // Row 3 - moves right to left
        [
        "./images/SliderGallery/bread1.png",
        "./images/SliderGallery/bread2.png",
        "./images/SliderGallery/bread3.png",
        "./images/SliderGallery/bread4.png",
        "./images/SliderGallery/bread5.png",
        "./images/SliderGallery/bread6.png"
        ],
    ];

    // Coffee & Dessert names (match the images in galleryRows)
    const galleryNames: string[][] = [
        // Row 1 names
        ["Espresso", "Cappuccino", "Latte", "Americano", "Mocha", "Macchiato"],
        // Row 2 names
        ["Flat White", "Irish Coffee", "Affogato", "Ristretto", "Cortado", "Vienna Coffee"],
        // Row 3 names (Desserts)
        ["Croissant", "Cinnamon Roll", "Blueberry Muffin", "Chocolate Donut", "Cheesecake", "Brownie"],
    ];

    // MenuItem component
    const MenuItem: React.FC<MenuItemProps> = ({ href, icon: Icon, children, onClick }) => (
        <li>
        <a
            href={href}
            className="flex items-center text-lg transition-colors py-2 text-[#4C4B16] hover:text-[#5a5221]"
            onClick={onClick}
        >
            <Icon className="mr-2 text-2xl" /> {children}
        </a>
        </li>
    );

    // Smooth scroll function with offset for fixed header
    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
        const headerOffset = 80;
        const elementPosition = element.offsetTop;
        const offsetPosition = elementPosition - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
        }
    };

    return (
        <div className="min-h-screen relative overflow-hidden">
        <style>{`
            @keyframes slide-left {
            0% { transform: translateX(0); }
            100% { transform: translateX(-100%); }
            }
            
            @keyframes slide-right {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(0); }
            }
            
            @keyframes steadyWheel {
            from {
                transform: rotate(0deg);
            }
            to {
                transform: rotate(360deg);
            }
            }
            
            @keyframes slowRotate {
            from {
                transform: rotate(0deg);
            }
            to {
                transform: rotate(360deg);
            }
            }
            
            .slide-left {
            animation: slide-left 20s linear infinite;
            }
            
            .slide-right {
            animation: slide-right 20s linear infinite;
            }
            
            @keyframes carousel3D {
            0% {
                transform: rotate(0deg);
            }
            100% {
                transform: rotate(360deg);
            }
            }
            
            .carousel-3d {
            animation: carousel3D 4s linear infinite;
            transform-origin: center center;
            filter: drop-shadow(0 15px 30px rgba(0, 0, 0, 0.4));
            will-change: transform;
            }

            .slow-spin {
            animation: slowRotate 6s linear infinite;
            }

            /* Background image styles */
            .main-background {
            background-image: url('/images/Gallery3/coffeebeans-v2.jpg');
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            min-height: calc(100vh - 80px);
            }

            /* Smooth scrolling for the entire page */
            html {
            scroll-behavior: smooth;
            }

            /* ============= MOBILE RESPONSIVENESS + UNIQUE TOUCHES ============= */

            @media (max-width: 768px) {
                /* Fluid typography */
                .text-6xl { font-size: clamp(2rem, 8vw, 3.75rem); }
                .text-4xl { font-size: clamp(1.5rem, 6vw, 2.25rem); }
                .text-2xl { font-size: clamp(1.125rem, 5vw, 1.5rem); }
                .text-xl { font-size: clamp(1rem, 4vw, 1.25rem); }
                .text-lg { font-size: clamp(0.95rem, 4vw, 1.125rem); }

                /* Stack hero content */
                #home .grid { grid-template-columns: 1fr !important; text-align: center !important; }
                #home .justify-center { justify-content: center !important; }
                #home img { margin: 0 auto !important; }

                /* Slow down carousel on mobile for drama */
                .carousel-3d { animation-duration: 8s !important; }

                /* Coffee grid: 2 per row on mobile */
                .grid.md\\\\:grid-cols-4 { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; gap: 1rem !important; }
                .grid.md\\\\:grid-cols-2 { grid-template-columns: 1fr !important; }

                /* Reduce padding */
                .px-6 { padding-left: 1rem !important; padding-right: 1rem !important; }
                .px-20 { padding-left: 1rem !important; padding-right: 1rem !important; }
                .py-16 { padding-top: 2rem !important; padding-bottom: 2rem !important; }

                /* About section: stack image and text */
                #about .grid { grid-template-columns: 1fr !important; }
                #about img { margin: 0 auto 2rem; max-width: 80% !important; height: auto !important; }

                /* Dessert section: stack content */
                .grid.md\\\\:grid-cols-2 { grid-template-columns: 1fr !important; }
                .flex-col.items-center { margin-top: 2rem; }

                /* Gallery: single column, reduce image size */
                .w-80 { width: 100% !important; max-width: 280px; }
                .h-64 { height: auto !important; }
                .h-48 { height: 200px !important; }
                .space-x-6 { gap: 1rem !important; }
                .space-y-6 { gap: 1.5rem !important; }

                /* Menu button spacing */
                .py-2 { padding-top: 0.5rem !important; padding-bottom: 0.5rem !important; }

                /* Button padding */
                .px-6.py-3 { padding: 0.75rem 1.5rem !important; font-size: 1rem !important; }

                /* Subtle mobile hover scale */
                .hover\\\\:scale-105:hover { --tw-scale-x: 1.03; --tw-scale-y: 1.03; }
            }

            /* Ultra-rare micro-delight: gentle floating effect on gallery items on mobile hover/touch */
            @media (max-width: 768px) and (hover: hover) {
                .hover\\\\:scale-105 {
                    transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) !important;
                }
            }
        `}</style>

    <Header/>

        {/* Hero Section with background */}
        <div className="main-background relative">
            <section id="home" className="w-full px-6 py-16 pt-32 relative z-10">
            <div className="grid md:grid-cols-2 gap-12 items-center">
                <motion.div 
                initial="hidden"
                animate="visible"
                variants={fadeInLeft}
                className="text-center md:text-left"
                >
                <motion.img
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    src="./images/Gallery3/animecafe.png"
                    alt="Coffee Logo"
                    className="mx-auto md:mx-0 mb-0 w-60 h-60 object-contain"
                />
                <motion.h2 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-6xl font-bold leading-tight -mt-2 text-black"
                >
                    Take A Break<br />
                    Have The Best Coffee
                </motion.h2>

                {/* Coffee Quote */}
                <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="mt-4 text-lg italic text-black"
                >
                    "Every cup of coffee is more than a drink — it's a moment to pause and enjoy.  
                    At Brew-Coffee, we craft each blend with care and passion.  
                    Because the best breaks deserve the best brew."
                </motion.p>

                <motion.a 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href="/BrewCoffeeOrderSystem" 
                    className="inline-block"
                >
                    <button className="rounded-lg px-6 py-3 text-xl font-extrabold tracking-wide uppercase shadow-md transition-all mt-6 bg-white text-black hover:bg-[#4B352A] hover:text-white">
                    Shop Now
                    </button>
                </motion.a>
                </motion.div>
                <motion.div 
                initial="hidden"
                animate="visible"
                variants={fadeInRight}
                className="flex justify-center relative"
                >
                <div className="relative w-[600px] h-[600px] flex items-center justify-center">
                    <div className="carousel-3d">
                    <img
                        src="/images/Gallery3/cup.png"
                        alt="Coffee Cup"
                        className="w-[460px] h-[460px] object-contain"
                    />
                    </div>
                </div>
                </motion.div>
            </div>
            </section>
        </div>

        {/* Rest of content with original background */}
        <div className="text-[#4B352A] bg-white">
            {/* Coffee Menu */}
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

            {/* Full-width description with fade-in + stylish font */}
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
                {coffeeProducts.map((coffee: CoffeeProduct) => (
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

            {/* About Us */}
            <motion.section 
            id="about" 
            className="w-full px-20 py-16 relative z-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            >
            <div className="grid md:grid-cols-2 gap-4 items-center">
                {/* Image Section */}
                <motion.div 
                variants={fadeInLeft}
                className="flex justify-center md:justify-start"
                >
                <img
                    src="./images/Gallery3/CoffeeP.png"
                    alt="Coffee Shop Interior"
                    className="w-[500px] h-[500px] object-contain"
                />
                </motion.div>

                {/* Text Section */}
                <motion.div variants={fadeInRight}>
                <h3 className="text-4xl font-bold mb-6 text-[#4B352A]">
                    About Us
                </h3>
                <p className="text-lg mb-4 text-[#4B352A]">
                    Welcome to BrewMaster — where the coffee is slow, the vibes are
                    warm, and every cup is made with heart. Since 2010, we've been your
                    neighborhood corner for a quiet moment, a good chat, and a really,
                    really good brew.
                </p>
                <p className="text-lg mb-4 text-[#4B352A]">
                    This is what we stand by:
                </p>
                <ul className="text-lg space-y-2 text-[#4B352A]">
                    <li>• Beans we know by name — sourced straight from farmers we trust.</li>
                    <li>• Baristas who treat espresso like an art, not a rush job.</li>
                    <li>• A space that feels like your favorite sweater — soft, familiar, and cozy.</li>
                    <li>• Coffee roasted fresh every morning, never yesterday's batch.</li>
                    <li>• A commitment to people and planet, from seed to sip.</li>
                </ul>
                </motion.div>
            </div>
            </motion.section>
                
            {/* Desserts */}
            <motion.section 
            className="w-full px-6 py-16 relative z-10 bg-white"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            >
            <motion.h3 
                variants={fadeInUp}
                className="text-4xl font-bold text-center mb-8 text-[#4B352A]"
            >
                Sweet Treats
            </motion.h3>

            <div className="grid md:grid-cols-2 gap-12 items-center">
                {/* Left Side: Quotes/Description */}
                <motion.div 
                variants={fadeInLeft}
                className="space-y-6 text-lg leading-relaxed"
                >
                <p className="text-[#4B352A]">
                    "Life is short, eat dessert first," and when you taste ours, you'll
                    never forget the name — <span className="font-semibold">Philip Elbambo</span>.
                </p>
                <p className="text-[#4B352A]">
                    Each dessert is crafted to melt in your mouth, turning every bite into
                    "a sweet memory you'll always crave."
                </p>
                <p className="text-[#4B352A]">
                    "Good food is all the sweeter when shared with good friends," so bring
                    someone along and let <span className="font-semibold">Philip Elbambo's</span> desserts speak for themselves.
                </p>
                <p className="text-[#4B352A]">
                    From rich chocolate to creamy cheesecakes, every slice whispers, "this
                    is the flavor of joy."
                </p>
                <p className="text-[#4B352A]">
                    Because "dessert is the fairy tale of the kitchen," and in every story
                    worth telling, the name <span className="font-semibold">Philip Elbambo</span> lingers like the perfect sweet ending.
                </p>
                </motion.div>

                {/* Right Side: Large PNG + Order CTA */}
                <motion.div 
                variants={fadeInRight}
                className="flex flex-col items-center text-center"
                >
                {/* Dessert Showcase Picture */}
                <img
                    src="./images/SliderGallery/bread1.png"
                    alt="Dessert Showcase"
                    className="w-110 h-110 object-contain mb-6 slow-spin"
                />

                {/* Order CTA */}
                <h4 className="text-2xl font-bold mb-4 text-[#4B352A]">
                    Order Your Favorite Dessert
                </h4>
                <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href="/DessertOrderingSystem"
                    className="px-6 py-3 rounded-lg font-semibold transition-colors bg-[#4B352A] text-white hover:bg-[#4B352A]"
                >
                    Order Now
                </motion.a>
                </motion.div>
            </div>
            </motion.section>
            
            {/* Our Gallery */}
            <motion.section 
            id="gallery" 
            className="py-16 overflow-hidden relative z-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            >
            <div className="container mx-auto px-4 mb-12">
                <h3 className="text-4xl font-bold text-center text-[#4B352A]">Our Gallery</h3>
            </div>
            <div className="space-y-6">
                {galleryRows.map((row: string[], rowIndex: number) => (
                <div key={rowIndex} className="relative w-full overflow-hidden">
                    <div className={`flex space-x-6 ${rowIndex % 2 === 0 ? 'slide-left' : 'slide-right'}`}>
                    {[...row, ...row, ...row].map((imageUrl: string, imageIndex: number) => (
                        <div key={imageIndex} className="flex-shrink-0">
                        <div className="w-80 h-64 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow p-2 flex flex-col items-center bg-white">
                            <img
                            src={imageUrl}
                            alt={`Gallery ${rowIndex + 1}-${imageIndex + 1}`}
                            className="w-full h-48 object-contain hover:scale-105 transition-transform duration-300"
                            />
                            {/* Name under the image */}
                            <p className="mt-2 text-xl font-semibold" style={{ color: "#4C4B16" }}>
                            {galleryNames[rowIndex][imageIndex % row.length]}
                            </p>
                        </div>
                        </div>
                    ))}
                    </div>
                </div>
                ))}
            </div>
            </motion.section>
        </div>
    <Footer/>
        </div>
    );
    };

    export default Homepage;