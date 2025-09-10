    import React, { useState } from 'react';
    import { ArrowLeft, Coffee, ShoppingCart, Smartphone, Truck } from 'lucide-react';
    import { ToastContainer } from 'react-toastify';
    import 'react-toastify/dist/ReactToastify.css';

    // Components
    import CoffeeModal from './CoffeeModal';
    import { OrderModal } from './OrderModal';

    // Types
    import { CoffeeProduct, Dessert, PaymentMethod, CartItem, OrderData } from './Types';

    // Utils
    import { formatPrice } from './FormatPrice';

    export const BrewCoffeeOrderSystem: React.FC = () => {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
    const [selectedCoffee, setSelectedCoffee] = useState<CoffeeProduct | null>(null);
    const [isOrderingNow, setIsOrderingNow] = useState<CoffeeProduct | false>(false);
    const [selectedDesserts, setSelectedDesserts] = useState<{ [key: string]: number }>({});
    const [orderPlaced, setOrderPlaced] = useState(false);
    const [placedOrderData, setPlacedOrderData] = useState<OrderData | null>(null);

    const coffeeProducts: CoffeeProduct[] = [
    {
        id: '1',
        name: 'Espresso',
        price: 195.0,
        fullDescription: 'A concentrated coffee beverage brewed from premium Arabica beans.',
        image: './images/SliderGallery/cup1.png',
        category: 'Hot',
        ingredients: ['Premium Arabica Beans', 'Hot Water'],
        caffeine: 'High',
        size: '2 oz',
    },
    {
        id: '2',
        name: 'Cappuccino',
        price: 220.0,
        fullDescription: 'Espresso topped with steamed milk and foam.',
        image: './images/SliderGallery/cup2.png',
        category: 'Hot',
        ingredients: ['Espresso', 'Steamed Milk', 'Foam'],
        caffeine: 'Medium',
        size: '8 oz',
    },
    {
        id: '3',
        name: 'Latte',
        price: 210.0,
        fullDescription: 'Espresso mixed with steamed milk and a thin layer of foam.',
        image: './images/SliderGallery/cup3.png',
        category: 'Hot',
        ingredients: ['Espresso', 'Steamed Milk'],
        caffeine: 'Medium',
        size: '12 oz',
    },
    {
        id: '4',
        name: 'Americano',
        price: 180.0,
        fullDescription: 'Espresso diluted with hot water for a smoother taste.',
        image: './images/SliderGallery/cup4.png',
        category: 'Hot',
        ingredients: ['Espresso', 'Hot Water'],
        caffeine: 'High',
        size: '12 oz',
    },
    {
        id: '5',
        name: 'Iced Coffee',
        price: 170.0,
        fullDescription: 'Freshly brewed coffee served over ice for a refreshing drink.',
        image: './images/SliderGallery/cup5.png',
        category: 'Cold',
        ingredients: ['Brewed Coffee', 'Ice'],
        caffeine: 'High',
        size: '16 oz',
    },
    {
        id: '6',
        name: 'Caramel Macchiato',
        price: 240.0,
        fullDescription: 'Espresso with vanilla, steamed milk, and a caramel drizzle.',
        image: './images/SliderGallery/cup6.png',
        category: 'Hot',
        ingredients: ['Espresso', 'Steamed Milk', 'Vanilla', 'Caramel Syrup'],
        caffeine: 'Medium',
        size: '12 oz',
    },
    {
        id: '7',
        name: 'Mocha',
        price: 250.0,
        fullDescription: 'A chocolate-flavored variant of a latte, perfect for sweet lovers.',
        image: './images/SliderGallery/cup7.png',
        category: 'Hot',
        ingredients: ['Espresso', 'Steamed Milk', 'Chocolate Syrup', 'Whipped Cream'],
        caffeine: 'Medium',
        size: '12 oz',
    },
    {
        id: '8',
        name: 'Cold Brew',
        price: 200.0,
        fullDescription: 'Coffee steeped in cold water for 12 hours, smooth and less acidic.',
        image: './images/SliderGallery/cup8.png',
        category: 'Cold',
        ingredients: ['Cold Brew Coffee', 'Ice'],
        caffeine: 'High',
        size: '16 oz',
    },
    {
        id: '9',
        name: 'Flat White',
        price: 230.0,
        fullDescription: 'Velvety smooth espresso with micro-foamed milk for a rich texture.',
        image: './images/SliderGallery/cup9.png',
        category: 'Hot',
        ingredients: ['Espresso', 'Steamed Milk'],
        caffeine: 'Medium',
        size: '8 oz',
    },
    {
        id: '10',
        name: 'Affogato',
        price: 260.0,
        fullDescription: 'A scoop of vanilla ice cream drowned in a shot of hot espresso.',
        image: './images/SliderGallery/cup10.png',
        category: 'Dessert Coffee',
        ingredients: ['Espresso', 'Vanilla Ice Cream'],
        caffeine: 'High',
        size: '6 oz',
    },
    {
        id: '11',
        name: 'Matcha Latte',
        price: 240.0,
        fullDescription: 'A creamy blend of premium matcha green tea and steamed milk.',
        image: './images/SliderGallery/cup11.png',
        category: 'Hot',
        ingredients: ['Matcha Powder', 'Steamed Milk'],
        caffeine: 'Low',
        size: '12 oz',
    },
    {
        id: '12',
        name: 'Java Chip Frappe',
        price: 270.0,
        fullDescription: 'Blended coffee with chocolate chips, topped with whipped cream.',
        image: './images/SliderGallery/cup12.png',
        category: 'Cold',
        ingredients: ['Espresso', 'Milk', 'Ice', 'Chocolate Chips', 'Whipped Cream'],
        caffeine: 'Medium',
        size: '16 oz',
    },
    ];


        const desserts: Dessert[] = [
    { id: 'dessert1', name: 'Chocolate Cake', price: 150, image: './images/SliderGallery/bread1.png' },
    { id: 'dessert2', name: 'Croissant', price: 95, image: './images/SliderGallery/bread2.png' },
    { id: 'dessert3', name: 'Cookie', price: 60, image: './images/SliderGallery/bread3.png' },
    { id: 'dessert4', name: 'Cheesecake', price: 175, image: './images/SliderGallery/bread4.png' },
    { id: 'dessert5', name: 'Blueberry Muffin', price: 85, image: './images/SliderGallery/bread5.png' },
    { id: 'dessert6', name: 'Brownie', price: 120, image: './images/SliderGallery/bread6.png' },
    { id: 'dessert7', name: 'Cinnamon Roll', price: 140, image: './images/SliderGallery/bread7.png' },
    { id: 'dessert8', name: 'Macaron Box (6 pcs)', price: 250, image: './images/SliderGallery/bread8.png' },
    ];

    const paymentMethods: PaymentMethod[] = [
        {
        id: 'gcash',
        name: 'GCash',
        icon: <Smartphone className="w-5 h-5" />,
        description: 'Pay via GCash mobile wallet',
        number: '+63 917 123 4567',
        accountName: 'Brew Coffee Shop',
        },
        {
        id: 'cod',
        name: 'Cash on Delivery',
        icon: <Truck className="w-5 h-5" />,
        description: 'Pay when your order arrives',
        },
    ];

    const regions = [
        'Metro Manila', 'Calabarzon', 'Central Luzon', 'Western Visayas', 'Central Visayas',
        'Northern Mindanao', 'Davao Region', 'Soccsksargen', 'Ilocos Region', 'Cagayan Valley',
        'Bicol Region', 'Eastern Visayas', 'Zamboanga Peninsula', 'Caraga', 'Mimaropa',
        'Cordillera Administrative Region', 'Bangsamoro Autonomous Region',
    ];

    const addToCart = (coffee: CoffeeProduct) => {
        const cartItem: CartItem = {
        ...coffee,
        id: `${coffee.id}-${Date.now()}`,
        quantity: 1,
        desserts: Object.keys(selectedDesserts)
            .map((dessertId) => {
            const dessert = desserts.find((d) => d.id === dessertId);
            const qty = selectedDesserts[dessertId];
            if (dessert) return { ...dessert, quantity: qty };
            return null;
            })
            .filter((d): d is Dessert & { quantity: number } => d !== null),
        };
        setCart((prev) => [...prev, cartItem]);
        setSelectedDesserts({});
        setIsOrderingNow(false);
        setIsCartOpen(true);
    };

    const orderNow = (coffee: CoffeeProduct) => {
        setSelectedDesserts({});
        setIsOrderingNow(coffee);
    };

    return (
        <>
        <div className="min-h-screen bg-white text-[#4B352A]">
            {/* Header */}
            <header className="border-b border-gray-200 sticky top-0 z-50 bg-white">
            <div className="container mx-auto px-6 py-4 flex items-center">
                <button onClick={() => window.history.back()} className="mr-4 p-2 hover:bg-gray-100 rounded-full">
                <ArrowLeft className="w-6 h-6 text-[#4B352A]" />
                </button>
                <div className="flex items-center space-x-3">
                <Coffee className="w-8 h-8 text-[#4B352A]" />
                <h1 className="text-3xl font-bold text-[#4B352A]">Brew Coffee</h1>
                </div>
                <div className="ml-auto">
                <button
                    onClick={() => setIsCartOpen(true)}
                    className="relative bg-[#4B352A] text-white px-4 py-2 rounded-lg font-semibold flex items-center space-x-2"
                >
                    <ShoppingCart className="w-5 h-5" />
                    <span> ({cart.reduce((sum, item) => sum + item.quantity + (item.desserts?.reduce((s, d) => s + d.quantity, 0) || 0), 0)})</span>
                    {cart.length > 0 && (
                    <div className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold animate-pulse">
                        {cart.reduce((sum, item) => sum + item.quantity + (item.desserts?.reduce((s, d) => s + d.quantity, 0) || 0), 0)}
                    </div>
                    )}
                </button>
                </div>
            </div>
            </header>

            {/* Hero Section */}
            <section className="text-center py-16 px-6">
            <h2 className="text-5xl font-bold mb-4">Premium Coffee Experience</h2>
            <p className="text-xl max-w-2xl mx-auto">Handcrafted beverages made with the finest beans from around the world</p>
            </section>

            {/* Coffee Grid */}
            <section className="container mx-auto px-6 pb-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {coffeeProducts.map((coffee) => (
                <div
                    key={coffee.id}
                    className="p-6 transform transition-all duration-300 hover:scale-105 cursor-pointer"
                    onClick={() => setSelectedCoffee(coffee)}
                >
                    <div className="w-full h-60 mb-4 rounded-xl overflow-hidden">
                    <img src={coffee.image} alt={coffee.name} className="w-full h-full object-cover hover:scale-105 transition-transform" />
                    </div>
                    <div className="text-center">
                    <h3 className="text-2xl font-bold mb-0">{coffee.name}</h3>
                    <p className="text-gray-600 mb-1 text-sm">{coffee.fullDescription.substring(0, 60)}...</p>
                    <div className="flex justify-between items-center">
                        <span className="text-2xl font-bold text-[#4B352A]">{formatPrice(coffee.price)}</span>
                        <span className="bg-[#4B352A] text-white px-3 py-1 rounded-full text-sm">{coffee.category}</span>
                    </div>
                    <div className="flex space-x-2 mt-3">
                        <button
                        onClick={(e) => {
                            e.stopPropagation();
                            orderNow(coffee);
                        }}
                        className="flex-1 bg-[#4B352A] text-white py-2 rounded-lg font-semibold"
                        >
                        Order Now
                        </button>
                        <button
                        onClick={(e) => {
                            e.stopPropagation();
                            addToCart(coffee);
                        }}
                        className="flex-1 bg-[#84994F] text-white py-2 rounded-lg font-semibold"
                        >
                        Add to Cart
                        </button>
                    </div>
                    </div>
                </div>
                ))}
            </div>
            </section>

            {/* Modals */}
            <CoffeeModal selectedCoffee={selectedCoffee} onClose={() => setSelectedCoffee(null)} />
            <OrderModal
            cart={cart}
            setCart={setCart}
            isCartOpen={isCartOpen}
            setIsCartOpen={setIsCartOpen}
            isCheckoutOpen={isCheckoutOpen}
            setIsCheckoutOpen={setIsCheckoutOpen}
            desserts={desserts}
            paymentMethods={paymentMethods}
            regions={regions}
            orderPlaced={orderPlaced}
            setOrderPlaced={setOrderPlaced}
            placedOrderData={placedOrderData}
            setPlacedOrderData={setPlacedOrderData}
            addToCart={addToCart}
            isOrderingNow={isOrderingNow}
            setIsOrderingNow={setIsOrderingNow}
            selectedDesserts={selectedDesserts}
            setSelectedDesserts={setSelectedDesserts}
            />
        </div>

        <ToastContainer position="top-center" autoClose={false} hideProgressBar={false} closeOnClick={false} draggable={false} pauseOnHover style={{ width: '100%', maxWidth: '500px' }} />
        </>
    );
    };

    export default BrewCoffeeOrderSystem;
