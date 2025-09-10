    import React from 'react';
    import { motion } from "framer-motion";

    interface HeroSectionProps {
    onShopNowClick: () => void;
    }

    const HeroSection: React.FC<HeroSectionProps> = ({ onShopNowClick }) => {
    return (
        <div className="main-background relative">
        <section id="home" className="w-full px-6 py-16 pt-32 relative z-10">
            <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div 
                initial={{ opacity: 0, x: -60 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
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
                className="text-6xl font-bold leading-tight -mt-2 text-[#84994F]"
                >
                Take A Break<br />
                Have The Best Coffee
                </motion.h2>

                <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="mt-4 text-lg italic text-black"
                >
                "<span className='font-medium'>Every</span> <span className='font-medium'>cup</span> <span className='font-medium'>of</span> <span className='font-medium'>coffee</span> <span className='font-medium'>is</span> <span className='font-medium'>more</span> <span className='font-medium'>than</span> <span className='font-medium'>a</span> <span className='font-medium'>drink</span> — <span className='font-medium'>it's</span> <span className='font-medium'>a</span> <span className='font-medium'>moment</span> <span className='font-medium'>to</span> <span className='font-medium'>pause</span> <span className='font-medium'>and</span> <span className='font-medium'>enjoy.</span>  
                <span className='font-medium'>At</span> <span className='font-medium'>Brew-Coffee,</span> <span className='font-medium'>we</span> <span className='font-medium'>craft</span> <span className='font-medium'>each</span> <span className='font-medium'>blend</span> <span className='font-medium'>with</span> <span className='font-medium'>care</span> <span className='font-medium'>and</span> <span className='font-medium'>passion.</span>  
                <span className='font-medium'>Because</span> <span className='font-medium'>the</span> <span className='font-medium'>best</span> <span className='font-medium'>breaks</span> <span className='font-medium'>deserve</span> <span className='font-medium'>the</span> <span className='font-medium'>best</span> <span className='font-medium'>brew.</span>"
                </motion.p>

                <motion.a 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onShopNowClick}
                className="inline-block cursor-pointer"
                >
                <button className="rounded-lg px-6 py-3 text-xl font-extrabold tracking-wide uppercase shadow-md transition-all mt-6 bg-[#84994F] text-black hover:bg-[#84994F] hover:text-white">
                    Shop Now
                </button>
                </motion.a>
            </motion.div>
            <motion.div 
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
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
    );
    };

    export default HeroSection;