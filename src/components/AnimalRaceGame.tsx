import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AnimalCard } from './AnimalCard';
import { RaceStats } from './RaceStats';

const animals = [
  { id: 1, name: 'Lightning Cheetah', emoji: '🐆', speed: 85, wins: 24, quirk: 'Loves energy drinks!' },
  { id: 2, name: 'Thunder Horse', emoji: '🐎', speed: 80, wins: 31, quirk: 'Gallops to disco music' },
  { id: 3, name: 'Swift Rabbit', emoji: '🐰', speed: 75, wins: 19, quirk: 'Powered by carrots' },
  { id: 4, name: 'Turbo Turtle', emoji: '🐢', speed: 60, wins: 8, quirk: 'Slow but unstoppable!' },
  { id: 5, name: 'Flash Falcon', emoji: '🦅', speed: 90, wins: 28, quirk: 'Soars through clouds' },
  { id: 6, name: 'Dash Deer', emoji: '🦌', speed: 70, wins: 22, quirk: 'Forest parkour expert' },
  { id: 7, name: 'Rocket Rhino', emoji: '🦏', speed: 78, wins: 15, quirk: 'Breaks sound barriers' },
  { id: 8, name: 'Zoom Zebra', emoji: '🦓', speed: 82, wins: 26, quirk: 'Striped speed demon' }
];

export const AnimalRaceGame = () => {
  const [selectedAnimal, setSelectedAnimal] = useState<number | null>(null);
  const [betAmount, setBetAmount] = useState(10);
  const [isRacing, setIsRacing] = useState(false);
  const [raceResult, setRaceResult] = useState<number | null>(null);
  const [balance, setBalance] = useState(1000);
  const [isWinner, setIsWinner] = useState(false);
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
        setIsWinner(true);
        setTodayStats(prev => ({
          ...prev,
          totalPayouts: prev.totalPayouts + winnings,
          lastWinner: animals.find(a => a.id === winner)?.name || ''
        }));
      } else {
        setIsWinner(false);
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
        setIsWinner(false);
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
            className="absolute w-1 h-1 bg-primary rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
          />
        ))}
      </div>

      {/* Header */}
      <header className="relative z-10 p-6 text-center">
        <h1 className="text-6xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent mb-2">
          🏁 COSMIC ANIMAL RACING 🏁
        </h1>
        <p className="text-muted-foreground text-xl">
          {isRacing ? "🏃‍♂️ The race is on! May the fastest animal win!" : 
           raceResult ? (isWinner ? "🎊 CONGRATULATIONS! You picked a winner!" : "😅 Better luck next time, champion!") :
           "Choose your champion and watch them zoom to victory! 🚀"}
        </p>
        {raceResult && (
          <div className="mt-2 text-2xl">
            Winner: {animals.find(a => a.id === raceResult)?.emoji} {animals.find(a => a.id === raceResult)?.name}!
          </div>
        )}
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
              <h2 className="text-3xl font-bold text-center mb-6 text-primary">
                🎯 Choose Your Racing Champion! 🎯
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {animals.map((animal) => (
                  <AnimalCard
                    key={animal.id}
                    animal={animal}
                    isSelected={selectedAnimal === animal.id}
                    onClick={() => !isRacing && setSelectedAnimal(animal.id)}
                    disabled={isRacing}
                    isWinner={raceResult === animal.id}
                  />
                ))}
              </div>
            </Card>

            {/* Betting Controls */}
            <Card className="race-card p-6 border-2 border-dashed border-primary/30">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold text-primary">💰 Place Your Bet! 💰</h3>
                <Badge variant="secondary" className="text-xl px-4 py-2">
                  💵 ${balance}
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
                  className="px-8 py-4 text-xl font-bold"
                  size="lg"
                >
                  {isRacing ? '🏃‍♂️ RACING IN PROGRESS...' : '🚀 LAUNCH THE RACE!'}
                </Button>
              </div>
              
              {selectedAnimal && (
                <div className="mt-4 p-4 bg-gradient-to-r from-primary/20 to-accent/20 rounded-lg border border-primary/30">
                  <p className="text-center text-foreground text-lg">
                    🎯 Betting <span className="font-bold text-accent">${betAmount}</span> on{' '}
                    <span className="font-bold text-primary text-xl">
                      {animals.find(a => a.id === selectedAnimal)?.emoji} {animals.find(a => a.id === selectedAnimal)?.name}
                    </span>
                  </p>
                  <p className="text-center text-sm text-muted-foreground mt-1">
                    "{animals.find(a => a.id === selectedAnimal)?.quirk}"
                  </p>
                  {betAmount > 0 && (
                    <p className="text-center text-accent font-bold mt-2">
                      💎 Potential Jackpot: ${(betAmount * 2.5).toFixed(0)}!
                    </p>
                  )}
                </div>
              )}
            </Card>
          </div>

          {/* Right Sidebar - Animal Win Stats */}
          <div className="lg:col-span-1">
            <Card className="race-card p-6">
              <h3 className="text-2xl font-bold text-center mb-4 text-primary">🏆 Champion Leaderboard 🏆</h3>
              <div className="space-y-3">
                {animals
                  .sort((a, b) => b.wins - a.wins)
                  .map((animal, index) => (
                    <div key={animal.id} className={`flex items-center justify-between p-3 rounded-lg ${
                      index === 0 ? 'bg-gradient-to-r from-yellow-400/20 to-orange-500/20 border border-yellow-400/30' :
                      index === 1 ? 'bg-gradient-to-r from-gray-300/20 to-gray-400/20 border border-gray-400/30' :
                      index === 2 ? 'bg-gradient-to-r from-amber-600/20 to-amber-700/20 border border-amber-600/30' :
                      'bg-secondary/30'
                    }`}>
                      <div className="flex items-center gap-3">
                        {index < 3 && (
                          <div className="text-lg">
                            {index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉'}
                          </div>
                        )}
                        <span className="text-3xl">
                          {animal.emoji}
                        </span>
                        <div>
                          <p className="font-bold text-sm">{animal.name}</p>
                          <p className="text-xs text-muted-foreground">⚡ Speed {animal.speed}</p>
                          <p className="text-xs text-muted-foreground italic">"{animal.quirk}"</p>
                        </div>
                      </div>
                      <Badge variant={index < 3 ? "default" : "secondary"} className={`font-bold text-sm px-3 py-1 ${
                        index === 0 ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white' :
                        index === 1 ? 'bg-gradient-to-r from-gray-400 to-gray-500 text-white' :
                        index === 2 ? 'bg-gradient-to-r from-amber-600 to-amber-700 text-white' : ''
                      }`}>
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