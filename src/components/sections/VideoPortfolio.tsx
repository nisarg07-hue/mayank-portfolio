"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import "./video-portfolio.css";

/* ═══════════════════════════════════════════════════════════
   DATA — every video card defined here
   ═══════════════════════════════════════════════════════════ */

type VideoCardData = {
  id: string;
  category: "gym" | "realestate" | "gameplay";
  subcategory: string;
  title: string;
  meta: string;
  thumbnail: string;
  videoSrc: string;
  duration: string;
  genreTag?: string;
  /** If true, thumbnail will be auto-generated from the video's first frame */
  autoThumb?: boolean;
};

const VIDEO_DATA: VideoCardData[] = [
  // ── GYM (4) ──
  {
    id: "gym-1",
    category: "gym",
    subcategory: "Fitness Reel",
    title: "Personal Best — Reel 1",
    meta: "Vertical · Instagram Reels",
    thumbnail: "/work/poster-1.svg",
    videoSrc: "/work/pb-reel-4.mp4",
    duration: "Reel",
    autoThumb: true,
  },
  {
    id: "gym-2",
    category: "gym",
    subcategory: "Fitness Reel",
    title: "Personal Best — Reel 2",
    meta: "Vertical · Instagram Reels",
    thumbnail: "/work/poster-2.svg",
    videoSrc: "/work/pb-reel-7.mp4",
    duration: "Reel",
    autoThumb: true,
  },
  {
    id: "gym-3",
    category: "gym",
    subcategory: "Fitness Reel",
    title: "Personal Best — Reel 3",
    meta: "Vertical · Instagram Reels",
    thumbnail: "/work/poster-3.svg",
    videoSrc: "/work/pb-reel-main.mp4",
    duration: "Reel",
    autoThumb: true,
  },
  {
    id: "gym-4",
    category: "gym",
    subcategory: "Event Promo",
    title: "GGN 104 — Highlight",
    meta: "Vertical · Instagram Reels",
    thumbnail: "/work/poster-4.svg",
    videoSrc: "/work/ggn-104-reel.mp4",
    duration: "Reel",
    autoThumb: true,
  },

  // ── REAL ESTATE (1) ──
  {
    id: "re-1",
    category: "realestate",
    subcategory: "Real Estate Reel",
    title: "AM RS Reel",
    meta: "Vertical · Instagram Reels",
    thumbnail: "/work/poster-5.svg",
    videoSrc: "/work/AM RS REEL -1.mp4",
    duration: "Reel",
    autoThumb: true,
  },

  // ── GAMEPLAY (1) ──
  {
    id: "gp-1",
    category: "gameplay",
    subcategory: "Esports Edit",
    title: "S8UL Edit",
    meta: "Gaming · YouTube Shorts",
    thumbnail: "/work/poster-6.svg",
    videoSrc: "/work/s8ul-edit.mp4",
    duration: "Reel",
    genreTag: "Gaming Cut",
    autoThumb: true,
  },
];

/* ═══════════════════════════════════════════════════════════
   CONSTANTS
   ═══════════════════════════════════════════════════════════ */

const CATEGORY_COLORS: Record<string, string> = {
  gym: "var(--sw-gym)",
  realestate: "var(--sw-realestate)",
  gameplay: "var(--sw-gameplay)",
};

const CATEGORY_LABELS: Record<string, string> = {
  gym: "Gym & Fitness",
  realestate: "Real Estate",
  gameplay: "Gameplay",
};

const FILTER_TABS = [
  { key: "all", label: "All" },
  { key: "gym", label: "Gym & Fitness" },
  { key: "realestate", label: "Real Estate" },
  { key: "gameplay", label: "Gameplay" },
] as const;

/* ═══════════════════════════════════════════════════════════
   FULLSCREEN VIDEO MODAL
   ═══════════════════════════════════════════════════════════ */

