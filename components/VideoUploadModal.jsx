import React, { useState, useCallback, useEffect } from 'react';

// --- Simülasyon Fonksiyonları ---

// Gerçek bir uygulamada, bu fonksiyon sunucunuza bir API isteği gönderir.
// Sunucu da S3 gibi bir depolama servisinden güvenli bir yükleme URL'si alır ve geri döner.
// FIX: Pass playerId as an argument to resolve scope issue, as `player` is not available in this standalone function.
const getPresignedUrl = async (file, playerId) => {
    console.log(`'${file.name}' için önceden imzalanmış URL isteniyor...`);
    await new Promise(resolve => setTimeout(resolve, 500)); // Ağ gecikmesini simüle et
    const mockUploadUrl = `https://s3.mock.upload.com/uploads/${playerId}/${file.name}?signature=mock_signature`;
    const mockVideoUrl = `https://s3.mock.cdn.com/uploads/${playerId}/${file.name}`;
    console.log('Önceden imzalanmış URL alındı:', mockUploadUrl);
    return { uploadUrl: mockUploadUrl, videoUrl: mockVideoUrl };
};

// Bu fonksiyon, dosyayı alınan önceden imzalanmış URL'ye yükler.
const uploadFile = (url, file, onProgress) => {
    return new Promise((resolve, reject) => {
        console.log(`'${file.name}' dosyası şu adrese yükleniyor: ${url}`);
        // Yükleme hatasını simüle etme olasılığı
        if (file.name.includes('fail')) {
            setTimeout(() => reject(new Error('Simulated upload failure.')), 1000);
            return;
        }

        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 10;
            if (progress > 100) {
                progress = 100;
            }
            onProgress(Math.round(progress));
            if (progress === 100) {
                clearInterval(interval);
                console.log('Yükleme tamamlandı.');
                resolve();
            }
        }, 200); // Yükleme ilerlemesini simüle et
    });
};


