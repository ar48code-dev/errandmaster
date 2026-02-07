import { TrendingUp, DollarSign, Leaf } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function StatsCard({ stats }) {
    const [animated, setAnimated] = useState(false);

    useEffect(() => {
        // Trigger animation after mount
        const timer = setTimeout(() => setAnimated(true), 100);
        return () => clearTimeout(timer);
    }, []);

    const statItems = [
        {
            icon: TrendingUp,
            label: 'Time Saved',
            value: `${stats.time_saved_mins} min`,
            color: 'text-primary',
            bgColor: 'bg-primary/10',
        },
        {
            icon: DollarSign,
            label: 'Money Saved',
            value: `$${stats.money_saved_usd.toFixed(2)}`,
            color: 'text-accent',
            bgColor: 'bg-accent/10',
        },
        {
            icon: Leaf,
            label: 'Carbon Reduction',
            value: stats.carbon_reduction,
            color: 'text-green-400',
            bgColor: 'bg-green-400/10',
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 fade-in">
            {statItems.map((item, index) => (
                <div
                    key={item.label}
                    className="stats-card"
                    style={{ animationDelay: `${index * 100}ms` }}
                >
                    <div className={`w-12 h-12 rounded-full ${item.bgColor} flex items-center justify-center mx-auto mb-3`}>
                        <item.icon className={`w-6 h-6 ${item.color}`} />
                    </div>

                    <div className={`text-3xl font-bold mb-1 ${item.color} transition-all duration-1000 ${animated ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
                        }`}>
                        {item.value}
                    </div>

                    <div className="text-sm text-text-muted font-semibold">
                        {item.label}
                    </div>
                </div>
            ))}
        </div>
    );
}
