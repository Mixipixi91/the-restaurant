//import React from 'react';
import '../styles/kontakt.scss';




const Kontakt = () => {
  return (
      <div className="kontakt-container">
        <div className="hero-image">
        </div>

        <div className="kontakt-form">
            <h1>Kontakta oss</h1>
          <h2>Skicka ett meddelande</h2>
          <form>
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input type="text" id="name" name="name" required />
            </div>
            <div className="form-group">
              <label htmlFor="email">E-mail:</label>
              <input type="email" id="email" name="email" required placeholder='email@email.com' />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message:</label>
              <textarea id="message" name="message" required></textarea>
            </div>
            <div className="form-group">
              <label>
                Skicka även en kopia till mig
                <input type="checkbox" name="copyToMe" />
              </label>
            </div>
            <div className="form-group">
              <label>
                Genom att gå vidare accepterar du Gastrogates integritetspolicy i egenskap av personuppgiftsbiträde samt restaurangens integritetspolicy som personuppgiftsansvarig vad gäller hantering av dina personuppgifter
                <input type="checkbox" name="acceptPolicy" required />
              </label>
            </div>
            <button type="submit" className="submit-btn">Skicka</button>
          </form>
        </div>
      </div>
    
  );
};

export default Kontakt;
