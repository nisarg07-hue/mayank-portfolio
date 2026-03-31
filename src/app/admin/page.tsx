"use client";

import { useState } from "react";
import { Upload, MessageSquare, Video, Trash2, Loader2 } from "lucide-react";
// We will import Firebase methods here shortly

import LeadsViewer from "@/components/admin/LeadsViewer";
import VideoManager from "@/components/admin/VideoManager";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<"videos" | "leads">("videos");

  return (
    <div className="flex flex-col gap-8 pointer-events-auto">
      {/* Header and Tabs */}
      <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
        <h2 className="text-3xl font-bold font-bebas tracking-wide">Admin Dashboard</h2>
        <div className="flex bg-zinc-900 rounded-lg p-1 border border-zinc-800">
          <button
            onClick={() => setActiveTab("videos")}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
              activeTab === "videos" ? "bg-zinc-100 text-black shadow" : "text-zinc-400 hover:text-white"
            }`}
          >
            <Video size={16} />
            Videos
          </button>
          <button
            onClick={() => setActiveTab("leads")}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
              activeTab === "leads" ? "bg-zinc-100 text-black shadow" : "text-zinc-400 hover:text-white"
            }`}
          >
            <MessageSquare size={16} />
            Leads
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="bg-[#111] border border-zinc-800 rounded-xl p-6 shadow-2xl">
        {activeTab === "videos" ? <VideoManager /> : <LeadsViewer />}
      </div>
    </div>
  );
}
