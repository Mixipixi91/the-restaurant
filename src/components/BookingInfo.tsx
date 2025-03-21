import { FormEvent, useEffect, useRef } from "react";
import '../styles/bookingInfo/BookingInfo.scss';

type BookingInfoProps = {
  name: string;
  lastname: string;
  email: string;
  phone: string;
  numberOfGuests: number;
  setName: (value: string) => void;
  setLastname: (value: string) => void;
  setEmail: (value: string) => void;
  setPhone: (value: string) => void;
  handleSubmit: (e: FormEvent) => void;
  handleCancel: () => void;
  gdprConsent: boolean;
  setGdprConsent: (value: boolean) => void;
};

export const BookingInfo = ({
  name,
  lastname,
  email,
  phone,
  numberOfGuests,
  setName,
  setLastname,
  setEmail,
  setPhone,
  handleSubmit,
  handleCancel,
  gdprConsent,
  setGdprConsent,
}: BookingInfoProps) => {
  

  return (
    <div className="booking-info">
      <h1>Booking Info</h1>
      <form onSubmit={handleSubmit} className="booking-form">
        <label>
          Namn *
        </label>
          <input type="text" name="firstname" value={name} onChange={(e) => setName(e.target.value)} required />
        <label>
          Efternamn *
        </label>
          <input type="text" name="lastname" value={lastname} onChange={(e) => setLastname(e.target.value)} required />
        <label>
          E-postadress *
        </label>
          <input type="text" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <label>
          Telefonnummer *
        </label>
          <input
            type="text"
            name="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            placeholder="+46 XX XXX XX XX"
          />
        <label>
          Antal gäster *
        </label>
          <input type="number" name="numberOfGuests" value={numberOfGuests} readOnly />
        <label className="gdpr-consent">
          I agree to the GDPR consent.
        <input className="check-box" type="checkbox" checked={gdprConsent} onChange={(e) => setGdprConsent(e.target.checked)} />
        </label>
        <div className="form-buttons">
          <button type="button" onClick={handleCancel}>Cancel</button>
          <button type="submit">Book</button>
        </div>
      </form>
    </div>
  );
};