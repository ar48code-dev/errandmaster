import { Upload, X, FileVideo, Music, Image as ImageIcon, FileCheck, Mic, Square, Camera, Video, Circle } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

export default function MultimodalUpload({ onFilesSelect, selectedFiles }) {
    const [dragActive, setDragActive] = useState(false);
    const [error, setError] = useState(null);
    const [isRecording, setIsRecording] = useState(false);
    const [isCameraActive, setIsCameraActive] = useState(false);
    const videoRef = useRef(null);
    const mediaRecorderRef = useRef(null);
    const audioChunksRef = useRef([]);

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
        if (e.dataTransfer.files) {
            handleFiles(Array.from(e.dataTransfer.files));
        }
    };

    const handleChange = (e) => {
        if (e.target.files) {
            handleFiles(Array.from(e.target.files));
        }
    };

    const handleFiles = (files) => {
        setError(null);
        const validTypes = ['image/', 'audio/', 'video/'];
        const validFiles = files.filter(file => validTypes.some(type => file.type.startsWith(type)));

        if (validFiles.length < files.length) {
            setError("Some files were discarded. Please use Image, Audio, or Video.");
        }

        const oversizedFiles = validFiles.filter(file => file.size > 20 * 1024 * 1024);
        if (oversizedFiles.length > 0) {
            setError("Max file size is 20MB.");
            return;
        }

        onFilesSelect([...selectedFiles, ...validFiles]);
    };

    const removeFile = (index) => {
        const newFiles = [...selectedFiles];
        newFiles.splice(index, 1);
        onFilesSelect(newFiles);
    };

    // Camera Logic
    const startCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                setIsCameraActive(true);
            }
        } catch (err) {
            setError("Camera access denied.");
        }
    };

    const stopCamera = () => {
        if (videoRef.current && videoRef.current.srcObject) {
            const tracks = videoRef.current.srcObject.getTracks();
            tracks.forEach(track => track.stop());
            videoRef.current.srcObject = null;
            setIsCameraActive(false);
        }
    };

    const capturePhoto = () => {
        const video = videoRef.current;
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        canvas.getContext('2d').drawImage(video, 0, 0);
        canvas.toBlob((blob) => {
            const file = new File([blob], `captured-photo-${Date.now()}.jpg`, { type: 'image/jpeg' });
            handleFiles([file]);
            stopCamera();
        }, 'image/jpeg');
    };

    // Voice Recording Logic
    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaRecorderRef.current = new MediaRecorder(stream);
            audioChunksRef.current = [];
            mediaRecorderRef.current.ondataavailable = (e) => audioChunksRef.current.push(e.data);
            mediaRecorderRef.current.onstop = () => {
                const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
                const file = new File([audioBlob], `voice-memo-${Date.now()}.wav`, { type: 'audio/wav' });
                handleFiles([file]);
            };
            mediaRecorderRef.current.start();
            setIsRecording(true);
        } catch (err) {
            setError("Mic access denied.");
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && isRecording) {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
            mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
        }
    };

    const getFileIcon = (file) => {
        if (file.type.startsWith('image/')) return <ImageIcon className="w-8 h-8 text-primary" />;
        if (file.type.startsWith('audio/')) return <Music className="w-8 h-8 text-accent" />;
        if (file.type.startsWith('video/')) return <FileVideo className="w-8 h-8 text-primary" />;
        return <FileCheck className="w-8 h-8 text-success" />;
    };

    return (
        <div className="space-y-4">
            <div className="grid grid-cols-3 gap-3">
                <div
                    className={`upload-zone h-24 flex flex-col items-center justify-center border-2 border-dashed rounded-xl transition-all ${dragActive ? 'border-primary bg-primary/5' : 'border-border bg-card/30'}`}
                    onDragEnter={handleDrag} onDragOver={handleDrag} onDragLeave={handleLeave} onDrop={handleDrop}
                    onClick={() => document.getElementById('multimodal-upload').click()}
                >
                    <input id="multimodal-upload" type="file" multiple className="hidden" accept="image/*,audio/*,video/*" onChange={handleChange} />
                    <Upload className="w-6 h-6 text-primary mb-1" />
                    <span className="text-[10px] font-bold uppercase tracking-tighter">Files</span>
                </div>

                <button type="button" onClick={isRecording ? stopRecording : startRecording}
                    className={`flex flex-col items-center justify-center border-2 border-dashed rounded-xl transition-all ${isRecording ? 'border-red-500 bg-red-500/10 animate-pulse' : 'border-border bg-card/30 hover:border-accent/50'}`}
                >
                    {isRecording ? <Square className="w-6 h-6 text-red-500 mb-1" /> : <Mic className="w-6 h-6 text-accent mb-1" />}
                    <span className="text-[10px] font-bold uppercase tracking-tighter">{isRecording ? 'Stop' : 'Voice'}</span>
                </button>

                <button type="button" onClick={isCameraActive ? stopCamera : startCamera}
                    className="flex flex-col items-center justify-center border-2 border-dashed rounded-xl border-border bg-card/30 hover:border-primary/50"
                >
                    <Camera className="w-6 h-6 text-primary mb-1" />
                    <span className="text-[10px] font-bold uppercase tracking-tighter">{isCameraActive ? 'Close' : 'Camera'}</span>
                </button>
            </div>

            {isCameraActive && (
                <div className="relative rounded-xl overflow-hidden glass-card border-2 border-primary/30">
                    <video ref={videoRef} autoPlay playsInline className="w-full aspect-video object-cover" />
                    <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-4">
                        <button onClick={capturePhoto} className="p-4 bg-primary text-white rounded-full shadow-xl hover:scale-110 transition-transform">
                            <Circle className="w-8 h-8 fill-white" />
                        </button>
                    </div>
                </div>
            )}

            {selectedFiles.length > 0 && (
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 animate-fade-in">
                    {selectedFiles.map((file, index) => (
                        <div key={index} className="glass-card p-2 relative flex items-center gap-2 border border-border group">
                            <button onClick={() => removeFile(index)} className="absolute -top-1 -right-1 p-1 rounded-full bg-red-500 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                                <X className="w-3 h-3" />
                            </button>
                            <div className="flex-shrink-0">{getFileIcon(file)}</div>
                            <div className="flex-1 min-w-0">
                                <p className="font-bold truncate text-[10px] text-primary">{file.name}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {error && (
                <div className="p-2 rounded-lg bg-red-500/10 border border-red-500/30 text-[11px] text-red-400 font-bold animate-shake">
                    {error}
                </div>
            )}
        </div>
    );
}
