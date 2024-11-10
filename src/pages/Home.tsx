import React from 'react';
import { ArrowRight, Trophy, Shield, CreditCard } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="space-y-20">
      <section className="text-center space-y-6">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-yellow-500 to-yellow-300 bg-clip-text text-transparent">
          Your Premier Sports Betting Destination
        </h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Experience the thrill of sports betting with competitive odds, live matches, and instant payouts.
        </p>
        <Link
          to="/matches"
          className="inline-flex items-center space-x-2 bg-yellow-500 text-gray-900 px-6 py-3 rounded-lg hover:bg-yellow-400 transition"
        >
          <span>Start Betting</span>
          <ArrowRight className="w-5 h-5" />
        </Link>
      </section>

      <section className="grid md:grid-cols-3 gap-8">
        {[
          {
            icon: Trophy,
            title: "Wide Range of Sports",
            description: "Bet on football, basketball, tennis, and many more sports with competitive odds."
          },
          {
            icon: Shield,
            title: "Secure Platform",
            description: "Your security is our priority. Enjoy safe betting with encrypted transactions."
          },
          {
            icon: CreditCard,
            title: "Instant Payouts",
            description: "Quick and hassle-free withdrawals with multiple payment options."
          }
        ].map((feature, index) => (
          <div
            key={index}
            className="bg-gray-800 p-6 rounded-xl border border-gray-700 hover:border-yellow-500 transition"
          >
            <feature.icon className="w-12 h-12 text-yellow-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-400">{feature.description}</p>
          </div>
        ))}
      </section>

      <section className="bg-gray-800 rounded-xl p-8 border border-gray-700">
        <h2 className="text-3xl font-bold mb-6">Live Matches</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Sample matches - in production, these would come from your API */}
          {[
            {
              team1: "Manchester United",
              team2: "Liverpool",
              odds: { team1Win: 2.1, draw: 3.4, team2Win: 2.8 }
            },
            {
              team1: "Lakers",
              team2: "Warriors",
              odds: { team1Win: 1.9, team2Win: 2.2 }
            },
            {
              team1: "Nadal",
              team2: "Djokovic",
              odds: { team1Win: 2.5, team2Win: 1.8 }
            }
          ].map((match, index) => (
            <div key={index} className="bg-gray-900 p-4 rounded-lg border border-gray-700">
              <div className="flex justify-between items-center mb-4">
                <span>{match.team1}</span>
                <span className="text-gray-400">vs</span>
                <span>{match.team2}</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <button className="bg-gray-800 p-2 rounded text-sm hover:bg-gray-700 transition">
                  {match.odds.team1Win}x
                </button>
                {match.odds.draw && (
                  <button className="bg-gray-800 p-2 rounded text-sm hover:bg-gray-700 transition">
                    {match.odds.draw}x
                  </button>
                )}
                <button className="bg-gray-800 p-2 rounded text-sm hover:bg-gray-700 transition">
                  {match.odds.team2Win}x
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}