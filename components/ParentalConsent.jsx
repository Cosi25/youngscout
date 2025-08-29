import React, { useState } from 'react';

const CheckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
    </svg>
);

const PolicySection = ({ title, children }) => (
    <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-200 mb-2">{title}</h3>
        <div className="prose prose-sm prose-invert max-h-32 overflow-y-auto rounded-md border border-gray-700 bg-gray-900 p-3 text-gray-400">
            {children}
        </div>
    </div>
);

export const ParentalConsent = ({ onConsent }) => {
    const [termsAgreed, setTermsAgreed] = useState(false);
    const [privacyAgreed, setPrivacyAgreed] = useState(false);
    const [mediaAgreed, setMediaAgreed] = useState(false);

    const canProceed = termsAgreed && privacyAgreed && mediaAgreed;

    return (
        <div className="min-h-screen bg-brand-dark text-brand-light font-sans flex items-center justify-center p-4">
            <div className="w-full max-w-2xl bg-gray-900/50 backdrop-blur-lg border border-gray-700 rounded-xl shadow-2xl p-8">
                <div className="text-center mb-6">
                     <h1 className="text-3xl font-bold text-white tracking-wider">
                        Young<span className="text-brand-primary">Scout</span>
                    </h1>
                    <h2 className="text-xl font-semibold text-gray-200 mt-2">Veli İzni ve Sözleşmesi</h2>
                    <p className="text-gray-400 mt-1">Çocuğunuzun güvenliğini ve gizliliğini korumak için lütfen şartlarımızı inceleyip kabul edin.</p>
                </div>

                <div>
                    <PolicySection title="Hizmet Şartları">
                        <p>Kendiniz ve çocuğunuz hakkında doğru bilgi vermeyi kabul edersiniz. Bu platformun futbol yeteneklerini sergilemek için olduğunu ve uygunsuz içerik yüklemeyeceğinizi anlarsınız. Bu şartların ihlali, hesabın feshedilmesine neden olabilir.</p>
                    </PolicySection>
                    
                    <PolicySection title="Gizlilik Politikası ve Veri Kullanımı">
                        <p>Hizmetimizi çalıştırmak için isim, yaş ve videolar gibi verileri topluyoruz. Bu veriler, keşif amacıyla yalnızca doğrulanmış gözlemciler ve kulüplerle paylaşılır. GDPR, KVKK ve COPPA ile uyumluyuz. İstediğiniz zaman veri silme talebinde bulunma hakkına sahipsiniz.</p>
                    </PolicySection>

                    <PolicySection title="Medya Yayın İzni">
                        <p>Video ve resim ('Medya') yükleyerek, YoungScout'a bu Medyayı yetenek keşfi amacıyla platformda sergilemesi için münhasır olmayan, telifsiz bir lisans verirsiniz. Bu Medyaya yalnızca doğrulanmış kullanıcılar erişebilir. Tüm Medyanın mülkiyeti sizde kalır.</p>
                    </PolicySection>
                </div>
                
                <div className="space-y-3 my-6">
                    <label className="flex items-center text-gray-300 cursor-pointer">
                        <input type="checkbox" checked={termsAgreed} onChange={() => setTermsAgreed(!termsAgreed)} className="hidden" />
                        <div className={`w-5 h-5 mr-3 flex-shrink-0 rounded border-2 ${termsAgreed ? 'bg-brand-primary border-brand-primary' : 'border-gray-600'} flex items-center justify-center`}>
                            {termsAgreed && <CheckIcon />}
                        </div>
                        Hizmet Şartları'nı okudum ve kabul ediyorum.
                    </label>
                    <label className="flex items-center text-gray-300 cursor-pointer">
                        <input type="checkbox" checked={privacyAgreed} onChange={() => setPrivacyAgreed(!privacyAgreed)} className="hidden" />
                        <div className={`w-5 h-5 mr-3 flex-shrink-0 rounded border-2 ${privacyAgreed ? 'bg-brand-primary border-brand-primary' : 'border-gray-600'} flex items-center justify-center`}>
                            {privacyAgreed && <CheckIcon />}
                        </div>
                        Gizlilik Politikası ve Veri Kullanımı şartlarını anlıyorum ve kabul ediyorum.
                    </label>
                     <label className="flex items-center text-gray-300 cursor-pointer">
                        <input type="checkbox" checked={mediaAgreed} onChange={() => setMediaAgreed(!mediaAgreed)} className="hidden" />
                        <div className={`w-5 h-5 mr-3 flex-shrink-0 rounded border-2 ${mediaAgreed ? 'bg-brand-primary border-brand-primary' : 'border-gray-600'} flex items-center justify-center`}>
                            {mediaAgreed && <CheckIcon />}
                        </div>
                        Yüklediğim içerik için Medya Yayın İzni şartlarını kabul ediyorum.
                    </label>
                </div>

                <button 
                    onClick={onConsent}
                    disabled={!canProceed}
                    className="w-full bg-brand-primary text-white font-bold py-3 rounded-lg transition-all duration-300 disabled:bg-gray-600 disabled:cursor-not-allowed hover:bg-green-500"
                >
                    Kabul Et ve Devam Et
                </button>
                <p className="text-xs text-gray-500 text-center mt-4">
                    "Kabul Et ve Devam Et" düğmesine tıklayarak, profili oluşturulacak çocuğun yasal ebeveyni veya vasisi olduğunuzu onaylarsınız.
                </p>
            </div>
             <style>{\`
                .prose-sm p { margin-bottom: 0.5rem; }
             \`}</style>
        </div>
    );
}