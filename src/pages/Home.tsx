
import "../styles/Home.css"; 
import headerImage from "../assets/header-image.jpeg"; 

import bokaBord from "../assets/boka-bord.jpg"; 
import veckansMenu from "../assets/veckansmenu.jpg"; 
import tripadvisorAward from "../assets/tripadvisor.png"; 
import { Link } from "react-router";

const Home = () => {
  
  return (
    <div className="home-container">
     

      {/* Bakgrundsbild */}
      <img className="background-image" src={headerImage} alt="Header" />

      {/* Text under bilden */}
      <section className="restaurant-info">
        <h2>RESTAURANG DALANISSA</h2>
        <p>Varmt välkommen till DalaNissa! Vi är en familjeägd restaurang sedan 2007.</p>
        <p>Namnet DalaNissa grundande sig i svensk husmanskost, som vi har behållit med
          klassiska rätter och har med tiden utvecklat moderna rätter med spännande ingredienser.</p>
        <p>Vi är ett ambitiöst team som är passionerade över god mat, trivsam miljö och god service.
          Vi önskar att varje måltid ska vara en minnesvärd upplevelse för våra gäster och dess sällskap.</p>
        <p><strong>Hjärtligt välkomna in!</strong></p>
      </section>

      {/* Bildgalleri */}
      <section className="image-gallery">
        <div className="gallery-item">
          <Link to="booking">
            <img src={bokaBord} alt="Boka bord" className="gallery-image" />
            <span className="image-text">Boka Bord</span>
            </Link>
        </div>
        <div className="gallery-item">
          <a href="https://www.dalanisse.se/lunchmeny/" target="_blank">
            <img src={veckansMenu} alt="Veckans Lunch" className="gallery-image" />
            <span className="image-text">Veckans Lunch</span>
          </a>
        </div>
        <div className="gallery-item">
          <img src={tripadvisorAward} alt="Tripadvisor Award" className="gallery-image" />
        </div>
      </section>
    </div>
  );
};

export default Home;
