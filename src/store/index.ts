import { create } from 'zustand';
import { User, Match, Bet } from '../types';

interface Store {
  user: User | null;
  matches: Match[];
  bets: Bet[];
  setUser: (user: User | null) => void;
  setMatches: (matches: Match[]) => void;
  setBets: (bets: Bet[]) => void;
  addBet: (bet: Bet) => void;
}

export const useStore = create<Store>((set) => ({
  user: null,
  matches: [],
  bets: [],
  setUser: (user) => set({ user }),
  setMatches: (matches) => set({ matches }),
  setBets: (bets) => set({ bets }),
  addBet: (bet) => set((state) => ({ bets: [...state.bets, bet] })),
}));