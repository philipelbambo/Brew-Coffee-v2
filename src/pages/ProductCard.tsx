import React, { useEffect, useState } from 'react';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  popular?: boolean;
  category: string;
}

interface ProductCardProps {
  product: Product;
  onClick: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  const [isOutOfStock, setIsOutOfStock] = useState(false);

  useEffect(() => {
    // Check stock status from localStorage
    const savedProducts = localStorage.getItem('inventoryProducts');
    if (savedProducts) {
      const inventoryProducts = JSON.parse(savedProducts);
      const inventoryProduct = inventoryProducts.find((p: any) => p.id === product.id);
      setIsOutOfStock(inventoryProduct?.currentStock === 0);
    }
  }, [product.id]);

  return (
    <div 
      className={`card hover:shadow-md transition-shadow duration-300 ${isOutOfStock ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`} 
      onClick={isOutOfStock ? undefined : onClick}
    >
      <div className="h-48 overflow-hidden relative">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover"
        />
        {isOutOfStock && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="text-white font-bold text-lg">Out of Stock</span>
          </div>
        )}
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
          <span className="text-lg font-medium text-primary-700">₱{product.price.toFixed(2)}</span>
        </div>
        
        <p className="text-sm text-gray-600 line-clamp-2 mb-3">{product.description}</p>
        
        {product.popular && (
          <span className="badge badge-popular">Popular</span>
        )}
      </div>
    </div>
  );
};

export default ProductCard;