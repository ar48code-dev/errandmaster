import { useState } from 'react';
import { Sparkles, BrainCircuit, Type, Files } from 'lucide-react';
import MultimodalUpload from './MultimodalUpload';

export default function InputPanel({ onAnalyze, isLoading }) {
    const [textInput, setTextInput] = useState('');
    const [multimodalFiles, setMultimodalFiles] = useState([]);
    const [error, setError] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!textInput.trim() && multimodalFiles.length === 0) {
            setError("Please provide at least a text list or an attachment (photo/audio/video).");
            return;
        }
        setError(null);
        onAnalyze(textInput, multimodalFiles);
    };

    return (
        <div className="glass-card p-6 lg:p-10 relative overflow-hidden border-2 border-primary/20">
            {/* Dynamic gradient background */}
            <div className="absolute top-0 right-0 h-48 w-48 bg-primary/10 rounded-full blur-[80px] -mr-24 -mt-24 animate-pulse-slow" />
            <div className="absolute bottom-0 left-0 h-48 w-48 bg-accent/10 rounded-full blur-[80px] -ml-24 -mb-24 animate-pulse-slow" style={{ animationDelay: '1s' }} />

            <div className="flex items-center gap-5 mb-10 relative z-10">
                <div className="p-4 bg-primary/15 rounded-2xl shadow-inner border border-primary/20">
                    <BrainCircuit className="w-10 h-10 text-primary" />
                </div>
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Logistics Core</h2>
                    <p className="text-base text-text-muted font-medium">Native Gemini 3 Multimodal Intelligence</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-10 relative z-10">
                {/* Multimodal Section */}
                <div className="space-y-5">
                    <div className="flex items-center justify-between text-xs font-bold text-text-muted uppercase tracking-[0.2em]">
                        <div className="flex items-center gap-2">
                            <Files className="w-4 h-4 text-primary" />
                            <span>Multi-Source Intelligence</span>
                        </div>
                        <span className="text-primary/60">{multimodalFiles.length} source(s)</span>
                    </div>
                    <MultimodalUpload
                        onFilesSelect={setMultimodalFiles}
                        selectedFiles={multimodalFiles}
                    />
                </div>

                {/* Text Section */}
                <div className="space-y-5">
                    <div className="flex items-center gap-2 text-xs font-bold text-text-muted uppercase tracking-[0.2em]">
                        <Type className="w-4 h-4 text-accent" />
                        <span>Structured or Messy Text</span>
                    </div>
                    <textarea
                        value={textInput}
                        onChange={(e) => setTextInput(e.target.value)}
                        placeholder="Describe your goals, paste lists, or add context for your attachments..."
                        className="input-field min-h-[160px] resize-y font-medium text-lg bg-card/50 focus:bg-card border-2 border-border/50 transition-all shadow-inner"
                        disabled={isLoading}
                    />
                </div>

                {error && (
                    <div className="p-5 rounded-2xl bg-red-500/10 border-2 border-red-500/20 slide-up flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                        <p className="text-sm text-red-400 font-bold">{error}</p>
                    </div>
                )}

                <button
                    type="submit"
                    disabled={isLoading}
                    className="btn-gradient w-full py-6 text-2xl font-black shadow-[0_20px_50px_rgba(139,92,246,0.3)] flex items-center justify-center gap-5 hover:shadow-primary/40 active:scale-[0.98] transition-all group"
                >
                    {isLoading ? (
                        <div className="flex items-center gap-4">
                            <div className="w-8 h-8 border-4 border-white/20 border-t-white rounded-full animate-spin" />
                            <span className="animate-pulse">Reasoning...</span>
                        </div>
                    ) : (
                        <>
                            <Sparkles className="w-8 h-8 group-hover:rotate-[25deg] transition-transform duration-500" />
                            <span className="tracking-wide">OPTIMIZE ROUTES</span>
                        </>
                    )}
                </button>
            </form>
        </div>
    );
}
