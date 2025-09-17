import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AnimalCard } from './AnimalCard';
import { RaceStats } from './RaceStats';

const animals = [
  { id: 1, name: 'Lightning Cheetah', emoji: '🐆', speed: 85, wins: 24 },
  { id: 2, name: 'Thunder Horse', emoji: '🐎', speed: 80, wins: 31 },
  { id: 3, name: 'Swift Rabbit', emoji: '🐰', speed: 75, wins: 19 },
  { id: 4, name: 'Turbo Turtle', emoji: '🐢', speed: 60, wins: 8 },
  { id: 5, name: 'Flash Falcon', emoji: '🦅', speed: 90, wins: 28 },
  { id: 6, name: 'Dash Deer', emoji: '🦌', speed: 70, wins: 22 }
];

export const AnimalRaceGame = () => {
  const [selectedAnimal, setSelectedAnimal] = useState<number | null>(null);
  const [betAmount, setBetAmount] = useState(10);
  const [isRacing, setIsRacing] = useState(false);
  const [raceResult, setRaceResult] = useState<number | null>(null);
  const [balance, setBalance] = useState(1000);
  const [todayStats, setTodayStats] = useState({
    racesToday: 47,
    totalPayouts: 23400,
    lastWinner: 'Thunder Horse'
  });

  const placeBet = () => {
    if (!selectedAnimal || betAmount > balance) return;
    
    setIsRacing(true);
    setBalance(prev => prev - betAmount);
    
    // Simulate race
    setTimeout(() => {
      const winner = Math.floor(Math.random() * animals.length) + 1;
      setRaceResult(winner);
      
      if (winner === selectedAnimal) {
        const winnings = betAmount * 2.5;
        setBalance(prev => prev + winnings);
        setTodayStats(prev => ({
          ...prev,
          totalPayouts: prev.totalPayouts + winnings,
          lastWinner: animals.find(a => a.id === winner)?.name || ''
        }));
      }
      
      setTodayStats(prev => ({
        ...prev,
        racesToday: prev.racesToday + 1
      }));
      
      setIsRacing(false);
      
      // Reset for next race
      setTimeout(() => {
        setRaceResult(null);
        setSelectedAnimal(null);
      }, 3000);
    }, 3000);
  };

  return (
    <div className="min-h-screen cosmic-bg relative overflow-hidden">
      {/* Background Stars */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary rounded-full animate-sparkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      {/* Header */}
      <header className="relative z-10 p-6 text-center">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">
          🏁 COSMIC ANIMAL RACING 🏁
        </h1>
        <p className="text-muted-foreground text-lg">Choose your champion and watch them race to victory!</p>
      </header>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pb-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          
          {/* Left Sidebar - Stats */}
          <div className="lg:col-span-1">
            <RaceStats stats={todayStats} balance={balance} />
          </div>

          {/* Main Game Area */}
          <div className="lg:col-span-2 space-y-6">
            

            {/* Animal Selection */}
            <Card className="race-card p-6">
              <h2 className="text-2xl font-bold text-center mb-6 text-primary">Choose Your Racer</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {animals.map((animal) => (
                  <AnimalCard
                    key={animal.id}
                    animal={animal}
                    isSelected={selectedAnimal === animal.id}
                    onClick={() => !isRacing && setSelectedAnimal(animal.id)}
                    disabled={isRacing}
                  />
                ))}
              </div>
            </Card>

            {/* Betting Controls */}
            <Card className="race-card p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-primary">Place Your Bet</h3>
                <Badge variant="secondary" className="text-lg px-3 py-1">
                  Balance: ${balance}
                </Badge>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 items-center">
                <div className="flex items-center gap-2">
                  <label className="text-foreground font-medium">Bet Amount:</label>
                  <select 
                    value={betAmount} 
                    onChange={(e) => setBetAmount(Number(e.target.value))}
                    className="bg-secondary border border-border rounded-lg px-3 py-2 text-foreground"
                    disabled={isRacing}
                  >
                    <option value={10}>$10</option>
                    <option value={25}>$25</option>
                    <option value={50}>$50</option>
                    <option value={100}>$100</option>
                  </select>
                </div>
                
                <Button
                  onClick={placeBet}
                  disabled={!selectedAnimal || isRacing || betAmount > balance}
                  className="px-8 py-3 text-lg font-bold animate-pulse-glow"
                  size="lg"
                >
                  {isRacing ? '🏃‍♂️ Racing...' : '🎰 Place Bet'}
                </Button>
              </div>
              
              {selectedAnimal && (
                <div className="mt-4 p-3 bg-secondary/50 rounded-lg">
                  <p className="text-center text-foreground">
                    Betting ${betAmount} on <span className="font-bold text-primary">
                      {animals.find(a => a.id === selectedAnimal)?.name}
                    </span>
                    {betAmount > 0 && <span className="text-muted-foreground"> • Potential win: ${(betAmount * 2.5).toFixed(0)}</span>}
                  </p>
                </div>
              )}
            </Card>
          </div>

          {/* Right Sidebar - Animal Win Stats */}
          <div className="lg:col-span-1">
            <Card className="race-card p-6">
              <h3 className="text-xl font-bold text-center mb-4 text-primary">🏆 Win Leaderboard</h3>
              <div className="space-y-3">
                {animals
                  .sort((a, b) => b.wins - a.wins)
                  .map((animal, index) => (
                    <div key={animal.id} className="flex items-center justify-between p-2 rounded-lg bg-secondary/30">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{animal.emoji}</span>
                        <div>
                          <p className="font-medium text-sm">{animal.name}</p>
                          <p className="text-xs text-muted-foreground">Speed: {animal.speed}</p>
                        </div>
                      </div>
                      <Badge variant={index < 3 ? "default" : "secondary"} className="font-bold">
                        {animal.wins} wins
                      </Badge>
                    </div>
                  ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};