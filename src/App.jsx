import { useState, useEffect } from 'react';
import { Zap, AlertTriangle, Github, Key, Settings, X, Check } from 'lucide-react';
import InputPanel from './components/InputPanel';
import RouteDisplay from './components/RouteDisplay';
import LoadingState from './components/LoadingState';
import { analyzeErrands } from './services/geminiService';

function App() {
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);
    const [apiKey, setApiKey] = useState(localStorage.getItem('gemini_api_key') || '');
    const [showSettings, setShowSettings] = useState(false);
    const [tempKey, setTempKey] = useState(apiKey);

    const saveApiKey = (e) => {
        e.preventDefault();
        localStorage.setItem('gemini_api_key', tempKey);
        setApiKey(tempKey);
        setShowSettings(false);
    };

    const handleAnalyze = async (textInput, imageFile) => {
        if (!apiKey) {
            setShowSettings(true);
            setError("Please set your Gemini API key first.");
            return;
        }

        setIsLoading(true);
        setError(null);
        setResult(null);

        try {
            const analysisResult = await analyzeErrands(textInput, imageFile, apiKey);
            setResult(analysisResult);
        } catch (err) {
            console.error('Analysis error:', err);
            setError(err.message || 'Failed to analyze errands. Please check your API key.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-background text-text">
            {/* Header */}
            <header className="border-b border-border bg-card/50 backdrop-blur-xl sticky top-0 z-50">
                <div className="container mx-auto px-4 py-4 lg:py-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg">
                                <Zap className="w-6 h-6 lg:w-7 lg:h-7 text-white" />
                            </div>
                            <div>
                                <h1 className="text-2xl lg:text-3xl font-bold gradient-text">
                                    ErrandMaster
                                </h1>
                                <p className="text-xs lg:text-sm text-text-muted">
                                    Multimodal Logistics Agent • Gemini 3 SDK
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 lg:gap-4">
                            <button
                                onClick={() => setShowSettings(true)}
                                className={`p-3 rounded-xl transition-all duration-200 border ${apiKey ? 'border-border bg-card' : 'border-primary/50 bg-primary/10 animate-pulse'
                                    }`}
                                title="API Settings"
                            >
                                {apiKey ? <Settings className="w-5 h-5 text-text-muted" /> : <Key className="w-5 h-5 text-primary" />}
                            </button>
                            <a
                                href="https://github.com/ar48code-dev"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-3 rounded-xl bg-card border border-border hover:bg-card-hover transition-all duration-200"
                            >
                                <Github className="w-5 h-5" />
                            </a>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto px-4 py-8 lg:py-12">
                {/* Settings Modal */}
                {showSettings && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-fade-in">
                        <div className="glass-card w-full max-w-md p-6 lg:p-8 animate-slide-up">
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-3">
                                    <Key className="w-6 h-6 text-primary" />
                                    <h3 className="text-xl font-bold">API Configuration</h3>
                                </div>
                                <button onClick={() => setShowSettings(false)} className="p-2 hover:bg-background rounded-lg">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <form onSubmit={saveApiKey} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-semibold text-text-muted mb-2">Gemini API Key</label>
                                    <input
                                        type="password"
                                        value={tempKey}
                                        onChange={(e) => setTempKey(e.target.value)}
                                        placeholder="Enter your Gemini 3 API key..."
                                        className="input-field"
                                        required
                                    />
                                    <p className="mt-2 text-xs text-text-muted">
                                        Your key is stored locally in your browser. Get one at{' '}
                                        <a href="https://aistudio.google.com/app/apikey" target="_blank" className="text-primary underline">Google AI Studio</a>.
                                    </p>
                                </div>
                                <button type="submit" className="btn-gradient w-full flex items-center justify-center gap-2">
                                    <Check className="w-5 h-5" />
                                    Save Changes
                                </button>
                            </form>
                        </div>
                    </div>
                )}

                {/* Hero Section */}
                <div className="text-center mb-12 lg:mb-16">
                    <h2 className="text-4xl lg:text-7xl font-bold mb-4 gradient-text leading-tight tracking-tight">
                        The Future of Logistics<br />is Multimodal.
                    </h2>
                    <p className="text-lg lg:text-xl text-text-muted max-w-3xl mx-auto leading-relaxed">
                        ErrandMaster uses Gemini 3's advanced spatial reasoning to turn messy lists, receipts, and photos into lightning-fast, optimized routes.
                    </p>
                </div>

                {/* Input Panel */}
                <div className="max-w-4xl mx-auto mb-8">
                    <InputPanel onAnalyze={handleAnalyze} isLoading={isLoading} />
                </div>

                {/* Loading State */}
                {isLoading && (
                    <div className="max-w-4xl mx-auto">
                        <LoadingState />
                    </div>
                )}

                {/* Error Display */}
                {error && !isLoading && (
                    <div className="max-w-4xl mx-auto glass-card p-6 border-2 border-red-500/50 fade-in mb-8">
                        <div className="flex items-start gap-4 text-red-400">
                            <AlertTriangle className="w-6 h-6 flex-shrink-0" />
                            <div>
                                <h3 className="text-lg font-bold mb-1">Logistics Error</h3>
                                <p>{error}</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Results */}
                {result && !isLoading && (
                    <div className="max-w-4xl mx-auto">
                        <RouteDisplay data={result} />
                    </div>
                )}

                {/* Getting Started Guide if no key */}
                {!apiKey && !isLoading && (
                    <div className="max-w-2xl mx-auto text-center py-12 glass-card border-dashed border-primary/30">
                        <h3 className="text-2xl font-bold mb-4">Set Up Your Intelligence</h3>
                        <p className="text-text-muted mb-6 px-8">
                            To activate ErrandMaster's AI core, please provide a Gemini API key. This ensures the app always works regardless of global usage limits.
                        </p>
                        <button onClick={() => setShowSettings(true)} className="btn-gradient">
                            Add API Key
                        </button>
                    </div>
                )}
            </main>

            {/* Footer */}
            <footer className="border-t border-border mt-16 lg:mt-24 bg-card/30">
                <div className="container mx-auto px-4 py-12">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                        <div className="flex items-center gap-3">
                            <Zap className="w-6 h-6 text-primary" />
                            <span className="font-bold text-xl">ErrandMaster</span>
                        </div>

                        <div className="text-center text-sm text-text-muted">
                            Built for Gemini 3 Hackathon • No Mock Data • Pure Innovation
                        </div>

                        <div className="text-xs font-mono text-text-muted">
                            v1.0.0-PROD
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default App;
