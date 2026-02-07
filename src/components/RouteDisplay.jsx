import { Route, Lightbulb, MapPin, Navigation } from 'lucide-react';
import StatsCard from './StatsCard';
import ErrandCard from './ErrandCard';

export default function RouteDisplay({ data }) {
    if (!data) return null;

    return (
        <div className="space-y-8 fade-in">
            {/* Summary */}
            <div className="glass-card p-6 lg:p-8">
                <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                        <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                            <Navigation className="w-6 h-6 text-primary" />
                        </div>
                    </div>
                    <div className="flex-1">
                        <h3 className="text-xl font-bold mb-2">Route Summary</h3>
                        <p className="text-text-muted text-lg">{data.summary}</p>
                    </div>
                </div>
            </div>

            {/* Stats */}
            <StatsCard stats={data.stats} />

            {/* Detected Errands */}
            <div className="glass-card p-6 lg:p-8">
                <div className="flex items-center gap-3 mb-6">
                    <MapPin className="w-6 h-6 text-primary" />
                    <h3 className="text-xl font-bold">Detected Errands</h3>
                    <span className="px-3 py-1 rounded-full bg-primary/20 text-primary text-sm font-semibold">
                        {data.errands_detected.length}
                    </span>
                </div>

                <div className="grid gap-4">
                    {data.errands_detected.map((errand, index) => (
                        <ErrandCard key={index} errand={errand} index={index} />
                    ))}
                </div>
            </div>

            {/* Optimized Route */}
            <div className="glass-card p-6 lg:p-8">
                <div className="flex items-center gap-3 mb-6">
                    <Route className="w-6 h-6 text-accent" />
                    <h3 className="text-xl font-bold">Optimized Route</h3>
                </div>

                <div className="space-y-0">
                    {data.optimized_route.map((step, index) => (
                        <div
                            key={index}
                            className="route-step slide-up"
                            data-step={step.step}
                            style={{ animationDelay: `${index * 100 + 300}ms` }}
                        >
                            <div className="glass-card p-5 ml-2">
                                <div className="flex items-start justify-between gap-4 mb-2">
                                    <h4 className="font-bold text-lg">{step.location}</h4>
                                    <span className="text-xs font-mono text-text-muted">
                                        Step {step.step}
                                    </span>
                                </div>

                                <p className="text-text-muted mb-3">{step.action}</p>

                                {step.tip && (
                                    <div className="flex items-start gap-2 p-3 rounded-lg bg-accent/10 border border-accent/30">
                                        <Lightbulb className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                                        <p className="text-sm text-accent">{step.tip}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Logic Trace */}
            <div className="glass-card p-6 lg:p-8">
                <h3 className="text-lg font-bold mb-3 text-text-muted">AI Logic Trace</h3>
                <p className="text-text-muted font-mono text-sm leading-relaxed">
                    {data.logic_trace}
                </p>
            </div>
        </div>
    );
}
