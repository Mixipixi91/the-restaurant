import { useState, useEffect, FormEvent } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays, faUser, faClock } from '@fortawesome/free-solid-svg-icons';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Booking, Day, ISelectedSlot, TimeSlot } from "../models/Booking";
import { getBookingsByRestaurantId } from '../services/bookingService';
import '../styles//BookingInfo/editBooking.scss';

interface EditBookingProps {
  booking: Booking;
  onSave: (updatedBooking: Booking) => void;
  onCancel: () => void;
}

interface FormData {
  name: string;
  lastname: string;
  email: string;
  phone: string;
  numberOfGuests: number;
  date: string;
  time: string;
  gdprConsent: boolean;
}

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const EditBooking = ({ booking, onSave, onCancel }: EditBookingProps) => {
  const [formData, setFormData] = useState<FormData>({
    name: booking.name || '',
    lastname: booking.lastname || '',
    email: booking.email || '',
    phone: booking.phone || '',
    numberOfGuests: booking.numberOfGuests || 1,
    date: new Date(booking.date).toISOString().split('T')[0],
    time: booking.time || '',
    gdprConsent: true,
  });

  const [activeInput, setActiveInput] = useState<string>('');
  const [selectedSlot, setSelectedSlot] = useState<ISelectedSlot | null>(null);
  const [availableTables, setAvailableTables] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    const fetchAvailableTables = async () => {
      if (formData.date) {
        const restaurantId = '67ab1d2b6c6da27544081a1c';
        try {
          const existingBookings = await getBookingsByRestaurantId(restaurantId);
          const updatedTables = ['18:00', '21:00'].reduce((acc, time) => {
            const bookingsForTimeSlot = existingBookings.filter(b =>
              new Date(b.date).toLocaleDateString() === new Date(formData.date).toLocaleDateString() &&
              b.time === time
            );
            acc[time] = 15 - bookingsForTimeSlot.length;
            return acc;
          }, {} as { [key: string]: number });
          setAvailableTables(updatedTables);
        } catch (error) {
          console.error("Error fetching available tables:", error);
        }
      }
    };

    fetchAvailableTables();
  }, [formData.date]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSlotSelect = (day: Day, time: TimeSlot) => {
    setSelectedSlot({ day, time });
    setFormData({ ...formData, time });
  };

  const handleDateSelect = (value: Value) => {
    if (value instanceof Date) {
      const localDate = new Date(value.getTime() - value.getTimezoneOffset() * 60000);
      setFormData({ 
        ...formData, 
        date: localDate.toISOString().split('T')[0]
      });
    }
  };

  const handlePersonsSelect = (num: number) => {
    setFormData({ ...formData, numberOfGuests: num });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const updatedBooking = new Booking(
      booking._id,
      formData.name,
      formData.lastname,
      formData.email,
      formData.phone,
      formData.numberOfGuests,
      new Date(formData.date),
      formData.time,
      booking.customerId
    );
    onSave(updatedBooking);
  };

  return (
    <div className="container">
      <div className='booking-options'>
        <button onClick={() => setActiveInput('persons')}>
          <FontAwesomeIcon icon={faUser} /> {formData.numberOfGuests} Person
        </button>
        <button onClick={() => setActiveInput('date')}>
          <FontAwesomeIcon icon={faCalendarDays} /> 
          {new Date(formData.date + 'T00:00:00').toLocaleDateString('en-GB', { 
            day: 'numeric', 
            month: 'short' 
          })}
        </button>
        <button onClick={() => setActiveInput('time')}>
          <FontAwesomeIcon icon={faClock} /> {selectedSlot?.time || 'Select Time'}
        </button>
      </div>
      <div className='options'>
        {activeInput === 'time' && (
          <div className='time-options'>
            {Object.keys(availableTables).map((time) => (
              <button key={time} onClick={() => handleSlotSelect('Mon', time as TimeSlot)}>
                {time} ({availableTables[time]})
              </button>
            ))}
          </div>
        )}
        {activeInput === 'date' && (
          <div className='date-options'>
            <Calendar 
              onChange={handleDateSelect}
              value={new Date(formData.date)} 
              minDate={new Date()} 
            />
          </div>
        )}
        {activeInput === 'persons' && (
          <div className='persons-options'>
            {[1, 2, 3, 4, 5, 6].map((num) => (
              <button key={num} onClick={() => handlePersonsSelect(num)}>
                {num} Person
              </button>
            ))}
          </div>
        )}
      </div>
      <form className="edit-form" onSubmit={handleSubmit}>
        <label>
          Förnamn *
        </label>
        <input type="text" name="name" value={formData.name} onChange={handleInputChange} required />
        <label>
          Efternamn *
        </label>
        <input type="text" name="lastname" value={formData.lastname} onChange={handleInputChange} required />
        <label>
          E-postadress *
        </label>
        <input type="email" name="email" value={formData.email} onChange={handleInputChange} required />
        <label>
          Telefonnummer *
        </label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          required
          placeholder="+46 XX XXX XX XX"
        />
        <label>
          Antal gäster *
        </label>
        <input type="number" name="numberOfGuests" value={formData.numberOfGuests} readOnly />
        <label className="gdpr-consent">
          I agree to the GDPR consent.
          <input className="check-box" type="checkbox" name="gdprConsent" checked={formData.gdprConsent} onChange={handleInputChange} />
        </label>
        <div className="form-buttons">
          <button type="button" onClick={onCancel}>Cancel</button>
          <button type="submit">Update Booking</button>
        </div>
      </form>
    </div>
  );
};

export default EditBooking;