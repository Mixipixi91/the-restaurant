import { ReactNode, useReducer } from 'react';
import { BookingContext, defaultBookingContext } from './BookingContext';
import { Booking } from '../models/Booking';
import { BookingAction } from '../models/interfaces/IContextActions';

interface BookingProviderProps {
  children: ReactNode;
}

const bookingReducer = (state: Booking[], action: BookingAction): Booking[] => {
  switch (action.type) {
    case "ADD":
      return [...state, action.payload];
    case "DELETE":
      return state.filter(booking => booking._id !== action.payload);
    case "UPDATE":
      return state.map(booking => 
        booking._id === action.payload._id ? action.payload : booking
      );
    case "SET_ALL":
      return action.payload;
    default:
      return state;
  }
};

export const BookingProvider = ({ children }: BookingProviderProps) => {
  const [bookings, dispatch] = useReducer(bookingReducer, defaultBookingContext.bookings);

  return (
    <BookingContext.Provider value={{ bookings, dispatch }}>
      {children}
    </BookingContext.Provider>
  );
}; 