export const VideoUploadModal = ({ player, onClose, onUploadComplete }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadStatus, setUploadStatus] = useState('idle');
    const [uploadProgress, setUploadProgress] = useState(0);
    const [error, setError] = useState(null);
    const [isDragOver, setIsDragOver] = useState(false);

    useEffect(() => {
        // Yükleme başarılı olduğunda, kullanıcıya mesajı göstermek için kısa bir gecikmeden sonra modalı kapat.
        if (uploadStatus === 'success') {
            const timer = setTimeout(() => {
                onClose();
            }, 1500);
            return () => clearTimeout(timer);
        }
    }, [uploadStatus, onClose]);

    const handleFileSelect = (files) => {
        if (files && files[0]) {
            if (files[0].type.startsWith('video/')) {
                setSelectedFile(files[0]);
                setError(null);
                setUploadStatus('idle'); // Yeni dosya seçildiğinde durumu sıfırla
                setUploadProgress(0);
            } else {
                setError('Lütfen geçerli bir video dosyası seçin.');
            }
        }
    };

    const handleUpload = async () => {
        if (!selectedFile) return;

        setUploadStatus('uploading');
        setUploadProgress(0);
        setError(null);

        try {
            // Adım 1: Sunucudan güvenli yükleme URL'sini al (simülasyon)
            const { uploadUrl, videoUrl } = await getPresignedUrl(selectedFile, player.id);
            
            // Adım 2: Dosyayı o URL'ye yükle (simülasyon)
            await uploadFile(uploadUrl, selectedFile, setUploadProgress);
            
            // Adım 3: Yükleme tamamlandığında durumu güncelle ve üst bileşeni bilgilendir
            setUploadStatus('success');
            onUploadComplete(videoUrl);

        } catch (err) {
            setError('Video yüklenirken bir hata oluştu. Lütfen tekrar deneyin.');
            setUploadStatus('error');
            console.error(err);
        }
    };

    const onDragOver = useCallback((e) => {
        e.preventDefault();
        setIsDragOver(true);
    }, []);
    
    const onDragLeave = useCallback((e) => {
        e.preventDefault();
        setIsDragOver(false);
    }, []);

    const onDrop = useCallback((e) => {
        e.preventDefault();
        setIsDragOver(false);
        handleFileSelect(e.dataTransfer.files);
    }, []);

    const renderProgressBar = () => {
        if (uploadStatus === 'idle') return null;

        let barColor = 'bg-brand-primary';
        let statusText = `Yükleniyor... ${uploadProgress}%`;

        if (uploadStatus === 'success') {
            barColor = 'bg-green-500';
            statusText = 'Yükleme Başarılı!';
        } else if (uploadStatus === 'error') {
            barColor = 'bg-red-600';
            statusText = 'Yükleme Başarısız Oldu';
        }

        // Başarı durumunda çubuğun tam dolu görünmesini sağla
        const progress = uploadStatus === 'success' ? 100 : uploadProgress;

        return (
             <div className="mt-6">
                <p className="text-center text-white mb-2">{statusText}</p>
                <div className="w-full bg-gray-700 rounded-full h-2.5">
                    <div className={`${barColor} h-2.5 rounded-full transition-all duration-300`} style={{ width: `${progress}%` }}></div>
                </div>
            </div>
        );
    };

    const isUploading = uploadStatus === 'uploading';

    return (
        <div 
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in"
            onClick={!isUploading ? onClose : undefined}
        >
            <div 
                className="bg-gray-900 rounded-xl shadow-2xl w-full max-w-lg border border-gray-700 transform animate-scale-in p-8"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h2 className="text-2xl font-bold text-white">Video Yükle</h2>
                        <p className="text-gray-400">{player.name} için yeni bir video yükleyin.</p>
                    </div>
                     <button onClick={onClose} disabled={isUploading} className="text-gray-400 hover:text-white transition-colors disabled:opacity-50">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                
                {!selectedFile ? (
                    <div 
                        onDragOver={onDragOver}
                        onDragLeave={onDragLeave}
                        onDrop={onDrop}
                        className={`relative border-2 border-dashed ${isDragOver ? 'border-brand-primary bg-gray-800/50' : 'border-gray-600'} rounded-lg p-10 text-center cursor-pointer transition-colors`}
                    >
                        <input
                            type="file"
                            accept="video/*"
                            onChange={(e) => handleFileSelect(e.target.files)}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                        <p className="text-gray-300">Video dosyasını buraya sürükleyin</p>
                        <p className="text-gray-500 text-sm my-2">veya</p>
                        <p className="text-brand-primary font-semibold">Dosya Seç</p>
                    </div>
                ) : (
                    <div className="bg-gray-800 p-4 rounded-lg text-center">
                        <p className="font-semibold text-white truncate">{selectedFile.name}</p>
                        <p className="text-sm text-gray-400">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                )}

                {error && uploadStatus === 'error' && (
                    <div className="bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-lg relative mt-4 text-sm flex items-center" role="alert">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        <span>{error}</span>
                    </div>
                )}

                {renderProgressBar()}
               
                <div className="mt-8 flex justify-end gap-4">
                    <button 
                        onClick={onClose}
                        disabled={isUploading}
                        className="bg-gray-700 text-white font-bold py-2 px-6 rounded-lg transition-colors hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        İptal
                    </button>
                    <button 
                        onClick={handleUpload}
                        disabled={!selectedFile || isUploading || uploadStatus === 'success'}
                        className="bg-brand-primary text-white font-bold py-2 px-6 rounded-lg transition-all duration-300 disabled:bg-gray-600 disabled:cursor-not-allowed hover:bg-green-500"
                    >
                        {isUploading ? 'Yükleniyor...' : (uploadStatus === 'error' ? 'Tekrar Yükle' : 'Yükle')}
                    </button>
                </div>
            </div>
        </div>
    );
};