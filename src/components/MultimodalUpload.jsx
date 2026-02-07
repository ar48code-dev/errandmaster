import { Upload, X, FileVideo, Music, Image as ImageIcon, FileCheck } from 'lucide-react';
import { useState } from 'react';

export default function MultimodalUpload({ onFileSelect, selectedFile }) {
    const [dragActive, setDragActive] = useState(false);
    const [error, setError] = useState(null);

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(true);
    };

    const handleLeave = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files[0]);
        }
    };

    const handleChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0]);
        }
    };

    const handleFile = (file) => {
        setError(null);
        const validTypes = [
            'image/jpeg', 'image/png', 'image/webp',
            'audio/mpeg', 'audio/wav', 'audio/mp4', 'audio/x-m4a',
            'video/mp4', 'video/quicktime', 'video/webm'
        ];

        if (!validTypes.some(type => file.type.includes(type.split('/')[0]))) {
            setError(`Unsupported file type: ${file.type}. Please use images, audio, or video.`);
            return;
        }

        if (file.size > 20 * 1024 * 1024) { // 20MB limit for multimodal
            setError("File is too large (Max 20MB).");
            return;
        }

        onFileSelect(file);
    };

    const getFileIcon = () => {
        if (!selectedFile) return <Upload className="w-12 h-12 text-primary" />;
        if (selectedFile.type.startsWith('image/')) return <ImageIcon className="w-10 h-10 text-primary" />;
        if (selectedFile.type.startsWith('audio/')) return <Music className="w-10 h-10 text-accent" />;
        if (selectedFile.type.startsWith('video/')) return <FileVideo className="w-10 h-10 text-primary" />;
        return <FileCheck className="w-10 h-10 text-success" />;
    };

    return (
        <div className="space-y-4">
            {!selectedFile ? (
                <div
                    className={`upload-zone h-48 flex flex-col items-center justify-center border-2 border-dashed rounded-2xl transition-all duration-300 ${dragActive ? 'border-primary bg-primary/5 scale-[1.02]' : 'border-border bg-card/30 hover:border-primary/50'
                        }`}
                    onDragEnter={handleDrag}
                    onDragOver={handleDrag}
                    onDragLeave={handleLeave}
                    onDrop={handleDrop}
                    onClick={() => document.getElementById('multimodal-upload').click()}
                >
                    <input
                        id="multimodal-upload"
                        type="file"
                        className="hidden"
                        accept="image/*,audio/*,video/*"
                        onChange={handleChange}
                    />
                    {getFileIcon()}
                    <p className="mt-4 font-semibold text-center px-4">
                        Drop your multimodal input here
                    </p>
                    <p className="text-xs text-text-muted mt-1 uppercase tracking-wider">
                        Image • Audio (Voice) • Video Scan
                    </p>
                </div>
            ) : (
                <div className="glass-card p-4 relative flex items-center gap-4 animate-fade-in">
                    <button
                        onClick={() => onFileSelect(null)}
                        className="absolute -top-2 -right-2 p-1.5 rounded-full bg-red-500 text-white shadow-lg hover:scale-110 transition-transform z-10"
                    >
                        <X className="w-4 h-4" />
                    </button>

                    <div className="w-16 h-16 rounded-xl bg-card flex items-center justify-center border border-border">
                        {getFileIcon()}
                    </div>

                    <div className="flex-1 min-w-0">
                        <p className="font-bold truncate text-primary">{selectedFile.name}</p>
                        <p className="text-xs text-text-muted uppercase font-mono">
                            {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB • {selectedFile.type}
                        </p>
                    </div>
                </div>
            )}

            {error && (
                <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 animate-shake">
                    <p className="text-sm text-red-400 font-medium">{error}</p>
                </div>
            )}
        </div>
    );
}
