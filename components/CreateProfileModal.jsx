import React, { useState } from 'react';
import { Position } from '../types.js';

const FormInput = ({ label, ...props }) => (
    <div>
        <label htmlFor={props.id} className="block text-sm font-medium text-gray-300 mb-1">{label}</label>
        <input
            {...props}
            className="w-full bg-gray-800 border border-gray-700 rounded-md py-2 px-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-primary"
        />
    </div>
);

const FormSelect = ({ label, children, ...props }) => (
     <div>
        <label htmlFor={props.id} className="block text-sm font-medium text-gray-300 mb-1">{label}</label>
        <select
             {...props}
            className="w-full bg-gray-800 border border-gray-700 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-brand-primary"
        >
            {children}
        </select>
    </div>
);


export const CreateProfileModal = ({ onClose, onCreatePlayer }) => {
    const [profileData, setProfileData] = useState({
        name: '',
        age: 10,
        position: Position.Midfielder,
        height: 140,
        weight: 40,
        bio: '',
        country: '',
        countryCode: ''
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfileData(prev => ({
            ...prev,
            [name]: name === 'age' || name === 'height' || name === 'weight' ? parseInt(value, 10) : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!profileData.name.trim() || !profileData.country.trim() || !profileData.countryCode.trim()) {
            setError('Lütfen tüm zorunlu alanları doldurun.');
            return;
        }
        setError('');
        onCreatePlayer(profileData);
    };

    return (
        <div 
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in"
            onClick={onClose}
        >
            <div 
                className="bg-gray-900 rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-gray-700 transform animate-scale-in"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="p-6 sticky top-0 bg-gray-900 z-10 flex justify-between items-center border-b border-gray-800">
                    <div>
                         <h2 className="text-2xl font-bold text-white">Yeni Oyuncu Profili Oluştur</h2>
                         <p className="text-gray-400 text-sm">Çocuğunuzun yetenek profilini oluşturun.</p>
                    </div>
                     <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors" aria-label="Kapat">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                
                <form onSubmit={handleSubmit} className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormInput
                            id="name"
                            name="name"
                            label="Tam Adı Soyadı"
                            type="text"
                            value={profileData.name}
                            onChange={handleChange}
                            required
                            placeholder="Örn: Arda Güler"
                        />
                        <FormSelect
                            id="position"
                            name="position"
                            label="Mevki"
                            value={profileData.position}
                            onChange={handleChange}
                        >
                            {Object.values(Position).map(pos => (
                                <option key={pos} value={pos}>{pos}</option>
                            ))}
                        </FormSelect>
                        <FormInput
                            id="age"
                            name="age"
                            label="Yaş"
                            type="number"
                            value={profileData.age}
                            onChange={handleChange}
                            min="6"
                            max="17"
                        />
                         <FormInput
                            id="height"
                            name="height"
                            label="Boy (cm)"
                            type="number"
                            value={profileData.height}
                            onChange={handleChange}
                            min="100"
                            max="220"
                        />
                         <FormInput
                            id="weight"
                            name="weight"
                            label="Kilo (kg)"
                            type="number"
                            value={profileData.weight}
                            onChange={handleChange}
                            min="20"
                            max="120"
                        />
                        <div className="md:col-span-2 grid grid-cols-2 gap-6">
                            <FormInput
                                id="country"
                                name="country"
                                label="Ülke"
                                type="text"
                                value={profileData.country}
                                onChange={handleChange}
                                required
                                placeholder="Örn: Türkiye"
                            />
                            <FormInput
                                id="countryCode"
                                name="countryCode"
                                label="Ülke Kodu (2 Harf)"
                                type="text"
                                value={profileData.countryCode}
                                onChange={handleChange}
                                required
                                maxLength={2}
                                placeholder="Örn: tr"
                            />
                        </div>
                        <div className="md:col-span-2">
                             <label htmlFor="bio" className="block text-sm font-medium text-gray-300 mb-1">Biyografi</label>
                             <textarea
                                id="bio"
                                name="bio"
                                value={profileData.bio}
                                onChange={handleChange}
                                rows={4}
                                className="w-full bg-gray-800 border border-gray-700 rounded-md py-2 px-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-primary"
                                placeholder="Çocuğunuzun yetenekleri, oyun stili ve hedefleri hakkında kısa bir açıklama yazın."
                            />
                        </div>
                    </div>

                    {error && <p className="text-red-400 text-sm text-center mt-4">{error}</p>}
                    
                    <div className="mt-8 flex justify-end gap-4 border-t border-gray-800 pt-6">
                        <button 
                            type="button"
                            onClick={onClose}
                            className="bg-gray-700 text-white font-bold py-2 px-6 rounded-lg transition-colors hover:bg-gray-600"
                        >
                            İptal
                        </button>
                        <button 
                            type="submit"
                            className="bg-brand-primary text-white font-bold py-2 px-6 rounded-lg transition-all duration-300 hover:bg-green-500"
                        >
                            Profili Oluştur
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};