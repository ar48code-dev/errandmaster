import { Loader2 } from 'lucide-react';

export default function LoadingState() {
    return (
        <div className="glass-card p-12 text-center fade-in">
            <div className="relative w-20 h-20 mx-auto mb-6">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-accent opacity-20 animate-pulse-slow"></div>
                <div className="absolute inset-2 rounded-full bg-background flex items-center justify-center">
                    <Loader2 className="w-10 h-10 text-primary animate-spin" />
                </div>
            </div>

            <h3 className="text-xl font-bold mb-2">Analyzing Your Errands</h3>
            <p className="text-text-muted mb-6">
                Gemini 3 is optimizing your route...
            </p>

            <div className="space-y-2 max-w-md mx-auto">
                <div className="flex items-center justify-between text-sm">
                    <span className="text-text-muted">🔍 Detecting locations</span>
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                </div>
                <div className="flex items-center justify-between text-sm">
                    <span className="text-text-muted">🗺️ Calculating optimal path</span>
                    <div className="w-2 h-2 rounded-full bg-accent animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                </div>
                <div className="flex items-center justify-between text-sm">
                    <span className="text-text-muted">💡 Generating smart tips</span>
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                </div>
            </div>
        </div>
    );
}