function VideoModal({
  card,
  onClose,
}: {
  card: VideoCardData;
  onClose: () => void;
}) {
  const [open, setOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);

  // Animate in
  useEffect(() => {
    const t = window.setTimeout(() => setOpen(true), 20);
    return () => window.clearTimeout(t);
  }, []);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // Escape key
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") requestClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function requestClose() {
    setOpen(false);
    window.setTimeout(onClose, 280);
  }

  const accentColor = CATEGORY_COLORS[card.category];

  return (
    <div
      className={`sw-modal-overlay${open ? " sw-modal-open" : ""}`}
      role="dialog"
      aria-modal="true"
      aria-label={card.title}
    >
      {/* Backdrop */}
      <div
        ref={backdropRef}
        className="sw-modal-backdrop"
        onClick={requestClose}
      />

      {/* Modal content */}
      <div className="sw-modal-container">
        {/* Header */}
        <div className="sw-modal-header">
          <div className="sw-modal-header-info">
            <span className="sw-modal-category" style={{ background: accentColor }}>
              {card.subcategory}
            </span>
            <h2 className="sw-modal-title">{card.title}</h2>
            <p className="sw-modal-meta">{card.meta}</p>
          </div>
          <button
            className="sw-modal-close"
            onClick={requestClose}
            aria-label="Close"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Video */}
        <div className="sw-modal-video-wrap">
          <video
            ref={videoRef}
            controls
            autoPlay
            playsInline
            className="sw-modal-video"
          >
            <source src={card.videoSrc} type="video/mp4" />
          </video>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   VIDEO CARD
   ═══════════════════════════════════════════════════════════ */

