"use client";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err: any) {
      console.error(err);
      setError("Invalid credentials. Please check your email and password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4">
      <div className="max-w-md w-full border border-zinc-800 bg-[#111] p-8 rounded-xl shadow-2xl relative z-50 pointer-events-auto">
        <h2 className="text-2xl font-bold text-white mb-2 tracking-wide uppercase">Admin Port</h2>
        <p className="text-zinc-500 text-sm mb-8">Sign in to manage your portfolio.</p>
        
        {error && (
          <div className="mb-6 p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="flex flex-col gap-5">
          <div>
            <label className="block text-xs uppercase tracking-widest text-zinc-500 mb-2">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-black border border-zinc-800 text-white p-3 rounded-lg focus:outline-none focus:border-zinc-500 transition-colors"
              required
            />
          </div>
          
          <div>
            <label className="block text-xs uppercase tracking-widest text-zinc-500 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-black border border-zinc-800 text-white p-3 rounded-lg focus:outline-none focus:border-zinc-500 transition-colors"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-4 w-full bg-zinc-100 text-black font-semibold uppercase tracking-wider text-sm p-4 rounded-lg hover:bg-white transition-colors disabled:opacity-50"
          >
            {loading ? "Authenticating..." : "Enter Portal"}
          </button>
        </form>
      </div>
    </div>
  );
}
