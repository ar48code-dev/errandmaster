import { useState } from 'react';
import { Sparkles, BrainCircuit, Type, FileUp } from 'lucide-react';
import MultimodalUpload from './MultimodalUpload';

export default function InputPanel({ onAnalyze, isLoading }) {
    const [textInput, setTextInput] = useState('');
    const [multimodalFile, setMultimodalFile] = useState(null);
    const [error, setError] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!textInput.trim() && !multimodalFile) {
            setError("Please provide at least a text list or a file (photo/voice/video).");
            return;
        }
        setError(null);
        onAnalyze(textInput, multimodalFile);
    };

    return (
        <div className="glass-card p-6 lg:p-8 relative overflow-hidden">
            {/* Decorative gradient background element */}
            <div className="absolute top-0 right-0 h-32 w-32 bg-primary/5 rounded-full blur-3xl -mr-16 -mt-16" />

            <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-primary/10 rounded-2xl">
                    <BrainCircuit className="w-8 h-8 text-primary" />
                </div>
                <div>
                    <h2 className="text-2xl font-bold">Logistics Orchestrator</h2>
                    <p className="text-sm text-text-muted">Transform messy inputs into optimized routes</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Multimodal Section */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2 text-sm font-bold text-text-muted uppercase tracking-wider">
                        <FileUp className="w-4 h-4" />
                        <span>Multimodal Input (Image/Audio/Video)</span>
                    </div>
                    <MultimodalUpload
                        onFileSelect={setMultimodalFile}
                        selectedFile={multimodalFile}
                    />
                </div>

                {/* Text Section */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2 text-sm font-bold text-text-muted uppercase tracking-wider">
                        <Type className="w-4 h-4" />
                        <span>Additional Context/Text List</span>
                    </div>
                    <textarea
                        value={textInput}
                        onChange={(e) => setTextInput(e.target.value)}
                        placeholder="Type your errands here, or upload a voice memo/list photo above. e.g. Buy groceries at Target, then gas at Shell."
                        className="input-field min-h-[120px] resize-y font-medium text-lg"
                        disabled={isLoading}
                    />
                </div>

                {error && (
                    <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 slide-up">
                        <p className="text-sm text-red-400 font-semibold">{error}</p>
                    </div>
                )}

                <button
                    type="submit"
                    disabled={isLoading}
                    className="btn-gradient w-full py-5 text-xl lg:text-2xl shadow-2xl flex items-center justify-center gap-4 group"
                >
                    {isLoading ? (
                        <div className="flex items-center gap-3">
                            <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                            <span>Analyzing Master Prompt...</span>
                        </div>
                    ) : (
                        <>
                            <Sparkles className="w-7 h-7 group-hover:rotate-12 transition-transform" />
                            <span>Generate Optimized Route</span>
                        </>
                    )}
                </button>
            </form>
        </div>
    );
}
