"use client";

import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      // 1. Save to Firestore
      await addDoc(collection(db, "leads"), {
        ...formData,
        createdAt: serverTimestamp(),
        read: false,
      });

      // 2. Send email via Next API Route
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to send email");

      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Error submitting form:", error);
      setStatus("error");
    }
  };

  return (
    <div className="w-full">
      {status === "success" ? (
        <div className="bg-green-500/10 border border-green-500/20 text-green-400 p-6 rounded-2xl flex flex-col items-center justify-center text-center">
          <svg className="w-12 h-12 mb-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <h3 className="text-xl font-semibold mb-2 text-white">Message Sent!</h3>
          <p className="text-sm">Thank you for reaching out. I'll get back to you shortly.</p>
          <button 
            onClick={() => setStatus("idle")}
            className="mt-6 text-xs uppercase tracking-widest text-zinc-500 hover:text-white transition-colors"
          >
            Send another message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <input
              type="text"
              required
              placeholder="Your Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="bg-black/50 border border-zinc-800 text-white placeholder-zinc-500 rounded-xl px-5 py-4 focus:outline-none focus:border-zinc-500 transition-colors"
            />
            <input
              type="email"
              required
              placeholder="Email Address"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="bg-black/50 border border-zinc-800 text-white placeholder-zinc-500 rounded-xl px-5 py-4 focus:outline-none focus:border-zinc-500 transition-colors"
            />
          </div>
          <textarea
            required
            placeholder="Tell me about your project..."
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            rows={5}
            className="bg-black/50 border border-zinc-800 text-white placeholder-zinc-500 rounded-xl px-5 py-4 focus:outline-none focus:border-zinc-500 transition-colors resize-none"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="bg-white text-black font-semibold tracking-wider text-sm px-8 py-4 rounded-xl hover:bg-zinc-200 transition-colors disabled:opacity-50 mt-2 self-start"
          >
            {status === "loading" ? "Sending..." : "Send Request"}
          </button>
          
          {status === "error" && (
            <p className="text-red-400 text-xs mt-2">There was an error sending your message. Please try again or email directly.</p>
          )}
        </form>
      )}
    </div>
  );
}
