// src/components/Lightbox.tsx
import React, { useEffect } from "react";
import "./Lightbox.css";
import type { Artwork } from "./PortfolioGrid";

interface Props {
  artworks: Artwork[];
  currentIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  imageSrc?: string;
}

const Lightbox: React.FC<Props> = ({
  artworks,
  currentIndex,
  onClose,
  onNext,
  onPrev,
  imageSrc,
}) => {
  const artwork = artworks[currentIndex];

  useEffect(() => {
    console.log(`Lightbox opened for index: ${currentIndex}`);

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft") onPrev();
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [currentIndex, onClose, onNext, onPrev]);

  return (
    <div className="lightbox-backdrop" onClick={onClose}>
      <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
        {/* Image */}
        <img src={imageSrc ?? artwork.image} alt={artwork.title} />

        {/* Details */}
        <div className="lightbox-info">
          <h4>{artwork.title}</h4>
          <p>
            {artwork.medium} <br />
            {artwork.size} <br />
            {artwork.year}
          </p>
        </div>

        {/* Controls */}
        <button className="lightbox-close" onClick={onClose}>×</button>
        <button className="lightbox-prev" onClick={onPrev}>‹</button>
        <button className="lightbox-next" onClick={onNext}>›</button>
      </div>
    </div>
  );
};

export default Lightbox;
