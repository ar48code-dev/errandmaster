import { useState, useEffect } from 'react';
import { Zap, AlertTriangle, Key, Settings, X, Check, ShieldCheck, Cpu } from 'lucide-react';
import InputPanel from './components/InputPanel';
import RouteDisplay from './components/RouteDisplay';
import LoadingState from './components/LoadingState';
import { analyzeErrands } from './services/geminiService';

function App() {
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);
    const [apiKey, setApiKey] = useState('');
    const [showSettings, setShowSettings] = useState(false);
    const [tempKey, setTempKey] = useState('');

    // Load key from storage on mount
    useEffect(() => {
        const savedKey = localStorage.getItem('gemini_api_key');
        if (savedKey) {
            setApiKey(savedKey);
            setTempKey(savedKey);
        } else {
            setShowSettings(true);
        }
    }, []);

    const saveApiKey = (e) => {
        e.preventDefault();
        localStorage.setItem('gemini_api_key', tempKey);
        setApiKey(tempKey);
        setShowSettings(false);
    };

    const handleAnalyze = async (textInput, files) => {
        if (!apiKey) {
            setShowSettings(true);
            setError("Security: AI Intelligence Core Offline. Please provide a Gemini Key.");
            return;
        }

        setIsLoading(true);
        setError(null);
        setResult(null);

        try {
            const analysisResult = await analyzeErrands(textInput, files, apiKey);
            setResult(analysisResult);
        } catch (err) {
            console.error('Logic Error:', err);
            setError(err.message || 'The AI Core encountered a reasoning conflict. Please check your inputs.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-background text-text selection:bg-primary/30 antialiased overflow-x-hidden">
            {/* Optimized Header - Removed GitHub */}
            <header className="border-b border-white/5 bg-background/60 backdrop-blur-2xl sticky top-0 z-50">
                <div className="container mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                            <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-gradient-to-tr from-primary via-primary to-accent flex items-center justify-center shadow-lg group-hover:scale-105 transition-all">
                                <Zap className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-2xl lg:text-3xl font-black gradient-text tracking-tighter uppercase">
                                    ERRANDMASTER
                                </h1>
                                <p className="text-[10px] font-bold text-text-muted uppercase tracking-[0.2em] opacity-60">
                                    Gemini 3 Native Multimodality
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => setShowSettings(true)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-xs transition-all border ${apiKey
                                    ? 'border-border bg-card/50 text-text-muted hover:border-primary/50 hover:text-text'
                                    : 'border-primary bg-primary/10 text-primary animate-pulse'
                                    }`}
                            >
                                {apiKey ? <Settings className="w-4 h-4" /> : <Key className="w-4 h-4" />}
                                {apiKey ? 'AI ACTIVE' : 'ACTIVATE CORE'}
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Dashboard Layout */}
            <main className="container mx-auto px-6 py-12 lg:py-24 max-w-6xl">

                {/* Settings Modal */}
                {showSettings && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-background/90 backdrop-blur-xl animate-fade-in">
                        <div className="glass-card w-full max-w-lg p-10 animate-slide-up border-2 border-primary/20 relative shadow-2xl">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-accent" />

                            <div className="flex items-center justify-between mb-8">
                                <div className="flex items-center gap-4">
                                    <ShieldCheck className="w-8 h-8 text-primary" />
                                    <div>
                                        <h3 className="text-2xl font-black">AI Core Access</h3>
                                        <p className="text-sm text-text-muted">Enter Gemini API Credentials</p>
                                    </div>
                                </div>
                                <button onClick={() => setShowSettings(false)} className="p-2 hover:bg-white/5 rounded-xl">
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            <form onSubmit={saveApiKey} className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-text-muted uppercase tracking-widest pl-1">Gemini API Key</label>
                                    <input
                                        type="password"
                                        value={tempKey}
                                        onChange={(e) => setTempKey(e.target.value)}
                                        placeholder="Paste your key here..."
                                        className="input-field py-4 bg-background/50 border-2 border-border focus:border-primary"
                                        required
                                    />
                                    <p className="text-xs text-text-muted">
                                        Intelligence core activation requires a valid key from <a href="https://aistudio.google.com/app/apikey" target="_blank" className="text-primary hover:underline font-bold">Google Studio</a>.
                                    </p>
                                </div>
                                <button type="submit" className="btn-gradient w-full py-4 text-lg font-black flex items-center justify-center gap-3">
                                    <Check className="w-5 h-5" />
                                    INITIALIZE SYSTEM
                                </button>
                            </form>
                        </div>
                    </div>
                )}

                {/* Hero / Pitch */}
                <div className="text-center mb-24 lg:mb-32 relative">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/20 rounded-full blur-[100px] pointer-events-none -z-10" />

                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-[0.3em] mb-8">
                        <Cpu className="w-3 h-3" />
                        Next-Gen Logistics Engine
                    </div>
                    <h2 className="text-6xl lg:text-9xl font-black mb-8 gradient-text leading-[0.85] tracking-tighter uppercase">
                        ONE PAGE.<br />INFINITE PATHS.
                    </h2>
                    <p className="text-lg lg:text-xl text-text-muted max-w-2xl mx-auto leading-relaxed font-medium">
                        Parallel analysis of <span className="text-text font-bold">handwritten lists, audio memos, and camera scans</span> via Gemini 3 native interleaved reasoning.
                    </p>
                </div>

                {/* Main Dashboard */}
                <div className="space-y-24">
                    <section id="input-section" className="scroll-mt-32">
                        <InputPanel onAnalyze={handleAnalyze} isLoading={isLoading} />
                    </section>

                    {isLoading && (
                        <div className="py-20 animate-fade-in">
                            <LoadingState />
                        </div>
                    )}

                    {error && !isLoading && (
                        <div className="glass-card p-8 border-2 border-red-500/30 bg-red-500/5 animate-shake">
                            <div className="flex items-start gap-4 text-red-500">
                                <AlertTriangle className="w-8 h-8 flex-shrink-0" />
                                <div>
                                    <h3 className="text-xl font-black uppercase tracking-widest">Reasoning Fault</h3>
                                    <p className="font-medium opacity-80">{error}</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {result && !isLoading && (
                        <section id="results-section" className="scroll-mt-32 pt-16 border-t border-white/5">
                            <RouteDisplay data={result} />
                        </section>
                    )}

                    {!result && !isLoading && !error && apiKey && (
                        <div className="text-center py-24 glass-card border-dashed border-primary/20">
                            <div className="w-20 h-20 rounded-3xl bg-primary/10 flex items-center justify-center mx-auto mb-8">
                                <Zap className="w-10 h-10 text-primary" />
                            </div>
                            <h3 className="text-2xl font-black uppercase tracking-tight mb-2">Ready for Synthesis</h3>
                            <p className="text-text-muted max-w-xs mx-auto text-sm font-medium">
                                Provide multimodal sources to begin logistical cross-referencing.
                            </p>
                        </div>
                    )}
                </div>
            </main>

            {/* Final Footer - Simplified Branding */}
            <footer className="border-t border-white/5 mt-32 bg-card/10">
                <div className="container mx-auto px-6 py-16">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-10">
                        <div className="text-center md:text-left">
                            <div className="flex items-center gap-3 justify-center md:justify-start mb-2">
                                <Zap className="w-5 h-5 text-primary" />
                                <span className="font-black text-xl tracking-tighter uppercase">ERRANDMASTER</span>
                            </div>
                        </div>

                        <div className="flex flex-col items-center">
                            <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[9px] font-black text-text-muted tracking-[0.4em] uppercase mb-1">
                                v1.0.0
                            </span>
                            <span className="text-[10px] text-text-muted/30 font-bold uppercase tracking-widest">
                                Gemini 3 Hackathon 2026
                            </span>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default App;
