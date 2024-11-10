import React, { useState } from 'react';
import { useStore } from '../store';
import { format } from 'date-fns';
import { toast } from 'react-hot-toast';
import { Match, Bet } from '../types';

export default function Matches() {
  const { matches, user, addBet } = useStore();
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  const [betAmount, setBetAmount] = useState('');
  const [selectedTeam, setSelectedTeam] = useState<'team1' | 'team2' | 'draw' | null>(null);

  const placeBet = () => {
    if (!user) {
      toast.error('Please login to place bets');
      return;
    }

    if (!selectedMatch || !selectedTeam || !betAmount) {
      toast.error('Please select a team and enter bet amount');
      return;
    }

    const amount = parseFloat(betAmount);
    if (isNaN(amount) || amount <= 0) {
      toast.error('Please enter a valid bet amount');
      return;
    }

    if (amount > (user.balance || 0)) {
      toast.error('Insufficient balance');
      return;
    }

    const odds = selectedTeam === 'team1' 
      ? selectedMatch.odds.team1Win 
      : selectedTeam === 'team2' 
        ? selectedMatch.odds.team2Win 
        : selectedMatch.odds.draw;

    const bet: Bet = {
      id: Date.now().toString(),
      userId: user.id,
      matchId: selectedMatch.id,
      amount,
      odds: odds!,
      prediction: selectedTeam,
      status: 'PENDING',
      createdAt: new Date()
    };

    addBet(bet);
    toast.success('Bet placed successfully!');
    setSelectedMatch(null);
    setBetAmount('');
    setSelectedTeam(null);
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Live Matches</h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {matches.map((match) => (
          <div key={match.id} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex justify-between items-center mb-4">
              <span className="text-yellow-500">{match.sport}</span>
              <span className="text-sm text-gray-400">
                {format(new Date(match.startTime), 'MMM d, HH:mm')}
              </span>
            </div>

            <div className="text-center mb-4">
              <div className="font-semibold">{match.team1}</div>
              <div className="text-gray-400 my-2">vs</div>
              <div className="font-semibold">{match.team2}</div>
            </div>

            {match.status === 'LIVE' && match.score && (
              <div className="text-center mb-4">
                <span className="text-2xl font-bold">
                  {match.score.team1} - {match.score.team2}
                </span>
              </div>
            )}

            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => {
                  setSelectedMatch(match);
                  setSelectedTeam('team1');
                }}
                className={`p-2 rounded transition ${
                  selectedMatch?.id === match.id && selectedTeam === 'team1'
                    ? 'bg-yellow-500 text-gray-900'
                    : 'bg-gray-700 hover:bg-gray-600'
                }`}
              >
                {match.odds.team1Win}x
              </button>
              {match.odds.draw && (
                <button
                  onClick={() => {
                    setSelectedMatch(match);
                    setSelectedTeam('draw');
                  }}
                  className={`p-2 rounded transition ${
                    selectedMatch?.id === match.id && selectedTeam === 'draw'
                      ? 'bg-yellow-500 text-gray-900'
                      : 'bg-gray-700 hover:bg-gray-600'
                  }`}
                >
                  {match.odds.draw}x
                </button>
              )}
              <button
                onClick={() => {
                  setSelectedMatch(match);
                  setSelectedTeam('team2');
                }}
                className={`p-2 rounded transition ${
                  selectedMatch?.id === match.id && selectedTeam === 'team2'
                    ? 'bg-yellow-500 text-gray-900'
                    : 'bg-gray-700 hover:bg-gray-600'
                }`}
              >
                {match.odds.team2Win}x
              </button>
            </div>

            {selectedMatch?.id === match.id && (
              <div className="mt-4 space-y-2">
                <input
                  type="number"
                  placeholder="Enter bet amount"
                  value={betAmount}
                  onChange={(e) => setBetAmount(e.target.value)}
                  className="w-full bg-gray-700 p-2 rounded"
                />
                <button
                  onClick={placeBet}
                  className="w-full bg-yellow-500 text-gray-900 p-2 rounded hover:bg-yellow-400 transition"
                >
                  Place Bet
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}