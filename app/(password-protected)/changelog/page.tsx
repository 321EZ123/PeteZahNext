"use client";

import { useRef } from "react";

export default function FeedbackPage() {
  const loadingDivRef = useRef<HTMLDivElement>(null);

  const handleLoad = () => {
    if (loadingDivRef.current) {
      loadingDivRef.current.style.display = "none";
    }
  };

  return (
    <div className="w-full h-full relative overflow-hidden">
      <iframe
        src="https://petezah.feedbase.app/changelog"
        className="w-full h-full border-0 overflow-hidden"
        title="Feedback"
        onLoad={handleLoad}
      />
      <div
        ref={loadingDivRef}
        className="absolute inset-0 flex items-center justify-center bg-black text-white z-50"
      >
        Loading...
      </div>
    </div>
  );
}
