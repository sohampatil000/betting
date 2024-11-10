import React, { useState } from 'react';
import { useStore } from '../store';
import { Match } from '../types';

export default function Admin() {
  const user = useStore((state) => state.user);
  const matches = useStore((state) => state.matches);
  const setMatches = useStore((state) => state.setMatches);
  const [newMatch, setNewMatch] = useState<Partial<Match>>({
    sport: '',
    team1: '',
    team2: '',
    startTime: new Date(),
    odds: { team1Win: 1.0, team2Win: 1.0, draw: 1.0 },
    status: 'UPCOMING'
  });

  if (user?.role !== 'ADMIN') {
    return (
      <div className="text-center py-20">
        <h1 className="text-3xl font-bold text-red-500">Access Denied</h1>
        <p className="text-gray-400 mt-2">You don't have permission to access this page.</p>
      </div>
    );
  }

  const handleAddMatch = () => {
    const match = {
      ...newMatch,
      id: Date.now().toString(),
      startTime: new Date(newMatch.startTime || Date.now()),
    } as Match;
    
    setMatches([...matches, match]);
    setNewMatch({
      sport: '',
      team1: '',
      team2: '',
      startTime: new Date(),
      odds: { team1Win: 1.0, team2Win: 1.0, draw: 1.0 },
      status: 'UPCOMING'
    });
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      
      <div className="bg-gray-800 p-6 rounded-xl">
        <h2 className="text-xl font-semibold mb-4">Add New Match</h2>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Sport"
            className="bg-gray-700 p-2 rounded"
            value={newMatch.sport}
            onChange={(e) => setNewMatch({ ...newMatch, sport: e.target.value })}
          />
          <input
            type="text"
            placeholder="Team 1"
            className="bg-gray-700 p-2 rounded"
            value={newMatch.team1}
            onChange={(e) => setNewMatch({ ...newMatch, team1: e.target.value })}
          />
          <input
            type="text"
            placeholder="Team 2"
            className="bg-gray-700 p-2 rounded"
            value={newMatch.team2}
            onChange={(e) => setNewMatch({ ...newMatch, team2: e.target.value })}
          />
          <input
            type="datetime-local"
            className="bg-gray-700 p-2 rounded"
            onChange={(e) => setNewMatch({ ...newMatch, startTime: new Date(e.target.value) })}
          />
          <input
            type="number"
            placeholder="Team 1 Odds"
            className="bg-gray-700 p-2 rounded"
            value={newMatch.odds?.team1Win}
            onChange={(e) => setNewMatch({
              ...newMatch,
              odds: { ...newMatch.odds!, team1Win: parseFloat(e.target.value) }
            })}
          />
          <input
            type="number"
            placeholder="Team 2 Odds"
            className="bg-gray-700 p-2 rounded"
            value={newMatch.odds?.team2Win}
            onChange={(e) => setNewMatch({
              ...newMatch,
              odds: { ...newMatch.odds!, team2Win: parseFloat(e.target.value) }
            })}
          />
          <button
            onClick={handleAddMatch}
            className="col-span-2 bg-yellow-500 text-gray-900 p-2 rounded hover:bg-yellow-400 transition"
          >
            Add Match
          </button>
        </div>
      </div>

      <div className="bg-gray-800 p-6 rounded-xl">
        <h2 className="text-xl font-semibold mb-4">Manage Matches</h2>
        <div className="space-y-4">
          {matches.map((match) => (
            <div key={match.id} className="bg-gray-700 p-4 rounded-lg flex justify-between items-center">
              <div>
                <p className="font-semibold">{match.sport}</p>
                <p className="text-gray-400">{match.team1} vs {match.team2}</p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => {
                    const updatedMatches = matches.filter(m => m.id !== match.id);
                    setMatches(updatedMatches);
                  }}
                  className="bg-red-500 px-3 py-1 rounded hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}