"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/lib/firebase";
import AdminLogin from "@/components/admin/AdminLogin";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center text-zinc-500">
        Loading admin...
      </div>
    );
  }

  if (!user) {
    return <AdminLogin />;
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-300 pointer-events-auto relative z-50">
      <nav className="border-b border-zinc-800 bg-black/50 p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-xl font-bold tracking-wider text-white">MAYANK PORTFOLIO ADMIN</h1>
          <button
            onClick={() => auth.signOut()}
            className="text-sm font-medium text-zinc-400 hover:text-white transition-colors"
          >
            Sign Out
          </button>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto p-6">{children}</main>
    </div>
  );
}
