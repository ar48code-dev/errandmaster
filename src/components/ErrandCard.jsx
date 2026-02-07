import { MapPin, AlertCircle, CheckCircle2 } from 'lucide-react';

const priorityColors = {
    high: 'border-red-500/50 bg-red-500/5',
    medium: 'border-yellow-500/50 bg-yellow-500/5',
    low: 'border-green-500/50 bg-green-500/5',
};

const priorityBadges = {
    high: 'bg-red-500/20 text-red-400',
    medium: 'bg-yellow-500/20 text-yellow-400',
    low: 'bg-green-500/20 text-green-400',
};

export default function ErrandCard({ errand, index }) {
    return (
        <div
            className={`errand-card border ${priorityColors[errand.priority] || priorityColors.low}`}
            style={{ animationDelay: `${index * 50}ms` }}
        >
            <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                        <MapPin className="w-5 h-5 text-primary" />
                    </div>
                </div>

                <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-2">
                        <h4 className="font-bold text-lg">{errand.location}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${priorityBadges[errand.priority] || priorityBadges.low}`}>
                            {errand.priority?.toUpperCase() || 'LOW'}
                        </span>
                    </div>

                    <p className="text-text-muted">{errand.task}</p>
                </div>
            </div>
        </div>
    );
}
