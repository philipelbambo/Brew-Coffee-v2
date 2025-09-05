    import React from 'react';
    import { FaUtensils, FaEnvelope, FaInfoCircle, FaImage } from 'react-icons/fa';
    import { motion } from "framer-motion";

    const Header = () => {
    // TypeScript: add type for id
    const scrollToSection = (id: string) => {
        const section = document.getElementById(id);
        if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
        } else {
        console.warn(`Section with id "${id}" not found`);
        }
    };

    return (
        <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 left-0 w-full z-50 py-4 px-6 bg-[#f8f8f8] backdrop-blur-sm"
        >
        <div className="container mx-auto flex items-center justify-between">
            <nav className="flex items-center space-x-8">
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection('menu')}
                className="flex items-center text-lg font-semibold text-black hover:text-[#4B352A]"
            >
                <FaUtensils className="mr-2" />
                Menu
            </motion.button>

            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection('gallery')}
                className="flex items-center text-lg font-semibold text-black hover:text-[#4B352A]"
            >
                <FaImage className="mr-2" />
                Gallery
            </motion.button>

            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection('about')}
                className="flex items-center text-lg font-semibold text-black hover:text-[#4B352A]"
            >
                <FaInfoCircle className="mr-2" />
                About Us
            </motion.button>

            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection('contact')}
                className="flex items-center text-lg font-semibold text-black hover:text-[#4B352A]"
            >
                <FaEnvelope className="mr-2" />
                Contact
            </motion.button>
            </nav>
        </div>
        </motion.header>
    );
    };

    export default Header;