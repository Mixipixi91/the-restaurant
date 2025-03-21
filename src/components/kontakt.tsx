//import React from 'react';
import '../styles/kontakt.scss';


const Kontakt = () => {
  return (
    <div className="kontakt-container">
      
      <div className="hero-image">
        <h1>Kontakta oss</h1>
      </div>

      <div className="kontakt-form">
        <h2>Skicka ett meddelande</h2>
        <form>
          <div className="form-group">
            <label htmlFor="name">Name : </label>
            <input type="text" id="name" name="name" required />
          </div>
          <div className="form-group">
            <label htmlFor="email">E-mail :</label>
            <input type="email" id="email" name="email" required />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message : </label>
            <textarea id="message" name="message" required></textarea>
          </div>
          <div className="form-group">
            <label>
              <input type="checkbox" name="copyToMe" />
              Skicka även en kopia till mig
            </label>
          </div>
          <div className="form-group">
            <label>
              <input type="checkbox" name="acceptPolicy" required />
              Genom att gå vidare accepterar du Gastrogates integritetspolicy i egenskap av personuppgiftsbiträde samt restaurangens integritetspolicy som personuppgiftsansvarig vad gäller hantering av dina personuppgifter
            </label>
          </div>
          <button type="submit" className="submit-btn">Send : </button>
        </form>
      </div>
    </div>
  );
};

export default Kontakt;
