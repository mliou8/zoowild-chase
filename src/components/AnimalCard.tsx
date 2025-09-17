import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Animal {
  id: number;
  name: string;
  emoji: string;
  speed: number;
  wins: number;
}

interface AnimalCardProps {
  animal: Animal;
  isSelected: boolean;
  onClick: () => void;
  disabled: boolean;
}

export const AnimalCard: React.FC<AnimalCardProps> = ({ 
  animal, 
  isSelected, 
  onClick, 
  disabled 
}) => {
  return (
    <Card
      className={`
        race-card p-4 cursor-pointer transition-all duration-300 hover:scale-105
        ${isSelected ? 'ring-2 ring-primary gold-glow' : 'hover:border-primary/50'}
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
      `}
      onClick={onClick}
    >
      <div className="text-center space-y-2">
        <div className={`text-4xl animate-float ${isSelected ? 'animate-pulse-glow' : ''}`}>
          {animal.emoji}
        </div>
        <h3 className="font-bold text-sm text-foreground">{animal.name}</h3>
        <div className="flex justify-between items-center text-xs">
          <Badge variant="secondary" className="text-xs px-2 py-1">
            ⚡ {animal.speed}
          </Badge>
          <Badge variant="outline" className="text-xs px-2 py-1">
            🏆 {animal.wins}
          </Badge>
        </div>
        {isSelected && (
          <div className="text-xs text-primary font-bold animate-pulse">
            SELECTED ✨
          </div>
        )}
      </div>
    </Card>
  );
};