    // components/CoffeeModal.tsx
    import React from 'react';
    import { Coffee, X } from 'lucide-react';
    import { CoffeeProduct } from './Types';
    import { formatPrice } from './FormatPrice';

    interface CoffeeModalProps {
    selectedCoffee: CoffeeProduct | null;
    onClose: () => void;
    }

    const CoffeeModal = ({ selectedCoffee, onClose }: { selectedCoffee: CoffeeProduct | null; onClose: () => void }) => {
    if (!selectedCoffee) return null;

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
            <div className="relative">
            <div className="h-64 flex items-center justify-center">
                {selectedCoffee.image ? (
                <img
                    src={selectedCoffee.image}
                    alt={selectedCoffee.name}
                    className="w-60 h-60 object-cover rounded-lg"
                />
                ) : (
                <div className="w-60 h-60 bg-gray-100 flex items-center justify-center border border-gray-300 rounded-lg">
                    <Coffee className="w-24 h-24 text-gray-500" />
                </div>
                )}
            </div>
            <button
                onClick={onClose}
                className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                aria-label="Close modal"
            >
                <X className="w-6 h-6" />
            </button>
            <div className="absolute top-4 left-4">
                <span className="bg-[#4B352A] text-white px-4 py-2 rounded-full font-semibold">
                {selectedCoffee.category}
                </span>
            </div>
            </div>

            <div className="p-6">
            <div className="flex justify-between items-start mb-6">
                <div>
                <h2 className="text-3xl font-bold mb-2">{selectedCoffee.name}</h2>
                <p className="text-lg text-gray-600">
                    {selectedCoffee.fullDescription.substring(0, 80)}...
                </p>
                </div>
                <div className="text-right">
                <span className="text-3xl font-bold text-[#4B352A]">
                    {formatPrice(selectedCoffee.price)}
                </span>
                <p className="text-sm text-gray-500">{selectedCoffee.size}</p>
                </div>
            </div>

            <div className="mb-6">
                <h3 className="text-xl font-semibold mb-3">Description</h3>
                <p className="text-gray-700 leading-relaxed">{selectedCoffee.fullDescription}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                <h4 className="font-semibold mb-3 flex items-center">
                    <Coffee className="w-5 h-5 mr-2 text-[#4B352A]" />
                    Ingredients
                </h4>
                <ul className="space-y-1">
                    {selectedCoffee.ingredients.map((ingredient, index) => (
                    <li key={index} className="text-gray-600 text-sm">
                        • {ingredient}
                    </li>
                    ))}
                </ul>
                </div>

                <div>
                <h4 className="font-semibold mb-3">Coffee Info</h4>
                <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                    <span className="text-gray-600">Caffeine Level:</span>
                    <span className="font-medium">{selectedCoffee.caffeine}</span>
                    </div>
                    <div className="flex justify-between">
                    <span className="text-gray-600">Serving Size:</span>
                    <span className="font-medium">{selectedCoffee.size}</span>
                    </div>
                    <div className="flex justify-between">
                    <span className="text-gray-600">Category:</span>
                    <span className="font-medium">{selectedCoffee.category}</span>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
        </div>
    );
    };
    export default CoffeeModal;