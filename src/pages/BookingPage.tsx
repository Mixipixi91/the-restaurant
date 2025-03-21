import { useContext, useState, useEffect, FormEvent } from 'react';
import { BookingContext } from '../context/BookingContext';
import { CustomerContext } from '../context/CustomerContext';
import Schedule from '../components/Schedule';
import { Day, ISelectedSlot, TimeSlot, Booking } from '../models/Booking';
import '../styles/bookingPage/BookingPage.scss';

import Swal from 'sweetalert2';
import { createCustomer, getCustomerById } from '../services/customerService';
import { createBooking, getBookingsByRestaurantId } from '../services/bookingService';
import { useParams } from 'react-router';
import { Customer } from '../models/Customer';

const BookingPage = () => {
  const {  dispatch: bookingDispatch } = useContext(BookingContext);
  const {  dispatch: customerDispatch } = useContext(CustomerContext);
  const timeSlots: TimeSlot[] = ['18:00', '21:00'];
  const { id: customerId } = useParams<{ id: string }>();

  // State to track selected slot
  const [selectedSlot, setSelectedSlot] = useState<ISelectedSlot | null>(null);
  const [selectedPersons, setSelectedPersons] = useState<number>(2);
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [availableTables, setAvailableTables] = useState<{ [key: string]: number }>({});
  const [activeInput, setActiveInput] = useState<string | null>('persons');
  const [showBookingInfo, setShowBookingInfo] = useState<boolean>(false);
  // Form data
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [gdprConsent, setGdprConsent] = useState(false);

  useEffect(() => {
    const fetchAvailableTables = async () => {
      if (selectedDate) {
        const restaurantId = '67ab1d2b6c6da27544081a1c';
        try {
          const existingBookings = await getBookingsByRestaurantId(restaurantId);
          const updatedTables = timeSlots.reduce((acc, time) => {
            const bookingsForTimeSlot = existingBookings.filter(b =>
              new Date(b.date).toLocaleDateString() === selectedDate.toLocaleDateString() &&
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
  }, [selectedDate]);

  // Handle selecting a slot
  const handleSlotSelect = (day: Day, time: TimeSlot): void => {
    setSelectedSlot({ day, time });
    setActiveInput(null);
  };

  // Handle selecting persons
  const handlePersonsSelect = (persons: number): void => {
    setSelectedPersons(persons);
    setActiveInput('date');
  };

  // Handle selecting date
  const handleDateSelect = (value: Date | Date[] | null): void => {
    if (value instanceof Date) {
      setSelectedDate(value);
    }
    setActiveInput('time');
  };

  // Handle cancel action
  const handleCancel = () => {
    setName("");
    setLastname("");
    setEmail("");
    setPhone("");
    setGdprConsent(false);
    setShowBookingInfo(false);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!gdprConsent) {
      Swal.fire({
        title: 'GDPR-samtycke krävs',
        text: 'Du måste godkänna GDPR-samtycket för att fortsätta.',
        icon: 'warning',
        confirmButtonText: 'OK'
      });
      return;
    }
    if (selectedSlot && selectedDate) {
      try {
        const restaurantId = '67ab1d2b6c6da27544081a1c';
        const existingBookings = await getBookingsByRestaurantId(restaurantId);

        // Check for duplicate booking
        const hasDuplicateBooking = await checkDuplicateBooking(existingBookings, email, selectedDate, selectedSlot.time);
        if (hasDuplicateBooking) {
          Swal.fire({
            title: 'Dubbelbokning',
            text: 'Du har redan en bokning på samma datum och tid.',
            icon: 'warning',
            confirmButtonText: 'OK'
          });
          return;
        }

        // Create or get customer
        const customer = await handleCustomer();
        if (!customer) return;

        // Check table availability
        if (!isTableAvailable(existingBookings, selectedDate, selectedSlot.time)) {
          Swal.fire({
            title: 'Inga tillgängliga bord',
            text: 'Inga tillgängliga bord för det valda datumet och tiden.',
            icon: 'warning',
            confirmButtonText: 'OK'
          });
          return;
        }

        const newBooking = createNewBooking(customer.id);
        await confirmAndCreateBooking(newBooking);

      } catch (error) {
        console.error("Error handling booking:", error);
        Swal.fire('Error', 'Ett fel uppstod vid bokningen', 'error');
      }
    }
  };

  // Helper functions to make the code more maintainable
  const checkDuplicateBooking = async (existingBookings: Booking[], email: string, date: Date, time: string): Promise<boolean> => {
    const bookingChecks = await Promise.all(existingBookings.map(async (booking) => {
      try {
        const customer = await getCustomerById(booking.customerId);
        return customer?.email === email && 
               new Date(booking.date).toLocaleDateString() === date.toLocaleDateString() && 
               booking.time === time;
      } catch (error) {
        console.error(`Error checking customer ${booking.customerId}:`, error);
        return false;
      }
    }));
    return bookingChecks.some(Boolean);
  };

  const handleCustomer = async (): Promise<Customer | null> => {
    try {
      let customer = customerId ? await getCustomerById(customerId) : null;
      if (!customer) {
        const newCustomer = new Customer('', name, lastname, email, phone);
        customer = await createCustomer(newCustomer);
        customerDispatch({ type: "ADD", payload: customer });
      }
      return customer;
    } catch (error) {
      console.error("Error handling customer:", error);
      Swal.fire('Error', 'Ett fel uppstod vid hantering av kund', 'error');
      return null;
    }
  };

  const isTableAvailable = (existingBookings: Booking[], date: Date, time: string): boolean => {
    const bookingsForSlot = existingBookings.filter(b =>
      new Date(b.date).toLocaleDateString() === date.toLocaleDateString() &&
      b.time === time
    );
    return bookingsForSlot.length < availableTables[time];
  };

  const createNewBooking = (customerId: string): Booking => {
    const formattedDate = new Date(selectedDate!.getTime() - selectedDate!.getTimezoneOffset() * 60000)
      .toISOString().split('T')[0];
  
    return new Booking(
      null,
      name,
      lastname,
      email,
      phone,
      selectedPersons,
      new Date(formattedDate),
      selectedSlot!.time,
      customerId
    );
  };

  const confirmAndCreateBooking = async (newBooking: Booking) => {
    const result = await Swal.fire({
      title: 'Är du säker på att du vill boka?',
      html: `
        <p><strong>Förnamn:</strong> ${name}</p>
        <p><strong>Efternamn:</strong> ${lastname}</p>
        <p><strong>E-post:</strong> ${email}</p>
        <p><strong>Telefon:</strong> ${phone}</p>
        <p><strong>Gäster:</strong> ${selectedPersons}</p>
        <p><strong>Datum:</strong> ${selectedDate?.toLocaleDateString()}</p>
        <p><strong>Tid:</strong> ${selectedSlot?.time}</p>
      `,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ja, boka!',
      cancelButtonText: 'Nej, avbryt',
    });

    if (result.isConfirmed) {
      try {
        await createBooking(newBooking);
        bookingDispatch({ type: "ADD", payload: newBooking });
        resetForm();
        updateAvailableTables(selectedSlot!.time);
        Swal.fire('Bokning bekräftad!', 'Din bokning har gjorts framgångsrikt.', 'success');
      } catch (error) {
        console.error("Error creating booking:", error);
        Swal.fire('Error', 'Ett fel uppstod vid bokningen', 'error');
      }
    } else if (result.isDismissed) {
      Swal.fire('Avbruten', 'Din bokning har avbrutits.', 'error');
    }
  };

  const resetForm = () => {
    setName("");
    setLastname("");
    setEmail("");
    setPhone("");
    setGdprConsent(false);
    setShowBookingInfo(false);
  };

  const updateAvailableTables = (time: string) => {
    setAvailableTables(prevTables => ({
      ...prevTables,
      [time]: prevTables[time] - 1
    }));
  };

  const handleBooking = (): void => {
    if (selectedSlot && selectedPersons && selectedDate) {
      setShowBookingInfo(true);
    } else {
      Swal.fire({
        title: 'Saknade fält',
        text: 'Vänligen välj alla fält innan du bokar.',
        icon: 'warning',
        confirmButtonText: 'OK'
      });
    }
  };

  return (
    <div className="booking-page">
      <div className="booking-header">
        <h1>Boka bord</h1>
        <p>Kära gäst, vi tar inga reservationer för lunch.</p>
        <p>
          Bokning för större sällskap än 6 personer bokas via e-post:
          restaurangdalanissa@gmail.com
        </p>
        <p>
          Menyförslag finner ni under sällskapsmeny.
        </p>
      </div>
      <Schedule
        timeSlots={timeSlots}
        availableTables={availableTables}
        selectedPersons={selectedPersons}
        selectedDate={selectedDate}
        selectedSlot={selectedSlot}
        activeInput={activeInput || ''}
        showBookingInfo={showBookingInfo}
        setActiveInput={setActiveInput}
        handleSlotSelect={handleSlotSelect}
        handleDateSelect={handleDateSelect}
        handlePersonsSelect={handlePersonsSelect}
        numberOfGuests={selectedPersons}
        name={name}
        lastname={lastname}
        email={email}
        phone={phone}
        setName={setName}
        setLastname={setLastname}
        setEmail={setEmail}
        setPhone={setPhone}
        handleSubmit={handleSubmit}
        handleCancel={handleCancel}
        gdprConsent={gdprConsent}
        setGdprConsent={setGdprConsent}
        handleBooking={handleBooking}
      />
      <div className="picture-container">
        <img src="/src/assets/boka-bord.jpg" alt="restaurant" />
      </div>
    </div>
  );
};

export default BookingPage;