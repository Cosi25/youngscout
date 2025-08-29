import React, { useState, FormEvent } from 'react';
import { UserRole } from '../types';

interface AuthProps {
    onLogin: (role: UserRole) => void;
    onRegister: () => void;
}

const SoccerBallIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-brand-primary" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z" />
        <path d="M12 4.111c-1.258 0-2.433.393-3.414 1.085l-1.35-2.338C8.61.942 10.254 0 12 0s3.39.942 4.764 2.858l-1.35 2.338C14.433 4.504 13.258 4.111 12 4.111zM6.236 7.199l-2.338-1.35C2.942 8.61 2 10.254 2 12s.942 3.39 2.858 4.764l2.338-1.35C6.504 14.433 6.111 13.258 6.111 12s.393-2.433 1.125-3.414zM17.764 16.801l2.338 1.35C21.058 15.39 22 13.746 22 12s-.942-3.39-2.858-4.764l-2.338 1.35c.732.981 1.125 2.156 1.125 3.414s-.393 2.433-1.125 3.414z" />
        <path d="M12 7c-2.757 0-5 2.243-5 5s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5zm0 8c-1.654 0-3-1.346-3-3s1.346-3 3-3 3 1.346 3 3-1.346 3-3 3z" />
    </svg>
);

const AuthInput: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (props) => (
    <input
        {...props}
        className="w-full bg-gray-800 border border-gray-700 rounded-md py-3 px-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-primary"
    />
);

export const Auth: React.FC<AuthProps> = ({ onLogin, onRegister }) => {
    const [authMode, setAuthMode] = useState<'login' | 'register' | 'verify'>('login');
    const [selectedRole, setSelectedRole] = useState<UserRole>(UserRole.Talent);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        setTimeout(() => {
            if (authMode === 'login') {
                if (selectedRole === UserRole.Talent && email === 'talent@test.com' && password === 'password123') {
                    onLogin(UserRole.Talent);
                } else if (selectedRole === UserRole.Scout && email === 'scout@test.com' && password === 'password123') {
                    onLogin(UserRole.Scout);
                } else if (selectedRole === UserRole.Admin && email === 'admin@test.com' && password === 'password123') {
                    onLogin(UserRole.Admin);
                }
                else {
                    setError('Geçersiz e-posta veya şifre.');
                }
            } else if (authMode === 'register') {
                console.log(`Kayıt denemesi: ${email}`);
                setAuthMode('verify');
            } else if (authMode === 'verify') {
                if (verificationCode === '123456') {
                    onRegister();
                } else {
                    setError('Doğrulama kodu yanlış.');
                }
            }
            setIsLoading(false);
        }, 1000);
    };

    const RoleSelector = () => (
        <div className="grid grid-cols-2 gap-2 bg-gray-800 p-1 rounded-md mb-6">
            <button
                type="button"
                onClick={() => setSelectedRole(UserRole.Talent)}
                className={`w-full py-2 rounded text-sm font-semibold transition-colors ${selectedRole === UserRole.Talent ? 'bg-brand-primary text-white' : 'text-gray-400 hover:bg-gray-700'}`}
            >
                {UserRole.Talent}
            </button>
             <button
                type="button"
                onClick={() => setSelectedRole(UserRole.Scout)}
                className={`w-full py-2 rounded text-sm font-semibold transition-colors ${selectedRole === UserRole.Scout ? 'bg-brand-primary text-white' : 'text-gray-400 hover:bg-gray-700'}`}
            >
                {UserRole.Scout}
            </button>
        </div>
    );

    const renderFormContent = () => {
        if (authMode === 'verify') {
            return (
                <>
                    <h2 className="text-2xl font-semibold text-gray-100 mb-2">Hesabınızı Doğrulayın</h2>
                    <p className="text-gray-400 mb-6">Lütfen {email} adresine gönderilen 6 haneli kodu girin.</p>
                    <div className="space-y-4">
                        <AuthInput
                            type="text"
                            placeholder="Doğrulama Kodu"
                            value={verificationCode}
                            onChange={(e) => setVerificationCode(e.target.value)}
                            required
                            aria-label="Doğrulama Kodu"
                        />
                    </div>
                    <button type="submit" disabled={isLoading} className="w-full mt-6 bg-brand-primary text-white font-bold py-3 rounded-lg transition-colors hover:bg-green-500 disabled:bg-gray-600 disabled:cursor-not-allowed">
                        {isLoading ? 'Doğrulanıyor...' : 'Doğrula ve Devam Et'}
                    </button>
                </>
            );
        }

        return (
            <>
                <h2 className="text-2xl font-semibold text-gray-100 mb-6">
                    {authMode === 'login' ? 'Hoş Geldiniz!' : 'Yeni Hesap Oluştur'}
                </h2>
                {authMode === 'login' && <RoleSelector />}
                <div className="space-y-4">
                    <AuthInput type="email" placeholder="E-posta Adresi" value={email} onChange={(e) => setEmail(e.target.value)} required aria-label="E-posta Adresi" />
                    <AuthInput type="password" placeholder="Şifre" value={password} onChange={(e) => setPassword(e.target.value)} required aria-label="Şifre" />
                </div>
                <p className="text-xs text-gray-500 mt-4 text-center">
                    {authMode === 'login' && `Test: talent@, scout@ (şifre: password123)`}
                </p>
                <button type="submit" disabled={isLoading} className="w-full mt-6 bg-brand-primary text-white font-bold py-3 rounded-lg transition-colors hover:bg-green-500 disabled:bg-gray-600 disabled:cursor-not-allowed">
                    {isLoading ? (authMode === 'login' ? 'Giriş Yapılıyor...' : 'Kayıt Olunuyor...') : (authMode === 'login' ? 'Giriş Yap' : 'Kayıt Ol')}
                </button>
            </>
        );
    };

    const renderFooter = () => {
        if (authMode === 'login') {
            return (
                <p className="text-center text-gray-400">
                    Hesabınız yok mu?{' '}
                    <button onClick={() => setAuthMode('register')} className="font-semibold text-brand-primary hover:underline">
                        Kayıt Olun
                    </button>
                </p>
            );
        }
        if (authMode === 'register') {
            return (
                <p className="text-center text-gray-400">
                    Zaten bir hesabınız var mı?{' '}
                    <button onClick={() => setAuthMode('login')} className="font-semibold text-brand-primary hover:underline">
                        Giriş Yapın
                    </button>
                </p>
            );
        }
        return null;
    };

    return (
        <div className="min-h-screen bg-brand-dark text-brand-light font-sans flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <div className="flex justify-center items-center gap-3">
                        <SoccerBallIcon />
                        <h1 className="text-4xl font-bold text-white tracking-wider">
                            Young<span className="text-brand-primary">Scout</span>
                        </h1>
                    </div>
                     <p className="text-gray-400 mt-2">Geleceğin yıldızlarını keşfetmeye başlayın.</p>
                </div>

                <div className="bg-gray-900/50 backdrop-blur-lg border border-gray-700 rounded-xl shadow-2xl p-8">
                    <form onSubmit={handleSubmit}>
                        {renderFormContent()}
                        {error && (
                            <p className="text-red-400 text-sm text-center mt-4" role="alert">{error}</p>
                        )}
                    </form>
                    <div className="mt-6">
                        {renderFooter()}
                    </div>
                </div>
            </div>
        </div>
    );
};