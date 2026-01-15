// React import not required with the new JSX transform
import { Analytics } from "@vercel/analytics/react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import PortfolioGrid from "./components/PortfolioGrid";
import About from "./components/about";
import Contact from "./components/Contact";

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <PortfolioGrid />
      <About />
      <Contact />
      <Analytics />
    </>
  );
}

export default App;
