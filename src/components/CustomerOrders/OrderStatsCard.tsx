    // src/CustomOrder/OrderStatsCard.tsx
    import React from 'react';
    import { Eye, Clock, Coffee, CheckCircle } from 'lucide-react';

    interface OrderStatsCardProps {
    label: string;
    value: number;
    icon: React.ReactNode;
    colorClass?: string;
    }

    const OrderStatsCard: React.FC<OrderStatsCardProps> = ({ label, value, icon, colorClass = 'bg-gray-100' }) => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center justify-between">
            <div>
            <p className="text-sm font-medium text-gray-600">{label}</p>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
            </div>
            <div className={`${colorClass} p-3 rounded-full`}>
            {icon}
            </div>
        </div>
        </div>
    );
    };

    export default OrderStatsCard;