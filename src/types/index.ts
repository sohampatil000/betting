export interface User {
  id: string;
  email: string;
  name: string;
  role: 'USER' | 'ADMIN';
  balance: number;
}

export interface Bet {
  id: string;
  userId: string;
  matchId: string;
  amount: number;
  odds: number;
  prediction: string;
  status: 'PENDING' | 'WON' | 'LOST';
  createdAt: Date;
}

export interface Match {
  id: string;
  sport: string;
  team1: string;
  team2: string;
  startTime: Date;
  odds: {
    team1Win: number;
    team2Win: number;
    draw?: number;
  };
  status: 'UPCOMING' | 'LIVE' | 'FINISHED';
  score?: {
    team1: number;
    team2: number;
  };
}