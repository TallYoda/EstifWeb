import React from "react";
import type { Artwork } from "./PortfolioGrid";

interface Props {
  artwork: Artwork;
  onOpen: () => void;
  imageSrc?: string;
}

const PortfolioCard: React.FC<Props> = ({ artwork, onOpen, imageSrc }) => {
  return (
    <div className="portfolio-item">
      <div className="card border-0 shadow-sm h-100">
        <div className="card-img-wrapper">
          <img
            src={imageSrc ?? artwork.thumbnail}
            alt={artwork.title}
            className="card-img-top"
            loading="lazy"
            style={{ cursor: "pointer" }}
            onClick={() => {
              console.log(`PortfolioCard clicked: ${artwork.title}`);
              onOpen();
            }}
          />
        </div>

        <div className="card-body text-center">
          <h5 className="card-title">{artwork.title}</h5>
          <p className="card-text small text-muted">
            {artwork.medium}
            <br />
            {artwork.size}
            <br />
            {artwork.year}
          </p>

          <button
            className="btn btn-outline-dark btn-sm"
            onClick={onOpen}
          >
            Get a Closer Look
          </button>
        </div>
      </div>
    </div>
  );
};

export default PortfolioCard;

