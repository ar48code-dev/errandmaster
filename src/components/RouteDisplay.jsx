import { Route, Lightbulb, MapPin, Navigation, AlertCircle, Info, Timer, Globe } from 'lucide-react';
import StatsCard from './StatsCard';
import ErrandCard from './ErrandCard';

export default function RouteDisplay({ data }) {
    if (!data) return null;

    const hasConflicts = data.optimized_route.some(step =>
        step.tip && (step.tip.toLowerCase().includes('close') ||
            step.tip.toLowerCase().includes('impossible') ||
            step.tip.toLowerCase().includes('warning'))
    );

    return (
        <div className="space-y-12 fade-in">
            {/* Mission Summary & Spatial Header */}
            <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary via-accent to-primary rounded-3xl blur opacity-20 transition duration-1000"></div>
                <div className="relative glass-card p-10 lg:p-14 overflow-hidden">
                    <div className="flex flex-col md:flex-row items-center gap-10 relative z-10">
                        <div className="flex-shrink-0">
                            <div className="w-24 h-24 rounded-[2rem] bg-primary/15 border border-primary/20 flex items-center justify-center shadow-inner">
                                <Globe className="w-12 h-12 text-primary animate-pulse-slow" />
                            </div>
                        </div>
                        <div className="flex-1 text-center md:text-left">
                            <div className="flex flex-wrap items-center gap-4 mb-4 justify-center md:justify-start">
                                <h3 className="text-3xl font-black tracking-tighter uppercase">Spatial Analysis Results</h3>
                                {hasConflicts && (
                                    <div className="px-4 py-1.5 rounded-full bg-red-500/10 border border-red-500/30 text-red-500 text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                                        <AlertCircle className="w-4 h-4" /> Conflict Detected
                                    </div>
                                )}
                            </div>
                            <p className="text-text-muted text-xl font-medium leading-relaxed italic opacity-80">
                                "{data.summary}"
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Spatial Intelligence Stats */}
            <div className="space-y-6">
                <div className="flex items-center gap-4 pl-2 font-black text-xs text-text-muted uppercase tracking-[0.4em]">
                    <div className="w-2 h-2 rounded-full bg-accent" />
                    Operational Impact Metrics
                </div>
                <StatsCard stats={data.stats} />
            </div>

            {/* Step-by-Step Spatial Guidance */}
            <div className="relative pb-10">
                <div className="absolute left-[39px] top-24 bottom-0 w-1 bg-gradient-to-b from-primary via-accent to-transparent rounded-full opacity-10" />

                <div className="flex items-center gap-5 mb-12 pl-2">
                    <div className="p-4 bg-accent/10 rounded-2xl border border-accent/20">
                        <Route className="w-8 h-8 text-accent" />
                    </div>
                    <div>
                        <h3 className="text-3xl font-black tracking-tight uppercase">Optimized Sequence</h3>
                        <p className="text-xs text-text-muted font-bold tracking-[0.3em] uppercase opacity-50">
                            Logical Execution Path // Sat Feb 07 2026
                        </p>
                    </div>
                </div>

                <div className="space-y-10">
                    {data.optimized_route.map((step, index) => (
                        <div key={index} className="route-step pl-1 relative group">
                            {/* Step Marker */}
                            <div className="absolute left-6 top-8 w-8 h-8 rounded-xl bg-background border-2 border-primary flex items-center justify-center text-xs font-black z-10 group-hover:bg-primary group-hover:text-white transition-all shadow-lg">
                                {step.step}
                            </div>

                            <div className="glass-card p-8 lg:p-10 ml-16 hover:bg-white/5 transition-all duration-500 border-2 border-transparent hover:border-primary/20 relative">
                                <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
                                    <div>
                                        <h4 className="text-2xl font-black text-primary uppercase tracking-tight">{step.location}</h4>
                                        <div className="flex items-center gap-2 text-[10px] font-bold text-text-muted uppercase tracking-widest opacity-60 mt-1">
                                            <Timer className="w-3 h-3" /> Step {step.step} • {step.spatial_nexus || "Sequence Logic"}
                                        </div>
                                    </div>
                                </div>

                                <p className="text-lg text-text-muted font-medium mb-8 leading-relaxed opacity-90">
                                    {step.action}
                                </p>

                                {step.tip && (
                                    <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/5 border border-white/10 text-sm font-bold italic text-accent shadow-inner">
                                        <Lightbulb className="w-5 h-5 flex-shrink-0 mt-0.5" />
                                        <span>"{step.tip}"</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Spatial Reasoning Engine Trace */}
            <div className="glass-card p-10 lg:p-14 border-2 border-white/5 bg-gradient-to-br from-card to-background relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                    <Info className="w-32 h-32" />
                </div>
                <div className="flex items-center gap-4 mb-10">
                    <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
                    <h3 className="text-xs font-black text-text-muted uppercase tracking-[0.5em]">Forensic Spatial Trace</h3>
                </div>
                <div className="bg-black/40 p-10 rounded-[2rem] border border-white/5 shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)]">
                    <p className="text-text-muted font-mono text-sm leading-relaxed whitespace-pre-wrap">
                        {data.logic_trace}
                    </p>
                </div>
            </div>
        </div>
    );
}
