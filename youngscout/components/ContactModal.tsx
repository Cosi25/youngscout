import React, { useState } from 'react';
import { Player } from '../types';

interface ContactModalProps {
    player: Player;
    onClose: () => void;
    onSendMessage: (message: string) => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ player, onClose, onSendMessage }) => {
    const [message, setMessage] = useState('');
    const [isSending, setIsSending] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (message.trim().length < 10) {
            setError('Mesajınız en az 10 karakter olmalıdır.');
            return;
        }
        
        setError('');
        setIsSending(true);

        // Mesaj gönderme işlemini simüle et
        setTimeout(() => {
            onSendMessage(message);
            setIsSending(false);
        }, 1000);
    };
    
    return (
        <div 
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in"
            onClick={onClose}
        >
            <div 
                className="bg-gray-900 rounded-xl shadow-2xl w-full max-w-lg border border-gray-700 transform animate-scale-in"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="p-6 sticky top-0 bg-gray-900 z-10 flex justify-between items-center border-b border-gray-800">
                    <div>
                         <h2 className="text-2xl font-bold text-white">İletişim Başlat</h2>
                         <p className="text-gray-400 text-sm">
                            <span className="font-semibold text-brand-primary">{player.name}</span> ile ilk teması kur.
                         </p>
                    </div>
                     <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors" aria-label="Kapat">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6">
                    <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">Mesajınız</label>
                        <textarea
                            id="message"
                            name="message"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            rows={6}
                            className="w-full bg-gray-800 border border-gray-700 rounded-md py-2 px-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-primary"
                            placeholder={`Merhaba ${player.name}, yeteneklerini inceledim ve...`}
                            required
                        />
                         <p className="text-xs text-gray-500 mt-2">
                           Lütfen profesyonel bir dil kullanın. Mesajınız platform güvenliği için incelenebilir.
                        </p>
                    </div>

                    {error && <p className="text-red-400 text-sm text-center mt-4">{error}</p>}
                    
                    <div className="mt-6 flex justify-end gap-4 border-t border-gray-800 pt-6">
                        <button 
                            type="button"
                            onClick={onClose}
                            disabled={isSending}
                            className="bg-gray-700 text-white font-bold py-2 px-6 rounded-lg transition-colors hover:bg-gray-600 disabled:opacity-50"
                        >
                            İptal
                        </button>
                        <button 
                            type="submit"
                            disabled={isSending}
                            className="bg-brand-primary text-white font-bold py-2 px-6 rounded-lg transition-all duration-300 hover:bg-green-500 disabled:bg-gray-600 disabled:cursor-not-allowed"
                        >
                            {isSending ? 'Gönderiliyor...' : 'Mesajı Gönder'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
