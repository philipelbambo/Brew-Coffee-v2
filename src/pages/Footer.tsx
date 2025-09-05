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
        className="py-12 relative z-10 bg-[#4B352A] text-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInUp}
        >
        <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8">
            
            {/* Opening Hours */}
            <div className="flex items-start space-x-40">
                <img
                src="./images/Gallery1/cup-of-coffee.png"
                alt="Coffee Shop Logo"
                className="w-20 h-20"
                />
                <div>
                <h4 className="text-xl font-bold mb-4 flex items-center space-x-2 text-white">
                    <FaClock />
                    <span>Opening Hours</span>
                </h4>
                <ul className="space-y-2 text-white">
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
            <div className="flex flex-col items-center text-center">
                <h4 className="text-xl font-bold mb-4 flex items-center space-x-2 text-white">
                <FaInfoCircle />
                <span>Contact Information</span>
                </h4>
                <p className="mb-2 text-white">456 Maple Avenue</p>
                <p className="mb-2 text-white">Vancouver, BC V5K 0A1</p>
                <p className="mb-2 text-white">Phone: (604) 987-6543</p>
                <p className="text-white">Email: info@brewmaster.com</p>
            </div>

            {/* Social Media */}
            <div className="ml-20">
                <h4 className="text-xl font-bold mb-4 flex items-center space-x-2 text-white">
                <FaBullhorn />
                <span>Follow Us</span>
                </h4>
                <div className="flex space-x-4 text-white">
                <motion.a 
                    whileHover={{ scale: 1.2 }}
                    href="https://facebook.com" 
                    aria-label="Facebook"
                >
                    <FaFacebook size={24} />
                </motion.a>
                <motion.a 
                    whileHover={{ scale: 1.2 }}
                    href="https://twitter.com" 
                    aria-label="Twitter"
                >
                    <FaTwitter size={24} />
                </motion.a>
                <motion.a 
                    whileHover={{ scale: 1.2 }}
                    href="https://instagram.com" 
                    aria-label="Instagram"
                >
                    <FaInstagram size={24} />
                </motion.a>
                </div>
            </div>
            </div>

            {/* Footer Bottom */}
            <div className="border-t mt-5 pt-5 text-center border-white text-white">
            <p>&copy; 2025 Brew-Coffee Shop. Build by: PhilipElbambo.</p>
            </div>
        </div>
        </motion.footer>
    )
    }

    export default Footer;
