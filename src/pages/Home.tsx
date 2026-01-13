import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

export default function Home(): ReactNode {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">Simulators</h1>
        <p className="text-gray-400 mb-8">A collection of interactive computational simulations</p>

        <div className="grid gap-4">
          <Link
            to="/elementary-ca"
            className="block p-6 bg-gray-800 rounded-lg hover:bg-gray-750 transition-colors border border-gray-700 hover:border-gray-600"
          >
            <h2 className="text-2xl font-semibold mb-2">Elementary Cellular Automata</h2>
            <p className="text-gray-400">
              Explore Wolfram's 256 rules of 1D binary cellular automata. Watch patterns emerge from
              simple rules, from chaos to fractals to Turing completeness.
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
