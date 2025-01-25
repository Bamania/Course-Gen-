import React from 'react';
import { CircuitBoard } from 'lucide-react';


export function AuthLayout({ children, title, subtitle }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-slate-900 flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      </div>
      <div className="w-full max-w-md relative">
        <div className="absolute -top-12 left-1/2 -translate-x-1/2">
          <div className="bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl p-3 shadow-xl">
            <CircuitBoard className="w-8 h-8 text-white" />
          </div>
        </div>
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-white/10">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">{title}</h2>
            <p className="text-gray-400">{subtitle}</p>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}