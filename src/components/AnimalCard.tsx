import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Animal {
  id: number;
  name: string;
  emoji: string;
  speed: number;
  wins: number;
  quirk: string;
}

interface AnimalCardProps {
  animal: Animal;
  isSelected: boolean;
  onClick: () => void;
  disabled: boolean;
  isWinner?: boolean;
}

export const AnimalCard: React.FC<AnimalCardProps> = ({ 
  animal, 
  isSelected, 
  onClick, 
  disabled,
  isWinner = false
}) => {
  return (
    <Card
      className={`
        race-card p-4 cursor-pointer transition-all duration-300
        ${isSelected ? 'ring-2 ring-primary gold-glow' : 'hover:border-primary/50'}
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        ${isWinner ? 'bg-gradient-to-br from-yellow-400/20 to-orange-500/20 ring-2 ring-yellow-400' : ''}
      `}
      onClick={onClick}
    >
      {/* Winner Crown */}
      {isWinner && (
        <div className="absolute -top-2 -right-2 text-2xl">
          👑
        </div>
      )}

      <div className="text-center space-y-2 relative z-10">
        <div className="text-5xl">
          {animal.emoji}
        </div>
        <h3 className="font-bold text-sm text-foreground">{animal.name}</h3>
        <p className="text-xs text-muted-foreground italic">"{animal.quirk}"</p>
        <div className="flex justify-between items-center text-xs gap-1">
          <Badge variant="secondary" className="text-xs px-2 py-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20">
            ⚡ {animal.speed}
          </Badge>
          <Badge variant="outline" className="text-xs px-2 py-1 bg-gradient-to-r from-green-500/20 to-emerald-500/20">
            🏆 {animal.wins}
          </Badge>
        </div>
        {isSelected && (
          <div className="text-xs text-primary font-bold bg-primary/10 rounded-full px-2 py-1">
            ✨ CHOSEN ONE ✨
          </div>
        )}
        {isWinner && (
          <div className="text-xs text-yellow-600 font-bold bg-yellow-400/20 rounded-full px-2 py-1">
            🎉 WINNER! 🎉
          </div>
        )}
      </div>
    </Card>
  );
};