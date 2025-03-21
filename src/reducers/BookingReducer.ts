import { Booking } from "../models/Booking";
import { BookingAction } from "../models/interfaces/IContextActions";

export const BookingReducer = (state: Booking[], action: BookingAction): Booking[] => {
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