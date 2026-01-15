import React, { useEffect, useState } from "react";
import PortfolioCard from "./PortfolioCard";
import artworksData from "../data/artworks.json";
import type { Artwork } from "./PortfolioGrid";

type Filter = "all" | "forSale";

const Portfolio: React.FC = () => {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [filter, setFilter] = useState<Filter>("all");

  useEffect(() => {
    setArtworks(artworksData);
  }, []);

  const filteredArtworks =
    filter === "all" ? artworks : artworks.filter((art) => art.forSale);

  return (
    <section id="artworks" className="py-5 bg-light">
      <div className="container">
        <h2 className="text-center mb-4 fw-bold">Artworks</h2>

        {/* Filter buttons */}
        <div className="d-flex justify-content-center mb-4 gap-3">
          <button
            className={`btn ${filter === "all" ? "btn-dark" : "btn-outline-dark"}`}
            onClick={() => setFilter("all")}
          >
            All
          </button>

          <button
            className={`btn ${filter === "forSale" ? "btn-dark" : "btn-outline-dark"}`}
            onClick={() => setFilter("forSale")}
          >
            Available for Sale
          </button>
        </div>

        {/* Grid */}
        <div className="row">
          {filteredArtworks.map((artwork) => (
            <PortfolioCard
              key={artwork.slug}
              artwork={artwork}
              onOpen={() => console.log(`Opening artwork: ${artwork.slug}`)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
