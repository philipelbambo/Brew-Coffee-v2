    import React, { useState } from 'react';
    import Header from '../Homepage/Header';
    import Footer from '../Homepage/Footer';
    import HeroSection from '../Homepage/HeroSection';
    import CoffeeMenuSection from '../Homepage/CoffeeMenuSection';
    import AboutAndDessertsSection from '../Homepage/AboutAndDessertsSection';
    import GallerySection from '../Homepage/GallerySection';

    const BrewCoffeeHomepage: React.FC = () => {
    const [menuOpen, setMenuOpen] = useState<boolean>(false);

    const handleShopNowClick = () => {
        window.location.href = "/BrewCoffeeOrderSystem";
    };

    const handleDessertOrderClick = () => {
        window.location.href = "/DessertOrderingSystem";
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
            
            @keyframes carousel3D {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
            }
            
            @keyframes slowRotate {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
            }
            
            .slide-left {
            animation: slide-left 20s linear infinite;
            }
            
            .slide-right {
            animation: slide-right 20s linear infinite;
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

            .main-background {
            background-image: url('/images/Gallery3/coffeebeans-v2.jpg');
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            min-height: calc(100vh - 80px);
            }

            html {
            scroll-behavior: smooth;
            }

            @media (max-width: 768px) {
            .text-6xl { font-size: clamp(2rem, 8vw, 3.75rem); }
            .text-4xl { font-size: clamp(1.5rem, 6vw, 2.25rem); }
            .text-2xl { font-size: clamp(1.125rem, 5vw, 1.5rem); }
            .text-xl { font-size: clamp(1rem, 4vw, 1.25rem); }
            .text-lg { font-size: clamp(0.95rem, 4vw, 1.125rem); }

            #home .grid { grid-template-columns: 1fr !important; text-align: center !important; }
            #home img { margin: 0 auto !important; }
            .carousel-3d { animation-duration: 8s !important; }

            .grid.md\\\\:grid-cols-4 { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; gap: 1rem !important; }
            .px-6, .px-20 { padding-left: 1rem !important; padding-right: 1rem !important; }
            .py-16 { padding-top: 2rem !important; padding-bottom: 2rem !important; }

            #about .grid { grid-template-columns: 1fr !important; }
            #about img { margin: 0 auto 2rem; max-width: 80% !important; height: auto !important; }

            .grid.md\\\\:grid-cols-2 { grid-template-columns: 1fr !important; }
            .flex-col.items-center { margin-top: 2rem; }

            .w-80 { width: 100% !important; max-width: 280px; }
            .h-64, .h-48 { height: auto !important; }
            .space-x-6, .space-y-6 { gap: 1rem !important; }

            .px-6.py-3 { padding: 0.75rem 1.5rem !important; font-size: 1rem !important; }
            .hover\\\\:scale-105:hover { --tw-scale-x: 1.03; --tw-scale-y: 1.03; }
            }

            @media (max-width: 768px) and (hover: hover) {
            .hover\\\\:scale-105 {
                transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) !important;
            }
            }
        `}</style>

        <Header />

        <HeroSection onShopNowClick={handleShopNowClick} />
        
        <div className="text-[#4B352A] bg-white">
            <CoffeeMenuSection />
            <AboutAndDessertsSection onDessertOrderClick={handleDessertOrderClick} />
            <GallerySection />
        </div>

        <Footer />
        </div>
    );
    };

    export default BrewCoffeeHomepage;
