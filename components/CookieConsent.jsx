import React from 'react';

export const CookieConsent = ({ onAccept, onDecline }) => {
    return (
        <div className="fixed bottom-0 left-0 right-0 bg-gray-900/80 backdrop-blur-md border-t border-gray-700 z-50 animate-slide-up">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-sm text-gray-300 text-center sm:text-left">
                        Sitemiz, kullanıcı deneyiminizi geliştirmek için çerezleri kullanır. 
                        Daha fazla bilgi için <a href="/PRIVACY_POLICY.md" target="_blank" rel="noopener noreferrer" className="font-semibold text-brand-primary hover:underline">Gizlilik Politikamızı</a> inceleyebilirsiniz.
                    </p>
                    <div className="flex-shrink-0 flex gap-3">
                        <button
                            onClick={onDecline}
                            className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors text-sm"
                        >
                            Reddet
                        </button>
                        <button
                            onClick={onAccept}
                            className="bg-brand-primary hover:bg-green-500 text-white font-bold py-2 px-5 rounded-lg transition-colors text-sm"
                        >
                            Kabul Et
                        </button>
                    </div>
                </div>
            </div>
            <style>{\`
                @keyframes slide-up {
                    from { transform: translateY(100%); }
                    to { transform: translateY(0); }
                }
                .animate-slide-up {
                    animation: slide-up 0.5s ease-out forwards;
                }
            \`}</style>
        </div>
    );
};