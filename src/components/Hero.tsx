import React, { useEffect, useState } from "react";
import "./Hero.css";

const Hero: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      // Hide as soon as the user scrolls down a few pixels
      setScrolled(window.scrollY > 7);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      className={`hero-section ${scrolled ? "scrolled" : ""}`}
      style={{
        backgroundImage: `url(/img/hero-bg.jpg)`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
      }}
    >
      <div className="hero-content" aria-hidden={scrolled}>
       {/*<h1 className="display-4 fw-bold">Welcome to My Portfolio</h1>*/}
        <p className="display-4 fw-bold">A visual study into the human form and being. </p>

        <blockquote className="hero-quote">
        “My work is not to make you see a person. It is to make you feel the space their absence would leave.”
          <br />
          <span className="hero-quote-author">— From The Painter's Journal</span>
        </blockquote>
      </div>
    </section>
  );
};

export default Hero;