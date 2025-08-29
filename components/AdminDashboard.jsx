import React from 'react';

const SuspendIcon = ({ className = "h-5 w-5" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
    </svg>
);


const TrashIcon = ({ className = "h-5 w-5" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
    </svg>
);


export const AdminDashboard = ({ players, onSuspendPlayer, onDeletePlayer }) => {
    return (
        <div className="bg-gray-900 p-4 sm:p-6 rounded-lg shadow-lg border border-gray-800">
            <h2 className="text-2xl font-bold text-white mb-4">Oyuncu Yönetimi</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-700">
                    <thead className="bg-gray-800">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Oyuncu</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Yaş</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Ülke</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Durum</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Eylemler</th>
                        </tr>
                    </thead>
                    <tbody className="bg-gray-900 divide-y divide-gray-800">
                        {players.map((player) => (
                            <tr key={player.id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0 h-10 w-10">
                                            <img className="h-10 w-10 rounded-full object-cover" src={player.profileImageUrl} alt={player.name} />
                                        </div>
                                        <div className="ml-4">
                                            <div className="text-sm font-medium text-white">{player.name}</div>
                                            <div className="text-sm text-gray-400">{player.position}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{player.age}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <img src={`https://flagcdn.com/w20/${player.countryCode}.png`} alt={player.country} className="w-5 h-auto rounded-sm mr-2"/>
                                        <span className="text-sm text-gray-300">{player.country}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                        player.status === 'active' ? 'bg-green-800/50 text-green-300' : 'bg-yellow-800/50 text-yellow-300'
                                    }`}>
                                        {player.status === 'active' ? 'Aktif' : 'Askıda'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <div className="flex items-center gap-4">
                                        <button 
                                            onClick={() => onSuspendPlayer(player.id)}
                                            className={`flex items-center gap-1 text-sm ${player.status === 'active' ? 'text-yellow-400 hover:text-yellow-300' : 'text-green-400 hover:text-green-300'} transition-colors`}
                                            aria-label={player.status === 'active' ? `${player.name} profilini askıya al` : `${player.name} profilini aktifleştir`}
                                        >
                                           <SuspendIcon className="h-4 w-4" />
                                            {player.status === 'active' ? 'Askıya Al' : 'Aktifleştir'}
                                        </button>
                                        <button
                                            onClick={() => onDeletePlayer(player.id)} 
                                            className="flex items-center gap-1 text-sm text-red-500 hover:text-red-400 transition-colors"
                                            aria-label={`${player.name} profilini sil`}
                                        >
                                           <TrashIcon className="h-4 w-4"/>
                                           Sil
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                 {players.length === 0 && (
                    <div className="text-center py-10">
                        <p className="text-gray-400">Yönetilecek oyuncu profili bulunamadı.</p>
                    </div>
                )}
            </div>
        </div>
    );
};