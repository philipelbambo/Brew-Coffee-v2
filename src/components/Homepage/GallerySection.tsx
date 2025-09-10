    import React from 'react';
    import { motion } from "framer-motion";

    const galleryRows: string[][] = [
    ["./images/SliderGallery/cup7.png", "./images/SliderGallery/cup8.png", "./images/SliderGallery/cup9.png", "./images/SliderGallery/cup10.png", "./images/SliderGallery/cup11.png", "./images/SliderGallery/cup12.png"],
    ["./images/SliderGallery/cup13.png", "./images/SliderGallery/cup14.png", "./images/SliderGallery/cup15.png", "./images/SliderGallery/cup16.png", "./images/SliderGallery/cup17.png", "./images/SliderGallery/cup18.png"],
    ["./images/SliderGallery/bread1.png", "./images/SliderGallery/bread2.png", "./images/SliderGallery/bread3.png", "./images/SliderGallery/bread4.png", "./images/SliderGallery/bread5.png", "./images/SliderGallery/bread6.png"],
    ];

    const galleryNames: string[][] = [
    ["Espresso", "Cappuccino", "Latte", "Americano", "Mocha", "Macchiato"],
    ["Flat White", "Irish Coffee", "Affogato", "Ristretto", "Cortado", "Vienna Coffee"],
    ["Croissant", "Cinnamon Roll", "Blueberry Muffin", "Chocolate Donut", "Cheesecake", "Brownie"],
    ];

    const GallerySection: React.FC = () => {
    return (
        <motion.section 
        id="gallery" 
        className="py-16 overflow-hidden relative z-10"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        >
        <div className="container mx-auto px-4 mb-12">
            <h3 className="text-4xl font-bold text-center text-[#4B352A]">Our Gallery</h3>
        </div>
        <div className="space-y-6">
            {galleryRows.map((row, rowIndex) => (
            <div key={rowIndex} className="relative w-full overflow-hidden">
                <div className={`flex space-x-6 ${rowIndex % 2 === 0 ? 'slide-left' : 'slide-right'}`}>
                {[...row, ...row, ...row].map((imageUrl, imageIndex) => (
                    <div key={imageIndex} className="flex-shrink-0">
                    <div className="w-80 h-64 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow p-2 flex flex-col items-center bg-white">
                        <img
                        src={imageUrl}
                        alt={`Gallery ${rowIndex + 1}-${imageIndex + 1}`}
                        className="w-full h-48 object-contain hover:scale-105 transition-transform duration-300"
                        />
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
    );
    };

    export default GallerySection;