import { Route, Lightbulb, MapPin, Navigation, AlertCircle, Info, Timer } from 'lucide-react';
import StatsCard from './StatsCard';
import ErrandCard from './ErrandCard';

export default function RouteDisplay({ data }) {
    if (!data) return null;

    // Check if any step has a tip that sounds like a conflict/warning
    const hasConflicts = data.optimized_route.some(step =>
        step.tip && (step.tip.toLowerCase().includes('close') ||
            step.tip.toLowerCase().includes('impossible') ||
            step.tip.toLowerCase().includes('warning') ||
            step.tip.toLowerCase().includes('hurry'))
    );

    return (
        <div className="space-y-12 fade-in">
            {/* Summary & Conflict Alert */}
            <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-accent rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
                <div className="relative glass-card p-8 lg:p-12 overflow-hidden">
                    {/* Background decoration */}
                    <div className="absolute -right-10 -top-10 opacity-5">
                        <Navigation className="w-48 h-48 rotate-12" />
                    </div>

                    <div className="flex flex-col md:flex-row items-center gap-8 relative z-10 text-center md:text-left">
                        <div className="flex-shrink-0">
                            <div className="w-20 h-20 rounded-3xl bg-primary/20 flex items-center justify-center shadow-inner">
                                <Navigation className="w-10 h-10 text-primary animate-pulse" />
                            </div>
                        </div>
                        <div className="flex-1">
                            <div className="flex flex-wrap items-center gap-4 mb-4 justify-center md:justify-start">
                                <h3 className="text-3xl font-black tracking-tight">MISSION SUMMARY</h3>
                                {hasConflicts && (
                                    <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-500/20 border border-red-500/30 text-red-500 text-xs font-black uppercase tracking-widest animate-pulse">
                                        <AlertCircle className="w-4 h-4" />
                                        Logistics Conflict Detected
                                    </div>
                                )}
                            </div>
                            <p className="text-text-muted text-xl font-medium leading-relaxed max-w-2xl italic">
                                "{data.summary}"
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Impact Dashboard */}
            <div className="space-y-4">
                <div className="flex items-center gap-3 pl-2">
                    <div className="w-8 h-[2px] bg-primary/50" />
                    <span className="text-xs font-black text-text-muted uppercase tracking-[0.4em]">Resource Optimization</span>
                </div>
                <StatsCard stats={data.stats} />
            </div>

            {/* Errand Inventory */}
            <div className="glass-card p-8 lg:p-10 border-2 border-primary/10">
                <div className="flex items-center justify-between mb-10">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-primary/10 rounded-xl">
                            <MapPin className="w-7 h-7 text-primary" />
                        </div>
                        <div>
                            <h3 className="text-2xl font-black tracking-tight uppercase">Errand Inventory</h3>
                            <p className="text-sm text-text-muted font-bold tracking-widest uppercase opacity-60">
                                {data.errands_detected.length} ACTIVE TARGETS DETECTED
                            </p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {data.errands_detected.map((errand, index) => (
                        <ErrandCard key={index} errand={errand} index={index} />
                    ))}
                </div>
            </div>

            {/* The Optimized Sequence */}
            <div className="relative">
                <div className="absolute left-[31px] top-24 bottom-10 w-1 bg-gradient-to-b from-primary via-accent to-transparent rounded-full opacity-20" />

                <div className="flex items-center gap-4 mb-12 pl-2">
                    <div className="p-3 bg-accent/10 rounded-xl shadow-lg border border-accent/20">
                        <Route className="w-7 h-7 text-accent" />
                    </div>
                    <div>
                        <h3 className="text-2xl font-black tracking-tight uppercase">Optimized Sequence</h3>
                        <p className="text-sm text-text-muted font-bold tracking-widest uppercase opacity-60">
                            Logical Execution Path // Sat Feb 07 2026
                        </p>
                    </div>
                </div>

                <div className="space-y-8">
                    {data.optimized_route.map((step, index) => (
                        <div
                            key={index}
                            className="route-step group"
                            data-step={step.step}
                            style={{ animationDelay: `${index * 100 + 300}ms` }}
                        >
                            <div className="glass-card p-8 ml-6 group-hover:bg-white/5 transition-all duration-500 border-2 border-transparent group-hover:border-primary/20 relative overflow-hidden">
                                {/* Step numbering decoration */}
                                <div className="absolute -right-4 -bottom-4 text-[120px] font-black opacity-[0.03] select-none italic">
                                    {step.step}
                                </div>

                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
                                    <div className="space-y-1">
                                        <h4 className="text-2xl font-black tracking-tight text-primary uppercase">{step.location}</h4>
                                        <div className="flex items-center gap-2 text-xs font-mono text-text-muted/60 uppercase tracking-widest">
                                            <Timer className="w-3 h-3" />
                                            Execution Phase {step.step}
                                        </div>
                                    </div>
                                </div>

                                <p className="text-lg text-text-muted font-medium mb-6 leading-relaxed relative z-10">
                                    {step.action}
                                </p>

                                {step.tip && (
                                    <div className={`flex items-start gap-4 p-5 rounded-2xl border-2 transition-all duration-500 ${step.tip.toLowerCase().includes('warning') || step.tip.toLowerCase().includes('close') || step.tip.toLowerCase().includes('impossible')
                                            ? 'bg-red-500/10 border-red-500/20 text-red-500'
                                            : 'bg-accent/10 border-accent/20 text-accent'
                                        }`}>
                                        <div className="mt-1">
                                            {step.tip.toLowerCase().includes('warning') || step.tip.toLowerCase().includes('close') ? <AlertCircle className="w-5 h-5" /> : <Lightbulb className="w-5 h-5" />}
                                        </div>
                                        <div>
                                            <span className="text-[10px] font-black uppercase tracking-[0.2em] mb-1 block opacity-60">AI Logistics Advisor</span>
                                            <p className="text-sm font-bold leading-relaxed italic">"{step.tip}"</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Forensic Logic Trace */}
            <div className="relative overflow-hidden glass-card p-10 border-2 border-white/5 group">
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                    <Info className="w-24 h-24" />
                </div>
                <div className="flex items-center gap-3 mb-8">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    </div>
                    <h3 className="text-xs font-black text-text-muted uppercase tracking-[0.4em]">Forensic Logic Trace</h3>
                </div>
                <div className="bg-background/80 p-8 rounded-2xl border border-white/5 shadow-inner">
                    <p className="text-text-muted font-mono text-sm leading-relaxed whitespace-pre-wrap">
                        {data.logic_trace}
                    </p>
                </div>
            </div>
        </div>
    );
}
