import React from 'react';

const PlayIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-white/80" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
    </svg>
)

export const PlayerCard = ({ player, onSelectPlayer }) => {
  return (
    <div
      className="bg-gray-900 rounded-lg overflow-hidden shadow-lg border border-gray-800 cursor-pointer group transform hover:-translate-y-2 transition-transform duration-300 ease-in-out"
      onClick={() => onSelectPlayer(player)}
    >
      <div className="relative">
        <img src={player.profileImageUrl} alt={player.name} className="w-full h-80 object-cover" />
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors duration-300 flex items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 transform group-hover:scale-110 transition-all duration-300">
                <PlayIcon />
            </div>
        </div>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start">
            <div>
                 <h3 className="text-xl font-bold text-white">{player.name}</h3>
                 <p className="text-brand-primary font-semibold">{player.position}</p>
            </div>
             <div className="flex items-center gap-2">
                 <img src={`https://flagcdn.com/w20/${player.countryCode}.png`} alt={player.country} className="w-5 h-auto rounded-sm"/>
                <p className="text-gray-300 text-lg font-bold">{player.age}</p>
            </div>
        </div>
      </div>
    </div>
  );
};