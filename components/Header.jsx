import React from 'react';
import { UserRole } from '../types.js';

const SoccerBallIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-brand-primary" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z" />
        <path d="M12 4.111c-1.258 0-2.433.393-3.414 1.085l-1.35-2.338C8.61.942 10.254 0 12 0s3.39.942 4.764 2.858l-1.35 2.338C14.433 4.504 13.258 4.111 12 4.111zM6.236 7.199l-2.338-1.35C2.942 8.61 2 10.254 2 12s.942 3.39 2.858 4.764l2.338-1.35C6.504 14.433 6.111 13.258 6.111 12s.393-2.433 1.125-3.414zM17.764 16.801l2.338 1.35C21.058 15.39 22 13.746 22 12s-.942-3.39-2.858-4.764l-2.338 1.35c.732.981 1.125 2.156 1.125 3.414s-.393 2.433-1.125 3.414z" />
        <path d="M12 7c-2.757 0-5 2.243-5 5s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5zm0 8c-1.654 0-3-1.346-3-3s1.346-3 3-3 3 1.346 3 3-1.346 3-3 3z" />
    </svg>
);

const PlusIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
    </svg>
);

const BellIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
    </svg>
);

export const Header = ({ isAuthenticated, onLogout, userRole, onOpenCreateProfileModal, notificationsCount, onShowNotifications }) => {
  
    const renderAuthenticatedControls = () => {
        return (
            <div className="flex items-center gap-4">
                {userRole === UserRole.Talent && (
                    <>
                        <button
                            onClick={onOpenCreateProfileModal}
                            className="hidden sm:inline-flex items-center bg-brand-primary hover:bg-green-500 text-white font-semibold py-2 px-4 rounded-lg transition-colors text-sm"
                        >
                            <PlusIcon className="h-5 w-5 mr-1" />
                            Profil Oluştur
                        </button>
                        <button onClick={onShowNotifications} className="relative text-gray-400 hover:text-white transition-colors">
                            <BellIcon className="h-6 w-6" />
                            {notificationsCount > 0 && (
                                <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                                    {notificationsCount}
                                </span>
                            )}
                        </button>
                    </>
                )}
                 {userRole === UserRole.Admin && (
                    <span className="font-semibold text-brand-accent text-sm bg-yellow-900/50 px-3 py-1 rounded-md border border-yellow-700">
                        Admin Paneli
                    </span>
                 )}
                <button
                    onClick={onLogout}
                    className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors text-sm"
                >
                    Çıkış Yap
                </button>
            </div>
        );
    };

    return (
        <header className="bg-gray-900/50 backdrop-blur-sm sticky top-0 z-50 border-b border-gray-800">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                <div className="flex items-center space-x-3">
                    <SoccerBallIcon />
                    <h1 className="text-2xl font-bold text-white tracking-wider">
                        Young<span className="text-brand-primary">Scout</span>
                    </h1>
                </div>
                {isAuthenticated && renderAuthenticatedControls()}
            </div>
        </header>
    );
};