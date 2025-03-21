import { useState } from "react";
import logo from "../assets/restaurantlogo.png";
import "../styles/navbar.css";
import "../styles/Home.css";
import { Link } from "react-router";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false); // Hanterar menyöppning för mobilversion

  return (
    <nav className="navbar">
      {/* Logotyp */}
     
      <Link to="/"> 
      <img className="logo" src={logo} alt="Restaurangens logotyp" />
       </Link>

      {/* Hamburgermeny för mobil */}
      <div className="hamburger-menu" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </div>

      {/* Navigeringslänkar */}
      <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
        < Link to="/booking"> Boka bord </Link>
        
      
        < Link to= "/kontakt"> Kontakt </Link>
       
      </ul>
    </nav>
  );
};

export default Navbar;