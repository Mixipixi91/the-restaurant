import '../styles/schedule/Schedule.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays, faUser, faClock } from '@fortawesome/free-solid-svg-icons';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { BookingInfo } from './BookingInfo';
import { Day, ISelectedSlot, TimeSlot } from '../models/Booking';
import { FormEvent } from 'react';


type ScheduleProps = {
  timeSlots: TimeSlot[];
  availableTables: { [key: string]: number };
  selectedPersons: number;
  selectedDate: Date | null;
  selectedSlot: ISelectedSlot | null;
  activeInput: string;
  showBookingInfo: boolean;
  setActiveInput: (input: string) => void;
  handleSlotSelect: (day: Day, time: TimeSlot) => void;
  handleDateSelect: (value: Date | Date[]) => void;
  handlePersonsSelect: (num: number) => void;
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
  handleBooking: () => void;
};

const Schedule = ({
  timeSlots,
  availableTables,
  selectedPersons,
  selectedDate,
  selectedSlot,
  activeInput,
  showBookingInfo,
  setActiveInput,
  handleBooking,
  handleSlotSelect,
  handleDateSelect,
  handlePersonsSelect,
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
}: ScheduleProps) => {
 
  return (
    <div className="container">
      <div className='booking-options'>

        <button onClick={() => setActiveInput('persons')}>
          <FontAwesomeIcon icon={faUser} /> {selectedPersons} Person
        </button>

        <button onClick={() => setActiveInput('date')}>
          <FontAwesomeIcon icon={faCalendarDays} /> {selectedDate?.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
        </button>

        <button onClick={() => setActiveInput('time')}>
          <FontAwesomeIcon icon={faClock} /> {selectedSlot?.time || 'Select Time'}
        </button>

      </div>
      <button className='book-btn' onClick={handleBooking}>Fortsätt bokning</button>
     <div className='options'>
     {activeInput === 'time' && (
        <div className='time-options'>
          {timeSlots.map((time) => (
            <button key={time} onClick={() => handleSlotSelect(selectedSlot?.day || 'Mon', time)}>
              {time} ({availableTables[time]})
            </button>
          ))}
        </div>
      )}
      {activeInput === 'date' && (
        <div className='date-options'>
          <Calendar onChange={(value) => handleDateSelect(value as Date)} value={selectedDate} minDate={new Date()} />
          </div>
      )}
      {activeInput === 'persons' && (
        <div className='persons-options'>
          {[1, 2, 3, 4, 5,6].map((num) => (
            <button key={num} onClick={() => handlePersonsSelect(num)} >
              {num} Person
            </button>
          ))}
        </div>
      )}
     </div>
     {showBookingInfo && (
        <BookingInfo
          name={name}
          lastname={lastname}
          email={email}
          phone={phone}
          numberOfGuests={numberOfGuests}
          setName={setName}
          setLastname={setLastname}
          setEmail={setEmail}
          setPhone={setPhone}
          handleSubmit={handleSubmit}
          handleCancel={handleCancel} 
          gdprConsent={gdprConsent}
          setGdprConsent={setGdprConsent}
        />
      )}
    </div>
  );
};

export default Schedule;