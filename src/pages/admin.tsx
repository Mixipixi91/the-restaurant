import { useContext, useState, FormEvent } from "react";
import Modal from 'react-modal';
import { BookingContext } from "../context/BookingContext";
import { getBookingsByRestaurantId, deleteBooking, updateBooking } from "../services/bookingService";
import { getCustomerById } from "../services/customerService";
import { Booking } from "../models/Booking";
import { Link } from "react-router";
import EditBooking from "../components/EditBooking";
import Swal from 'sweetalert2';
import '../styles/admin/admin.scss';

Modal.setAppElement('#root'); // Set the root element for accessibility

export const Admin = () => {
  const {  dispatch } = useContext(BookingContext);
  const [email, setEmail] = useState<string>("");
  const [userBookings, setUserBookings] = useState<Booking[]>([]);
  const [editingBooking, setEditingBooking] = useState<Booking | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleFetchBookings = async (e: FormEvent) => {
    e.preventDefault();
    Swal.fire({
      title: 'Loading...',
      didOpen: () => {
        Swal.showLoading();
      }
    });
    try {
      const restaurantId = '67ab1d2b6c6da27544081a1c';
      const allBookings = await getBookingsByRestaurantId(restaurantId);

      // Fetch customer details for each booking and filter by email
      const filteredBookings = await Promise.all(allBookings.map(async (booking) => {
        try {
          const customer = await getCustomerById(booking.customerId);
          if (customer.email === email) {
            return booking;
          }
        } catch (error) {
          console.error(`Error fetching customer with ID ${booking.customerId}:`, error);
        }
        return null;
      }));

      const validBookings = filteredBookings.filter(booking => booking !== null) as Booking[];
      setUserBookings(validBookings);
      Swal.close();
    } catch (error) {
      console.error("Error fetching bookings:", error);
      Swal.fire('Error', 'Error fetching bookings', 'error');
    }
  };

  const handleDeleteBooking = async (bookingId: string | null) => {
    if (!bookingId) {
      console.error("Invalid booking ID");
      return;
    }
    try {
      await deleteBooking(bookingId);
      dispatch({ type: "DELETE", payload: bookingId });
      setUserBookings(userBookings.filter(booking => booking._id !== bookingId));
    } catch (error) {
      console.error("Error deleting booking:", error);
    }
  };

  const handleUpdateBooking = async (updatedBooking: Booking) => {
    try {
      await updateBooking(updatedBooking);
      dispatch({ type: "UPDATE", payload: updatedBooking });
      setUserBookings(userBookings.map(booking => 
        booking._id === updatedBooking._id ? updatedBooking : booking
      ));
      setEditingBooking(null);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error updating booking:", error);
    }
  };

  const openModal = (booking: Booking) => {
    setEditingBooking(booking);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setEditingBooking(null);
    setIsModalOpen(false);
  };

  return (
    <section className="admin-container">
      <h2>Verifierar Bokningen</h2>
      <h3>Sök bokningar</h3>
      <form onSubmit={handleFetchBookings}>
        <input
          type="text"
          name="email"
          id="email"
          placeholder="Skriv emajl att söka efter"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      <div className="results">
        <h3>Resultat</h3>
        <ul className="bookings">
          {userBookings.map((booking) => (
            <li key={booking._id || booking.email} className="booking">
              <table>
                <tbody>
                  <tr>
                    <td>Date:</td>
                    <td>{new Date(booking.date).toLocaleDateString()}</td>
                  </tr>
                  <tr>
                    <td>Time:</td>
                    <td>{booking.time}</td>
                  </tr>
                  <tr>
                    <td>Number of Guests:</td>
                    <td>{booking.numberOfGuests}</td>
                  </tr>
                  <tr>
                    <td>Name:</td>
                    <td>{booking.name} {booking.lastname}</td>
                  </tr>
                </tbody>
              </table>
              <button onClick={() => handleDeleteBooking(booking._id)}>Delete</button>
              <button onClick={() => openModal(booking)}>Edit</button>
            </li>
          ))}
        </ul>
      </div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Edit Booking"
        className="modal"
        overlayClassName="overlay"
      >
        {editingBooking && (
          <EditBooking
            booking={editingBooking}
            onSave={handleUpdateBooking}
            onCancel={closeModal}
          />
        )}
      </Modal>
      <h3>Skapa ny bokning</h3>
      <Link to="/booking">Boka bord</Link>
    </section>
  );
};