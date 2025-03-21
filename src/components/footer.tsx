import facebookImg from "../assets/facebook_circle.png";
import instagramImg from "../assets/instagram_circle.png";
import tripadvisorImg from "../assets/tripadvisor_circle.png";
import medieinstitutet from "../assets/logomedieinstitutet-370x73.png";
import "../styles/footer.scss";
import { Link } from "react-router";

export const Footer = () => {
  return (
    <>
      <div className="footer-container">
        <section className="footer-contact-info">
          <h2>DalaNissa</h2>
          <ul>
            <li>Adress:</li>
            <span>Vikingagatan 7 113 42 Stockholm</span>
            <li>Telefon:</li>
            <span className="a">08-335575</span>
            <li>E-post:</li>
            <span className="a">restaurangdalanissa@gmail.com</span>
            <li>Hemsida:</li>
            <span className="a">www.dalanissa.se</span>
          </ul>
          <div className="socialMedia-logs">
            <img className="logImg" src={facebookImg} alt="FacebookLog" />
            <img className="logImg" src={instagramImg} alt="InstagramLog" />
            <img className="logImg" src={tripadvisorImg} alt="TripadvisorLog" />
          </div>
        </section>

        <section className="table-hours">
          <h3>Öppettider</h3>
          <div>
            <span className="gray-title">Lunch</span>
          </div>
          <div>
            <span>Vardagar </span>
            <span className="hours">10:30 - 14:30</span>
          </div>
          <div>
            <span className="gray-title">Kväll</span>
          </div>
          <div>
            <span>Måndag-torsdag </span>
            <span className="hours"> 16:30 - 23:00</span>
          </div>
          <div>
            <span>Fredag </span>
            <span className="hours"> 16:30 - 00:00</span>
          </div>
          <div>
            <span>Lördag </span>
            <span className="hours"> 16:00 - 00:00</span>
          </div>
        </section>
        <div className="map-container">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1984.813975007768!2d18.043299676116968!3d59.33801208166842!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x465f9d669f1bbbd7%3A0x4ab4d6bb4f7ef71e!2sVikingagatan%207%2C%20113%2042%20Stockholm%2C%20Sweden!5e0!3m2!1sen!2s!4v1679675256784!5m2!1sen!2s"
            // width="400"
            // height="400"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
        <div className="institution-log-container">
          <img className="institution-img" src={medieinstitutet} alt="" />
          <p>
            Levereras av Medieinstitutets studenter | Medieinstitutet den
            ledande utbildningsguiden inom Yrkeshögskolor | &copy;2025
            Medieinstitutet
          </p>
          <p>
            <Link to="/booking/user/admin">Logga in som krögare</Link>
          </p>
        </div>
      </div>
    </>
  );
};