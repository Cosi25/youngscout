
import React from 'react';
import { PlayerCard } from './PlayerCard';
import { Player } from '../types';

interface PlayerListProps {
  players: Player[];
  onSelectPlayer: (player: Player) => void;
}

export const PlayerList: React.FC<PlayerListProps> = ({ players, onSelectPlayer }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {players.map(player => (
        <PlayerCard key={player.id} player={player} onSelectPlayer={onSelectPlayer} />
      ))}
    </div>
  );
};