function VideoCard({
  card,
  index,
  onOpenModal,
}: {
  card: VideoCardData;
  index: number;
  onOpenModal: (card: VideoCardData) => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [previewing, setPreviewing] = useState(false);
  const [visible, setVisible] = useState(false);
  const [muted, setMuted] = useState(true);
  const [thumbUrl, setThumbUrl] = useState(card.thumbnail);
  const isTouchRef = useRef(false);

  /* Auto-generate thumbnail from video frame */
  useEffect(() => {
    if (!card.autoThumb) return;

    const tempVideo = document.createElement("video");
    tempVideo.crossOrigin = "anonymous";
    tempVideo.muted = true;
    tempVideo.preload = "metadata";
    tempVideo.src = card.videoSrc;

    const onSeeked = () => {
      try {
        const canvas = document.createElement("canvas");
        canvas.width = tempVideo.videoWidth || 640;
        canvas.height = tempVideo.videoHeight || 360;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(tempVideo, 0, 0, canvas.width, canvas.height);
          const dataUrl = canvas.toDataURL("image/jpeg", 0.85);
          if (dataUrl && dataUrl.length > 100) {
            setThumbUrl(dataUrl);
          }
        }
      } catch (err) {
        console.warn("Failed to generate thumbnail due to CORS or other error:", err);
      }
      tempVideo.removeEventListener("seeked", onSeeked);
      tempVideo.src = "";
      tempVideo.load();
    };

    const onLoaded = () => {
      // Seek to 1 second in for a better frame
      tempVideo.currentTime = Math.min(1, tempVideo.duration * 0.1);
      tempVideo.removeEventListener("loadeddata", onLoaded);
    };

    tempVideo.addEventListener("loadeddata", onLoaded);
    tempVideo.addEventListener("seeked", onSeeked);
    tempVideo.load();

    return () => {
      tempVideo.removeEventListener("loadeddata", onLoaded);
      tempVideo.removeEventListener("seeked", onSeeked);
      tempVideo.src = "";
    };
  }, [card.autoThumb, card.videoSrc]);

  /* Mark card visible when it enters the viewport (entrance animation) */
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            io.disconnect();
            break;
          }
        }
      },
      { threshold: 0.05, rootMargin: "100px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const startPreview = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    const onCanPlay = () => {
      setPreviewing(true);
      video.removeEventListener("canplay", onCanPlay);
    };

    if (!loaded) {
      video.src = card.videoSrc;
      video.addEventListener("canplay", onCanPlay);
      video.load();
      setLoaded(true);
    } else {
      setPreviewing(true);
    }

    video.currentTime = 0;
    video.muted = muted;

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Autoplay blocked
      });
    }
  }, [loaded, card.videoSrc, muted]);

  const stopPreview = useCallback(() => {
    const video = videoRef.current;
    if (video) video.pause();
    setPreviewing(false);
    setMuted(true); // Reset mute state when leaving
  }, []);

  /* Toggle mute on the preview video */
  const toggleMute = useCallback((e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent the card click from firing
    const video = videoRef.current;
    if (!video) return;
    const newMuted = !muted;
    setMuted(newMuted);
    video.muted = newMuted;
  }, [muted]);

  /* Desktop hover */
  const onMouseEnter = useCallback(() => {
    if (isTouchRef.current) return;
    startPreview();
  }, [startPreview]);

  const onMouseLeave = useCallback(() => {
    if (isTouchRef.current) return;
    stopPreview();
  }, [stopPreview]);

  /* Mobile tap-to-preview */
  const onTouchStart = useCallback(() => {
    isTouchRef.current = true;
  }, []);

  /* Click to open modal (desktop) or toggle preview (mobile) */
  const onCardClick = useCallback(() => {
    if (isTouchRef.current) {
      // Mobile: first tap = preview, second tap = open modal
      if (previewing) {
        stopPreview();
        onOpenModal(card);
      } else {
        startPreview();
      }
    } else {
      // Desktop: click always opens modal
      stopPreview();
      onOpenModal(card);
    }
  }, [previewing, startPreview, stopPreview, onOpenModal, card]);

  const accentColor = CATEGORY_COLORS[card.category];

  const cardClasses = [
    "sw-card",
    visible ? "sw-card-visible" : "",
    previewing ? "is-previewing" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      ref={cardRef}
      className={cardClasses}
      style={{ "--sw-card-delay": `${index * 80}ms` } as React.CSSProperties}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onTouchStart={onTouchStart}
      onClick={onCardClick}
    >
      <div className="sw-card-media">
        {/* Thumbnail */}
        <div className="sw-thumb">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={thumbUrl} alt={card.title} loading="lazy" />
        </div>

        {/* Video preview */}
        <video
          ref={videoRef}
          muted={muted}
          loop
          playsInline
          preload="none"
          poster={thumbUrl}
        />

        {/* Play overlay */}
        <div className="sw-card-play">
          <div className="sw-card-play-ring">
            <div className="sw-card-play-arrow" />
          </div>
        </div>

        {/* Hover hint */}
        <div className="sw-hover-hint">Hover to preview · Click to play</div>

        {/* Mute/Unmute toggle button */}
        <button
          className="sw-mute-toggle"
          onClick={toggleMute}
          aria-label={muted ? "Unmute preview" : "Mute preview"}
          type="button"
        >
          {muted ? (
            <>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                <line x1="23" y1="9" x2="17" y2="15" />
                <line x1="17" y1="9" x2="23" y2="15" />
              </svg>
              <span>Unmute</span>
            </>
          ) : (
            <>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
              </svg>
              <span>Mute</span>
            </>
          )}
        </button>

        {/* Genre tag (gameplay cards) */}
        {card.genreTag && (
          <span className="sw-genre-tag">{card.genreTag}</span>
        )}

        {/* Duration */}
        <span className="sw-card-duration">{card.duration}</span>
      </div>

      <div className="sw-card-info">
        <span className="sw-card-label" style={{ background: accentColor }}>
          {card.subcategory}
        </span>
        <p className="sw-card-title">{card.title}</p>
        <p className="sw-card-meta">{card.meta}</p>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   CATEGORY SECTION — renders header + cards in layout
   ═══════════════════════════════════════════════════════════ */

function CategorySection({
  category,
  cards,
  id,
  onOpenModal,
}: {
  category: string;
  cards: VideoCardData[];
  id: string;
  onOpenModal: (card: VideoCardData) => void;
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [sectionVisible, setSectionVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setSectionVisible(true);
            io.disconnect();
            break;
          }
        }
      },
      { threshold: 0.06 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const accentColor = CATEGORY_COLORS[category];
  const label = CATEGORY_LABELS[category];
  const count = String(cards.length).padStart(2, "0");

  return (
    <div ref={sectionRef} className={`sw-section${sectionVisible ? " sw-visible" : ""}`} id={id}>
      <div className="sw-section-header">
        <div className="sw-section-bar" style={{ background: accentColor }} />
        <h3 className="sw-section-title">{label}</h3>
        <span className="sw-section-count">{count} Projects</span>
      </div>
      {renderCategoryGrid(category, cards, onOpenModal)}
    </div>
  );
}

/* Renders the specific grid layout per category */
function renderCategoryGrid(category: string, cards: VideoCardData[], onOpenModal: (card: VideoCardData) => void) {
  if (!cards || cards.length === 0) {
    return <div className="text-zinc-500 py-10 px-4">No videos in this category yet.</div>;
  }

  // Uniform 3-column grid for all categories to "reduce size" as requested
  return (
    <div className="sw-grid-3">
      {cards.map((c, i) => (
        <VideoCard key={c.id || i} card={c} index={i} onOpenModal={onOpenModal} />
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   MAIN EXPORTED COMPONENT
   ═══════════════════════════════════════════════════════════ */

export function VideoPortfolio() {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [modalCard, setModalCard] = useState<VideoCardData | null>(null);
  const [dbVideos, setDbVideos] = useState<VideoCardData[]>(VIDEO_DATA);

  useEffect(() => {
    const q = query(collection(db, "videos"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      // As a convenience, if production DB is empty, keep showing hardcoded fallback to prevent blank sites
      if (snapshot.empty) return;
      
      const data: VideoCardData[] = [];
      snapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() } as VideoCardData);
      });
      setDbVideos(data);
    });

    return () => unsubscribe();
  }, []);

  /* Group cards by category */
  const grouped = {
    gym: dbVideos.filter((c) => c.category === "gym"),
    realestate: dbVideos.filter((c) => c.category === "realestate"),
    gameplay: dbVideos.filter((c) => c.category === "gameplay"),
  };

  const visibleCategories =
    activeFilter === "all"
      ? (["gym", "realestate", "gameplay"] as const)
      : ([activeFilter] as const);

  const scrollToCategory = (key: string) => {
    setActiveFilter(key);
    if (key === "all") {
      const el = document.getElementById("selected-work");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    setTimeout(() => {
      const el = document.getElementById(`sw-${key}`);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  const openModal = useCallback((card: VideoCardData) => {
    setModalCard(card);
  }, []);

  const closeModal = useCallback(() => {
    setModalCard(null);
  }, []);

  return (
    <>
      <section id="selected-work" className="selected-work">
        {/* ── Sticky Sub-Nav ── */}
        <nav className="sw-subnav" aria-label="Portfolio category filter">
          {FILTER_TABS.map((tab) => (
            <button
              key={tab.key}
              className={`sw-subnav-btn${activeFilter === tab.key ? " active" : ""}`}
              onClick={() => scrollToCategory(tab.key)}
              type="button"
            >
              {tab.label}
            </button>
          ))}
        </nav>

        {/* ── Category Sections ── */}
        <div style={{ padding: "0 24px" }}>
          {visibleCategories.map((cat) => (
            <CategorySection
              key={cat}
              category={cat}
              cards={grouped[cat as keyof typeof grouped]}
              id={`sw-${cat}`}
              onOpenModal={openModal}
            />
          ))}

          {/* ── Mid CTA (Show after all videos) ── */}
          <div className="sw-mid-cta">
            <div>
              <p className="sw-mid-cta-text">LOVE THE WORK?</p>
              <p className="sw-mid-cta-sub">
                Let&apos;s talk about your next project.
              </p>
            </div>
            <a href="#contact" className="sw-cta-btn">
              Book a Discovery Call →
            </a>
          </div>
        </div>
      </section>

      {/* ── Fullscreen Video Modal ── */}
      {modalCard && <VideoModal card={modalCard} onClose={closeModal} />}
    </>
  );
}
