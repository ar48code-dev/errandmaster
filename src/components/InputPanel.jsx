import { useState } from 'react';
import { Sparkles, ImagePlus, Type } from 'lucide-react';
import ImageUpload from './ImageUpload';
import { validateTextInput } from '../utils/validators';

export default function InputPanel({ onAnalyze, isLoading }) {
    const [activeTab, setActiveTab] = useState('text');
    const [textInput, setTextInput] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [error, setError] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        setError(null);

        // Validate inputs
        const textValidation = validateTextInput(textInput);
        if (!textValidation.valid) {
            setError(textValidation.error);
            return;
        }

        // Submit for analysis
        onAnalyze(textInput, imageFile);
    };

    const handleClear = () => {
        setTextInput('');
        setImageFile(null);
        setError(null);
    };

    return (
        <div className="glass-card p-6 lg:p-8 fade-in">
            <div className="flex items-center gap-3 mb-6">
                <Sparkles className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-bold">Analyze Your Errands</h2>
            </div>

            {/* Tab Switcher */}
            <div className="flex gap-2 mb-6">
                <button
                    onClick={() => setActiveTab('text')}
                    className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all duration-200 ${activeTab === 'text'
                            ? 'bg-primary text-white'
                            : 'bg-background/50 text-text-muted hover:bg-background'
                        }`}
                >
                    <Type className="w-5 h-5 inline mr-2" />
                    Text Input
                </button>
                <button
                    onClick={() => setActiveTab('image')}
                    className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all duration-200 ${activeTab === 'image'
                            ? 'bg-primary text-white'
                            : 'bg-background/50 text-text-muted hover:bg-background'
                        }`}
                >
                    <ImagePlus className="w-5 h-5 inline mr-2" />
                    Image Upload
                </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Text Input Tab */}
                {activeTab === 'text' && (
                    <div className="space-y-4">
                        <label htmlFor="errand-input" className="block text-sm font-semibold text-text-muted">
                            List your errands
                        </label>
                        <textarea
                            id="errand-input"
                            value={textInput}
                            onChange={(e) => setTextInput(e.target.value)}
                            placeholder="e.g., Buy milk at Target, return package at UPS Store, get gas at Shell on Main St..."
                            className="input-field min-h-[200px] resize-y font-mono text-sm"
                            disabled={isLoading}
                        />
                        <p className="text-xs text-text-muted">
                            💡 Tip: Be specific with locations and items for better optimization
                        </p>
                    </div>
                )}

                {/* Image Upload Tab */}
                {activeTab === 'image' && (
                    <div className="space-y-4">
                        <label className="block text-sm font-semibold text-text-muted mb-2">
                            Upload a photo (optional)
                        </label>
                        <ImageUpload
                            onImageSelect={setImageFile}
                            selectedImage={imageFile}
                        />

                        {/* Text input still required even with image */}
                        <div className="pt-4">
                            <label htmlFor="context-input" className="block text-sm font-semibold text-text-muted mb-2">
                                Add context or additional errands
                            </label>
                            <textarea
                                id="context-input"
                                value={textInput}
                                onChange={(e) => setTextInput(e.target.value)}
                                placeholder="e.g., Also need to pickup dry cleaning..."
                                className="input-field min-h-[120px] resize-y font-mono text-sm"
                                disabled={isLoading}
                            />
                        </div>
                    </div>
                )}

                {/* Error Display */}
                {error && (
                    <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30 slide-up">
                        <p className="text-sm text-red-400">{error}</p>
                    </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-3">
                    <button
                        type="submit"
                        disabled={isLoading || !textInput.trim()}
                        className="btn-gradient flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? (
                            <>
                                <Sparkles className="w-5 h-5 inline mr-2 animate-spin" />
                                Analyzing...
                            </>
                        ) : (
                            <>
                                <Sparkles className="w-5 h-5 inline mr-2" />
                                Optimize Route
                            </>
                        )}
                    </button>

                    {(textInput || imageFile) && !isLoading && (
                        <button
                            type="button"
                            onClick={handleClear}
                            className="px-6 py-3 rounded-xl font-semibold bg-background/50 hover:bg-background transition-all duration-200"
                        >
                            Clear
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
}
