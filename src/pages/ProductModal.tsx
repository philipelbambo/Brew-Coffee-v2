import React, { useState } from 'react';
import { X } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

interface ProductModalProps {
  product: Product;
  onClose: () => void;
  addToCart: (item: any) => void;
  customerName: string;
  currentDate: string;
  currentTime: string;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, onClose, addToCart, customerName, currentDate, currentTime }) => {
  const [size, setSize] = useState('Small');
  const [milkType, setMilkType] = useState('Whole Milk');
  const [flavorShot, setFlavorShot] = useState('None');

  const sizes = [
    { name: 'Small', additionalPrice: 0 },
    { name: 'Medium', additionalPrice: 25 },
    { name: 'Large', additionalPrice: 35 },
  ];

  const milkTypes = [
    'Whole Milk',
    'Skim Milk',
    'Oat Milk',
    'Almond Milk',
    'Soy Milk',
  ];

  const flavorShots = [
    'None',
    'Vanilla',
    'Caramel',
    'Hazelnut',
    'Chocolate',
  ];

  const calculateTotalPrice = () => {
    let total = product.price;

    // Add size price
    const selectedSize = sizes.find(s => s.name === size);
    if (selectedSize) {
      total += selectedSize.additionalPrice;
    }

    // Add price for non-default milk
    if (milkType !== 'Whole Milk' && milkType !== 'Skim Milk') {
      total += 5.0;
    }

    // Add flavor shot price
    if (flavorShot !== 'None') {
      total += 5.0;
    }

    return total.toFixed(2);
  };

  const handleAddToCart = () => {
    const item = {
      id: product.id,
      name: product.name,
      price: parseFloat(calculateTotalPrice()),
      quantity: 1,
      image: product.image,
      options: [
        { name: 'Size', value: size },
        { name: 'Milk', value: milkType },
        { name: 'Flavor', value: flavorShot },
      ],
      customerName,
      currentDate,
      currentTime,
    };
    addToCart(item);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-md max-h-90vh overflow-y-auto scale-in">
        <div className="relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 bg-white rounded-full p-1 shadow-sm z-10"
          >
            <X size={20} />
          </button>

          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 object-cover rounded-t-lg"
          />
        </div>

        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-2xl font-semibold text-gray-800">{product.name}</h2>
            <span className="text-xl font-medium text-primary-700">₱{product.price.toFixed(2)}</span>
          </div>

          <p className="text-gray-600 mb-6">{product.description}</p>

          <div className="space-y-6">
            {/* Size Selection */}
            {(product.category === 'coffee' || product.category === 'tea') && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Size <span className="text-red-500">*</span>
                </label>
                <div className="space-y-2">
                  {sizes.map((sizeOption) => (
                    <div
                      key={sizeOption.name}
                      className={`border rounded-md p-3 cursor-pointer transition-colors
                        ${size === sizeOption.name
                          ? 'border-primary-600 bg-primary-50'
                          : 'border-gray-200 hover:bg-gray-50'}`}
                      onClick={() => setSize(sizeOption.name)}
                    >
                      <div className="flex justify-between items-center">
                        <span>{sizeOption.name}</span>
                        {sizeOption.additionalPrice > 0 && (
                          <span className="text-gray-500">+₱{sizeOption.additionalPrice.toFixed(2)}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Milk Type Selection */}
            {product.category === 'coffee' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Milk Type <span className="text-red-500">*</span>
                </label>
                <select
                  value={milkType}
                  onChange={(e) => setMilkType(e.target.value)}
                  className="input w-full"
                >
                  {milkTypes.map((milk) => (
                    <option key={milk} value={milk}>
                      {milk} {(milk !== 'Whole Milk' && milk !== 'Skim Milk') ? '(+₱15)' : ''}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Flavor Shot Selection */}
            {product.category === 'coffee' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Flavor Shot
                </label>
                <select
                  value={flavorShot}
                  onChange={(e) => setFlavorShot(e.target.value)}
                  className="input w-full"
                >
                  {flavorShots.map((flavor) => (
                    <option key={flavor} value={flavor}>
                      {flavor} {flavor !== 'None' ? '(+₱5.0)' : ''}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          <div className="mt-8">
            <button
  className="bg-green-600 hover:bg-green-700 text-white font-semibold rounded-md w-full py-3 transition-colors"
  onClick={handleAddToCart}
>
  Add to Order
  <span className="ml-2">₱{calculateTotalPrice()}</span>
</button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
