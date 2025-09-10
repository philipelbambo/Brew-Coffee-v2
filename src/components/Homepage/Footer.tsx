    import React from 'react';
    import { FaClock, FaBullhorn, FaInfoCircle, FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
    import { motion } from "framer-motion";

    const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
        opacity: 1, 
        y: 0, 
        transition: { duration: 0.8, ease: "easeOut" } 
    },
    };

    const Footer = () => {
    return (
        <motion.footer 
        id="contact" 
        className="py-6 sm:py-8 md:py-12 relative z-10 bg-[#e0e0e0] text-black"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInUp}
        >
        <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            
            {/* Opening Hours */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-4 md:space-x-40 text-center sm:text-left">
                <img
                src="./images/Gallery2/coffee.png"
                alt="Coffee Shop Logo"
                className="w-20 h-20 sm:w-20 sm:h-20 flex-shrink-0"
                />
                <div className="w-full">
                <h4 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 flex items-center justify-center sm:justify-start space-x-2 text-black">
                    <FaClock className="text-sm sm:text-base" />
                    <span>Opening Hours</span>
                </h4>
                <ul className="space-y-2 text-sm sm:text-base text-black">
                    <li>
                    <p className="font-semibold">Monday - Friday:</p>
                    <p>7:00 AM - 9:00 PM</p>
                    </li>
                    <li>
                    <p className="font-semibold">Saturday:</p>
                    <p>8:00 AM - 10:00 PM</p>
                    </li>
                    <li>
                    <p className="font-semibold">Sunday:</p>
                    <p>8:00 AM - 6:00 PM</p>
                    </li>
                </ul>
                </div>
            </div>

            {/* Contact Info */}
            <div className="flex flex-col items-center text-center order-3 sm:order-2">
                <h4 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 flex items-center space-x-2 text-black">
                <FaInfoCircle className="text-sm sm:text-base" />
                <span>Contact Information</span>
                </h4>
                <div className="text-sm sm:text-base">
                <p className="mb-2 text-black">456 Maple Avenue</p>
                <p className="mb-2 text-black">Vancouver, BC V5K 0A1</p>
                <p className="mb-2 text-black">Phone: (604) 987-6543</p>
                <p className="text-black break-all sm:break-normal">Email: info@brewmaster.com</p>
                </div>
            </div>

            {/* Social Media */}
            <div className="flex flex-col items-center sm:items-start text-center sm:text-left sm:ml-0 md:ml-20 order-2 sm:order-3">
                <h4 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 flex items-center space-x-2 text-black">
                <FaBullhorn className="text-sm sm:text-base" />
                <span>Follow Us</span>
                </h4>
                <div className="flex justify-center sm:justify-start space-x-6 sm:space-x-4 text-black">
                <motion.a 
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.95 }}
                    href="https://facebook.com " 
                    aria-label="Facebook"
                    className="p-2 hover:bg-white/10 rounded-full transition-colors duration-200"
                >
                    <FaFacebook size={20} className="sm:w-6 sm:h-6" />
                </motion.a>
                <motion.a 
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.95 }}
                    href="https://twitter.com " 
                    aria-label="Twitter"
                    className="p-2 hover:bg-white/10 rounded-full transition-colors duration-200"
                >
                    <FaTwitter size={20} className="sm:w-6 sm:h-6" />
                </motion.a>
                <motion.a 
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.95 }}
                    href="https://instagram.com " 
                    aria-label="Instagram"
                    className="p-2 hover:bg-white/10 rounded-full transition-colors duration-200"
                >
                    <FaInstagram size={20} className="sm:w-6 sm:h-6" />
                </motion.a>
                </div>
            </div>
            </div>

            {/* Footer Bottom */}
            <div className="border-t mt-4 sm:mt-5 pt-4 sm:pt-5 text-center border-white text-black">
            <p className="text-xs sm:text-sm md:text-base">&copy; 2025 Brew-Coffee Shop. Build by: PhilipElbambo.</p>
            </div>
        </div>
        </motion.footer>
    )
    }

    export default Footer;