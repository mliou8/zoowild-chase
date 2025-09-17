import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface RaceStatsProps {
  stats: {
    racesToday: number;
    totalPayouts: number;
    lastWinner: string;
  };
  balance: number;
}

export const RaceStats: React.FC<RaceStatsProps> = ({ stats, balance }) => {
  return (
    <div className="space-y-4">
      {/* Balance Card */}
      <Card className="race-card p-6 text-center">
        <h3 className="text-lg font-bold text-primary mb-2">💰 Your Balance</h3>
        <div className="text-3xl font-bold text-foreground">${balance}</div>
        <Badge variant="secondary" className="mt-2">
          Ready to bet!
        </Badge>
      </Card>

      {/* Daily Stats */}
      <Card className="race-card p-6">
        <h3 className="text-lg font-bold text-primary mb-4 text-center">📊 Today's Stats</h3>
        <div className="space-y-4">
          
          <div className="stat-card p-3 rounded-lg text-center">
            <div className="text-2xl font-bold text-accent">{stats.racesToday}</div>
            <div className="text-sm text-muted-foreground">Races Today</div>
          </div>
          
          <div className="stat-card p-3 rounded-lg text-center">
            <div className="text-2xl font-bold text-primary">${stats.totalPayouts.toLocaleString()}</div>
            <div className="text-sm text-muted-foreground">Total Payouts</div>
          </div>
          
          <div className="stat-card p-3 rounded-lg text-center">
            <div className="text-lg font-bold text-foreground">{stats.lastWinner}</div>
            <div className="text-sm text-muted-foreground">Last Winner 🏆</div>
          </div>
        </div>
      </Card>

      {/* Race Info */}
      <Card className="race-card p-4">
        <h4 className="font-bold text-center text-primary mb-3">🏁 Race Info</h4>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Win Multiplier:</span>
            <span className="text-accent font-bold">2.5x</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Race Duration:</span>
            <span className="text-foreground">3 seconds</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Animals:</span>
            <span className="text-foreground">6 racers</span>
          </div>
        </div>
      </Card>
    </div>
  );
};