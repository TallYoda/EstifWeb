// src/components/About.tsx
import React from "react";
import "./about.css";


const About: React.FC = () => {
  return (
    <section id="about" className="about section py-5">
      <div className="container" data-aos="fade-up" data-aos-delay="100">
        {/* Intro Row */}
        <div className="row gy-4 justify-content-center align-items-start">
          <div className="col-lg-4">
            <img
              src="/images/portrait.jpg"
              className="img-fluid rounded"
              alt="Mikiyas Sintayehu"
            />
          </div>

          <div className="col-lg-8 content">
            <h2>Estifanos Abebe, Visual Artist.</h2>

            <p className="fst-italic py-3">
            My work is rooted in the endless exploration of the human body and its relationship with the environment. With Most of my subjects being women, 
            I intend to tell the stories of Ethiopian women who are overlooked yet are the pillars of everything we know and have.
            </p>

            <div className="row">
              <div className="col-lg-6">
                <ul>
                  <li>
                    <i className="bi bi-chevron-right"></i>
                    <strong>Name:</strong>
                    <span>Estifanos Abebe</span>
                  </li>
                  <li>
                    <i className="bi bi-chevron-right"></i>
                    <strong>Birthday:</strong>
                    <span>13 April 1998</span>
                  </li>
                  <li>
                    <i className="bi bi-chevron-right"></i>
                    <strong>Nationality:</strong>
                    <span>Ethiopian</span>
                  </li>
                </ul>
              </div>

              <div className="col-lg-6">
                <ul>
                  <li>
                    <i className="bi bi-chevron-right"></i>
                    <strong>Age:</strong>
                    <span>28</span>
                  </li>
                  <li>
                    <i className="bi bi-chevron-right"></i>
                    <strong>Commissions:</strong>
                    <span>Available</span>
                  </li>
                  <li>
                    <i className="bi bi-chevron-right"></i>
                    <strong>City:</strong>
                    <span>Addis Ababa, Ethiopia</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Biography */}
        <div className="section-title mt-5">
          <h2>Biography</h2>
          <p>
          My name is Estifanos, a portrait and figure artist based in Ayat AA. I work with  acrylic on large canvases(averaging 120cm x 100cm). 
          I graduated from Enlightened Art Academy in 2017 and Entoto Fine Art in 2021. I also spent time teaching at Enlightened Art Academy. 
          </p>
          
          <p>
            I am currently a studio artist based in Addis Ababa, exploring the
            the different ways I can Visually tell Stories.
          </p>
        </div>

        
      </div>
    </section>
  );
};

export default About;
