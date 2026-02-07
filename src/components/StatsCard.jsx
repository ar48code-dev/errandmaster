import { TrendingUp, DollarSign, Leaf, Map as MapIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function StatsCard({ stats }) {
    const [animated, setAnimated] = useState(false);

    useEffect(() => {
        setAnimated(true);
    }, []);

    const items = [
        {
            label: 'Time Efficiency',
            value: `${stats.time_saved_mins}m`,
            icon: TrendingUp,
            color: 'text-primary',
            bg: 'bg-primary/10'
        },
        {
            label: 'Financial Gain',
            value: `$${stats.money_saved_usd}`,
            icon: DollarSign,
            color: 'text-yellow-500',
            bg: 'bg-yellow-500/10'
        },
        {
            label: 'Carbon Offset',
            value: stats.carbon_reduction,
            icon: Leaf,
            color: 'text-green-500',
            bg: 'bg-green-500/10'
        },
        {
            label: 'Spatial Mastery',
            value: `${stats.distance_optimized_km}km`,
            icon: MapIcon,
            color: 'text-accent',
            bg: 'bg-accent/10'
        },
    ];

    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {items.map((item, i) => (
                <div
                    key={i}
                    className={`glass-card p-6 flex flex-col items-center justify-center text-center transition-all duration-700 border-2 border-transparent hover:border-white/5 ${animated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                        }`}
                    style={{ transitionDelay: `${i * 100}ms` }}
                >
                    <div className={`p-4 rounded-2xl ${item.bg} mb-4`}>
                        <item.icon className={`w-8 h-8 ${item.color}`} />
                    </div>
                    <div className="text-3xl font-black mb-1 tracking-tighter">{item.value}</div>
                    <div className="text-[10px] font-bold text-text-muted uppercase tracking-[0.2em]">{item.label}</div>
                </div>
            ))}
        </div>
    );
}
