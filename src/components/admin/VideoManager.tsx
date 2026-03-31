"use client";

import { useEffect, useState } from "react";
import { collection, query, orderBy, onSnapshot, doc, deleteDoc, addDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
import { db, storage } from "@/lib/firebase";
import { Trash2, Upload, FileVideo, CheckCircle2 } from "lucide-react";

type VideoDoc = {
  id: string;
  title: string;
  category: "gym" | "realestate" | "gameplay";
  subcategory: string;
  meta: string;
  videoSrc: string;
  duration: string;
  genreTag?: string;
  autoThumb: boolean;
  createdAt?: any;
};

export default function VideoManager() {
  const [videos, setVideos] = useState<VideoDoc[]>([]);
  const [loading, setLoading] = useState(true);

  // Upload State
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  
  // Form State
  const [formData, setFormData] = useState({
    title: "",
    category: "gym",
    subcategory: "",
    meta: "",
    duration: "Reel",
    genreTag: ""
  });

  useEffect(() => {
    const q = query(collection(db, "videos"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data: VideoDoc[] = [];
      snapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() } as VideoDoc);
      });
      setVideos(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return alert("Please select a video file first.");

    setUploading(true);
    setProgress(0);

    // 1. Upload to Storage
    const storageRef = ref(storage, `work/${Date.now()}_${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const p = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(p);
      },
      (error) => {
        console.error("Upload failed", error);
        setUploading(false);
        alert("Upload failed. Check console.");
      },
      async () => {
        // 2. Get URL and Save to Firestore
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        
        await addDoc(collection(db, "videos"), {
          ...formData,
          videoSrc: downloadURL,
          autoThumb: true,
          createdAt: serverTimestamp(),
        });

        // 3. Reset form
        setFile(null);
        setFormData({ title: "", category: "gym", subcategory: "", meta: "", duration: "Reel", genreTag: "" });
        setUploading(false);
        setProgress(0);
        
        // Reset file input element visually
        const fileInput = document.getElementById("video-upload") as HTMLInputElement;
        if (fileInput) fileInput.value = "";
      }
    );
  };

  const handleDelete = async (id: string, videoUrl: string) => {
    if (!confirm("Are you sure you want to delete this video? This cannot be undone.")) return;

    try {
      // 1. Delete from Firestore
      await deleteDoc(doc(db, "videos", id));
      
      // 2. Try to delete from Storage (might fail if URL doesn't match a valid storage ref format directly, but we try)
      try {
        const fileRef = ref(storage, videoUrl);
        await deleteObject(fileRef);
      } catch (err) {
        console.warn("Could not delete physical file from storage automatically - it may be hosted externally.", err);
      }
    } catch (err) {
      console.error(err);
      alert("Failed to delete video.");
    }
  };

  return (
    <div className="flex flex-col gap-10">
      
      {/* ── UPLOAD SECTION ── */}
      <div className="bg-black border border-zinc-800 p-6 rounded-lg">
        <div className="flex items-center gap-3 mb-6">
          <Upload className="text-zinc-400" size={20} />
          <h3 className="font-semibold text-lg uppercase tracking-wider text-zinc-300">Upload New Video</h3>
        </div>

        <form onSubmit={handleUpload} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="block text-xs uppercase tracking-widest text-zinc-500 mb-2">Video File (.mp4)</label>
            <input
              id="video-upload"
              type="file"
              accept="video/mp4"
              required
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="w-full bg-zinc-900 border border-zinc-800 text-zinc-300 p-3 rounded focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest text-zinc-500 mb-2">Title</label>
            <input
              type="text"
              required
              placeholder="e.g. S8UL Edit"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full bg-zinc-900 border border-zinc-800 text-white p-3 rounded focus:outline-none focus:border-zinc-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest text-zinc-500 mb-2">Category</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
              className="w-full bg-zinc-900 border border-zinc-800 text-white p-3 rounded focus:outline-none focus:border-zinc-500 transition-colors"
            >
              <option value="gym">Gym & Fitness</option>
              <option value="realestate">Real Estate</option>
              <option value="gameplay">Gameplay</option>
            </select>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest text-zinc-500 mb-2">Subcategory/Badge</label>
            <input
              type="text"
              required
              placeholder="e.g. Esports Edit"
              value={formData.subcategory}
              onChange={(e) => setFormData({ ...formData, subcategory: e.target.value })}
              className="w-full bg-zinc-900 border border-zinc-800 text-white p-3 rounded focus:outline-none focus:border-zinc-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest text-zinc-500 mb-2">Meta Tags</label>
            <input
              type="text"
              placeholder="e.g. Gaming · YouTube Shorts"
              value={formData.meta}
              onChange={(e) => setFormData({ ...formData, meta: e.target.value })}
              className="w-full bg-zinc-900 border border-zinc-800 text-white p-3 rounded focus:outline-none focus:border-zinc-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest text-zinc-500 mb-2">Duration / Type</label>
            <input
              type="text"
              placeholder="e.g. Reel, 4:20"
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
              className="w-full bg-zinc-900 border border-zinc-800 text-white p-3 rounded focus:outline-none focus:border-zinc-500 transition-colors"
            />
          </div>

          {formData.category === "gameplay" && (
            <div>
              <label className="block text-xs uppercase tracking-widest text-zinc-500 mb-2">Genre Tag (Optional)</label>
              <input
                type="text"
                placeholder="e.g. Gaming Cut"
                value={formData.genreTag}
                onChange={(e) => setFormData({ ...formData, genreTag: e.target.value })}
                className="w-full bg-zinc-900 border border-zinc-800 text-white p-3 rounded focus:outline-none focus:border-zinc-500 transition-colors"
              />
            </div>
          )}

          <div className="md:col-span-2 pt-4">
            <button
              type="submit"
              disabled={uploading}
              className="bg-white text-black font-semibold tracking-wider uppercase text-sm px-6 py-4 rounded hover:bg-zinc-200 transition-colors disabled:opacity-50 flex items-center gap-3 w-full justify-center"
            >
              {uploading ? (
                <>
                  <Upload className="animate-bounce" size={16} />
                  Uploading {Math.round(progress)}%
                </>
              ) : (
                <>
                  <CheckCircle2 size={16} />
                  Save & Publish Video
                </>
              )}
            </button>
            {uploading && (
              <div className="w-full bg-zinc-800 h-1 mt-4 rounded overflow-hidden">
                <div className="bg-white h-full transition-all duration-300" style={{ width: `${progress}%` }} />
              </div>
            )}
          </div>
        </form>
      </div>

      {/* ── EXISTING VIDEOS ── */}
      <div>
        <h3 className="font-semibold text-lg uppercase tracking-wider text-zinc-300 mb-4 border-b border-zinc-800 pb-2">
          Published Videos ({videos.length})
        </h3>
        
        {loading ? (
          <div className="text-zinc-500 text-sm py-4">Loading videos...</div>
        ) : videos.length === 0 ? (
          <div className="text-zinc-500 text-sm py-4">No videos uploaded yet. Upload your first video above.</div>
        ) : (
          <div className="grid gap-4 mt-6">
            {videos.map((video) => (
              <div key={video.id} className="bg-zinc-900 border border-zinc-800 p-4 rounded-lg flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-black rounded flex items-center justify-center flex-shrink-0">
                    <FileVideo className="text-zinc-500" size={24} />
                  </div>
                  <div>
                    <h4 className="text-white font-medium">{video.title}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[10px] uppercase tracking-wider bg-zinc-800 px-2 py-0.5 rounded text-zinc-300">
                        {video.category}
                      </span>
                      <span className="text-xs text-zinc-500">{video.subcategory}</span>
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={() => handleDelete(video.id, video.videoSrc)}
                  className="text-red-400 hover:text-red-300 hover:bg-red-500/10 p-2 rounded transition-colors flex items-center gap-2 text-sm"
                >
                  <Trash2 size={16} />
                  <span className="hidden sm:inline">Delete</span>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
