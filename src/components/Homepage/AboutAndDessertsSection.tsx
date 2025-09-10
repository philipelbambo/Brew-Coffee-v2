    import React from 'react';
    import { motion } from "framer-motion";

    interface AboutAndDessertsSectionProps {
    onDessertOrderClick: () => void;
    }

    const AboutAndDessertsSection: React.FC<AboutAndDessertsSectionProps> = ({ onDessertOrderClick }) => {
    return (
        <>
        {/* About Us */}
        <motion.section 
            id="about" 
            className="w-full px-20 py-16 relative z-10"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
        >
            <div className="grid md:grid-cols-2 gap-4 items-center">
            <motion.div 
                initial={{ opacity: 0, x: -60 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="flex justify-center md:justify-start"
            >
                <img
                src="./images/Gallery3/CoffeeP.png"
                alt="Coffee Shop Interior"
                className="w-[500px] h-[500px] object-contain"
                />
            </motion.div>

            <motion.div
                initial={{ opacity: 0, x: 60 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
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
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
        >
            <motion.h3 
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-4xl font-bold text-center mb-8 text-[#4B352A]"
            >
            Sweet Treats
            </motion.h3>

            <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div 
                initial={{ opacity: 0, x: -60 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
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

            <motion.div 
                initial={{ opacity: 0, x: 60 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="flex flex-col items-center text-center"
            >
                <img
                src="./images/SliderGallery/bread1.png"
                alt="Dessert Showcase"
                className="w-90 h-90 object-contain mb-6 slow-spin"
                />

                <h4 className="text-2xl font-bold mb-4 text-[#4B352A]">
                Order Your Favorite Dessert
                </h4>
                <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onDessertOrderClick}
                className="px-6 py-3 rounded-lg font-semibold transition-colors bg-[#84994F] text-black hover:bg-[#4B352A] cursor-pointer"
                >
                Order Now
                </motion.a>
            </motion.div>
            </div>
        </motion.section>
        </>
    );
    };

    export default AboutAndDessertsSection;