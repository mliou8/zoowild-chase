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

interface RaceTrackProps {
  animals: Animal[];
  isRacing: boolean;
  winner: number | null;
  selectedAnimal: number | null;
}

export const RaceTrack: React.FC<RaceTrackProps> = ({ 
  animals, 
  isRacing, 
  winner, 
  selectedAnimal 
}) => {
  return (
    <Card className="race-card p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-primary">🏁 Race Track</h2>
        {winner && (
          <Badge variant="default" className="text-lg px-4 py-2 gold-glow">
            🏆 Winner: {animals.find(a => a.id === winner)?.name}
          </Badge>
        )}
      </div>
      
      <div className="bg-gradient-to-r from-race-track to-race-grass rounded-lg p-4 min-h-[300px] relative overflow-hidden">
        {/* Track Lines */}
        <div className="absolute inset-0">
          {animals.map((_, index) => (
            <div
              key={index}
              className="absolute border-b border-dashed border-white/20"
              style={{
                top: `${(index + 1) * (100 / (animals.length + 1))}%`,
                left: 0,
                right: 0,
              }}
            />
          ))}
        </div>

        {/* Finish Line */}
        <div className="absolute right-4 top-0 bottom-0 w-1 bg-primary animate-pulse" />
        
        {/* Animals */}
        <div className="relative h-full">
          {animals.map((animal, index) => (
            <div
              key={animal.id}
              className={`
                absolute flex items-center transition-all duration-300
                ${isRacing ? 'animate-race' : ''}
                ${selectedAnimal === animal.id ? 'scale-110' : ''}
                ${winner === animal.id ? 'gold-glow scale-125' : ''}
              `}
              style={{
                top: `${(index + 1) * (100 / (animals.length + 1)) - 3}%`,
                left: isRacing ? '-10%' : '5%',
                animationDuration: isRacing ? `${3 - (animal.speed / 100)}s` : '0s',
                animationDelay: isRacing ? `${Math.random() * 0.5}s` : '0s'
              }}
            >
              <div className="flex items-center gap-2 bg-card/80 rounded-full px-3 py-1 backdrop-blur-sm">
                <span className={`text-2xl ${isRacing ? 'animate-bounce' : ''}`}>
                  {animal.emoji}
                </span>
                <span className="text-sm font-bold text-foreground">
                  {animal.name}
                </span>
                {selectedAnimal === animal.id && (
                  <Badge variant="default" className="text-xs ml-1">
                    YOUR BET
                  </Badge>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Racing Status */}
        {isRacing && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-black/50 backdrop-blur-sm rounded-lg p-6 text-center">
              <div className="text-4xl font-bold text-primary animate-pulse mb-2">
                🏃‍♂️ RACING! 🏃‍♂️
              </div>
              <div className="text-muted-foreground">
                Animals are racing to the finish line...
              </div>
            </div>
          </div>
        )}

        {/* Winner Celebration */}
        {winner && !isRacing && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-primary/20 backdrop-blur-sm rounded-lg p-6 text-center border border-primary">
              <div className="text-4xl font-bold text-primary animate-bounce mb-2">
                🎊 {animals.find(a => a.id === winner)?.emoji} WINS! 🎊
              </div>
              <div className="text-xl text-foreground font-bold">
                {animals.find(a => a.id === winner)?.name}
              </div>
              {selectedAnimal === winner && (
                <Badge variant="default" className="mt-2 text-lg px-4 py-2 gold-glow">
                  YOU WON! 🎉
                </Badge>
              )}
              {selectedAnimal && selectedAnimal !== winner && (
                <Badge variant="destructive" className="mt-2 text-lg px-4 py-2">
                  Better luck next time! 💪
                </Badge>
              )}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};