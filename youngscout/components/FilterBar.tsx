import React from 'react';
import { Position } from '../types';

interface FilterBarProps {
  searchTerm: string;
  onSearchTermChange: (term: string) => void;
  positionFilter: Position | 'all';
  onPositionFilterChange: (position: Position | 'all') => void;
  ageRange: [number, number];
  onAgeRangeChange: (range: [number, number]) => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  searchTerm,
  onSearchTermChange,
  positionFilter,
  onPositionFilterChange,
  ageRange,
  onAgeRangeChange,
}) => {
  const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>, index: 0 | 1) => {
    const value = parseInt(e.target.value, 10);
    const newRange: [number, number] = [...ageRange];
    newRange[index] = value;
    // Minimum yaşın maksimum yaştan büyük olmasını engelle
    if (newRange[0] > newRange[1]) {
        if (index === 0) newRange[1] = newRange[0];
        else newRange[0] = newRange[1];
    }
    onAgeRangeChange(newRange);
  };
    
  return (
    <div className="bg-gray-900 p-4 rounded-lg mb-8 shadow-lg border border-gray-800 flex flex-col md:flex-row items-center gap-4">
      <div className="relative flex-grow w-full md:w-auto">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
        </svg>
        <input
          type="text"
          placeholder="İsme göre ara..."
          value={searchTerm}
          onChange={(e) => onSearchTermChange(e.target.value)}
          className="w-full bg-gray-800 border border-gray-700 rounded-md py-2 pl-10 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-brand-primary"
          aria-label="Oyuncu ismine göre ara"
        />
      </div>

      <select
        value={positionFilter}
        onChange={(e) => onPositionFilterChange(e.target.value as Position | 'all')}
        className="w-full md:w-auto bg-gray-800 border border-gray-700 rounded-md py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-brand-primary"
        aria-label="Pozisyona göre filtrele"
      >
        <option value="all">Tüm Pozisyonlar</option>
        {Object.values(Position).map((pos) => (
          <option key={pos} value={pos}>{pos}</option>
        ))}
      </select>

      <div className="flex items-center gap-4 w-full md:w-auto">
        <label id="age-range-label" className="text-gray-300 whitespace-nowrap">Yaş: {ageRange[0]} - {ageRange[1]}</label>
        <div className="flex flex-col flex-grow" role="group" aria-labelledby="age-range-label">
             <label htmlFor="min-age-slider" className="sr-only">Minimum Yaş</label>
             <input
                id="min-age-slider"
                type="range"
                min="6"
                max="17"
                value={ageRange[0]}
                onChange={(e) => handleAgeChange(e, 0)}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-brand-primary"
                aria-valuemin={6}
                aria-valuemax={17}
                aria-valuenow={ageRange[0]}
                aria-label="Minimum yaş"
              />
              <label htmlFor="max-age-slider" className="sr-only">Maksimum Yaş</label>
              <input
                id="max-age-slider"
                type="range"
                min="6"
                max="17"
                value={ageRange[1]}
                onChange={(e) => handleAgeChange(e, 1)}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-brand-primary"
                aria-valuemin={6}
                aria-valuemax={17}
                aria-valuenow={ageRange[1]}
                aria-label="Maksimum yaş"
              />
        </div>
      </div>
    </div>
  );
};