import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { useState } from 'react';
import { validateImageFile } from '../utils/validators';

export default function ImageUpload({ onImageSelect, selectedImage }) {
    const [dragActive, setDragActive] = useState(false);
    const [error, setError] = useState(null);

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true);
        } else if (e.type === 'dragleave') {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        setError(null);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files[0]);
        }
    };

    const handleChange = (e) => {
        e.preventDefault();
        setError(null);

        if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0]);
        }
    };

    const handleFile = (file) => {
        const validation = validateImageFile(file);

        if (!validation.valid) {
            setError(validation.error);
            return;
        }

        onImageSelect(file);
    };

    const handleRemove = () => {
        onImageSelect(null);
        setError(null);
    };

    return (
        <div className="space-y-4">
            {!selectedImage ? (
                <div
                    className={`upload-zone ${dragActive ? 'dragover' : ''}`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                    onClick={() => document.getElementById('file-upload').click()}
                >
                    <input
                        id="file-upload"
                        type="file"
                        className="hidden"
                        accept="image/jpeg,image/png,image/jpg,image/webp"
                        onChange={handleChange}
                    />

                    <Upload className="w-12 h-12 mx-auto mb-4 text-primary" />
                    <p className="text-lg font-semibold mb-2">
                        Drop an image here or click to upload
                    </p>
                    <p className="text-sm text-text-muted">
                        Photos of receipts, handwritten lists, or store names
                    </p>
                    <p className="text-xs text-text-muted mt-2">
                        JPEG, PNG, WebP • Max 4MB
                    </p>
                </div>
            ) : (
                <div className="glass-card p-4 relative">
                    <button
                        onClick={handleRemove}
                        className="absolute top-2 right-2 p-2 rounded-full bg-background/80 hover:bg-background transition-all duration-200 z-10"
                        aria-label="Remove image"
                    >
                        <X className="w-5 h-5 text-text" />
                    </button>

                    <div className="flex items-start gap-4">
                        <ImageIcon className="w-10 h-10 text-primary flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                            <p className="font-semibold truncate">{selectedImage.name}</p>
                            <p className="text-sm text-text-muted">
                                {(selectedImage.size / 1024).toFixed(1)} KB
                            </p>
                        </div>
                    </div>

                    {selectedImage.type.startsWith('image/') && (
                        <div className="mt-4 rounded-lg overflow-hidden">
                            <img
                                src={URL.createObjectURL(selectedImage)}
                                alt="Upload preview"
                                className="w-full h-auto max-h-64 object-contain bg-background/50"
                            />
                        </div>
                    )}
                </div>
            )}

            {error && (
                <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30">
                    <p className="text-sm text-red-400">{error}</p>
                </div>
            )}
        </div>
    );
}
