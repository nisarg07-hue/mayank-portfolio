"use client";

import { useEffect, useState } from "react";
import { collection, query, orderBy, onSnapshot, doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

type Lead = {
  id: string;
  name: string;
  email: string;
  message: string;
  read: boolean;
  createdAt: any;
};

export default function LeadsViewer() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "leads"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data: Lead[] = [];
      snapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() } as Lead);
      });
      setLeads(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const markAsRead = async (id: string, currentStatus: boolean) => {
    try {
      await updateDoc(doc(db, "leads", id), { read: !currentStatus });
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <div className="text-zinc-500 py-10">Loading leads...</div>;
  }

  if (leads.length === 0) {
    return <div className="text-zinc-500 py-10">No contact enquiries yet.</div>;
  }

  return (
    <div className="flex flex-col gap-6">
      <h3 className="font-semibold text-lg uppercase tracking-wider text-zinc-300 border-b border-zinc-800 pb-2">Contact Enquiries</h3>
      
      <div className="grid gap-4">
        {leads.map((lead) => (
          <div 
            key={lead.id} 
            className={`p-6 rounded-xl border transition-colors ${
              lead.read ? "bg-black/40 border-zinc-800/60" : "bg-zinc-900 border-zinc-700 shadow-sm"
            }`}
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h4 className={`text-lg transition-colors ${lead.read ? "text-zinc-300 font-medium" : "text-white font-bold"}`}>
                  {lead.name}
                </h4>
                <a href={`mailto:${lead.email}`} className="text-sm text-zinc-500 hover:text-white transition-colors">
                  {lead.email}
                </a>
              </div>
              <div className="flex flex-col items-end gap-2">
                <span className="text-xs text-zinc-600">
                  {lead.createdAt?.toDate ? lead.createdAt.toDate().toLocaleDateString() : 'Just now'}
                </span>
                <button
                  onClick={() => markAsRead(lead.id, lead.read)}
                  className={`text-xs px-3 py-1 rounded-full border transition-colors ${
                    lead.read 
                      ? "border-zinc-800 text-zinc-500 hover:bg-zinc-800" 
                      : "border-zinc-500 text-zinc-300 hover:bg-zinc-800"
                  }`}
                >
                  {lead.read ? "Mark Unread" : "Mark Read"}
                </button>
              </div>
            </div>
            
            <p className={`text-sm whitespace-pre-wrap leading-relaxed ${lead.read ? "text-zinc-500" : "text-zinc-300"}`}>
              {lead.message}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
