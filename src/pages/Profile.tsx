import React from 'react';
import { useStore } from '../store';
import { format } from 'date-fns';

export default function Profile() {
  const { user, bets } = useStore();
  const userBets = bets.filter(bet => bet.userId === user?.id);

  if (!user) {
    return (
      <div className="text-center py-20">
        <h1 className="text-3xl font-bold text-red-500">Access Denied</h1>
        <p className="text-gray-400 mt-2">Please login to view your profile.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="bg-gray-800 p-6 rounded-xl">
        <h1 className="text-2xl font-bold mb-4">Profile</h1>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <p className="text-gray-400">Name</p>
            <p className="font-semibold">{user.name}</p>
          </div>
          <div>
            <p className="text-gray-400">Email</p>
            <p className="font-semibold">{user.email}</p>
          </div>
          <div>
            <p className="text-gray-400">Balance</p>
            <p className="font-semibold text-yellow-500">${user.balance.toFixed(2)}</p>
          </div>
        </div>
      </div>

      <div className="bg-gray-800 p-6 rounded-xl">
        <h2 className="text-xl font-bold mb-4">Betting History</h2>
        <div className="space-y-4">
          {userBets.map((bet) => (
            <div key={bet.id} className="bg-gray-700 p-4 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold">
                  Bet Amount: ${bet.amount.toFixed(2)}
                </span>
                <span className={`px-2 py-1 rounded text-sm ${
                  bet.status === 'WON' 
                    ? 'bg-green-500' 
                    : bet.status === 'LOST'
                      ? 'bg-red-500'
                      : 'bg-yellow-500 text-gray-900'
                }`}>
                  {bet.status}
                </span>
              </div>
              <div className="text-sm text-gray-400">
                <p>Odds: {bet.odds}x</p>
                <p>Date: {format(new Date(bet.createdAt), 'MMM d, yyyy HH:mm')}</p>
              </div>
            </div>
          ))}
          {userBets.length === 0 && (
            <p className="text-center text-gray-400">No bets placed yet</p>
          )}
        </div>
      </div>
    </div>
  );
}