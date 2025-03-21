import { createContext, Dispatch } from "react";
import { Booking } from "../models/Booking";
import { BookingAction } from "../models/interfaces/IContextActions";

export interface IBookingContext {
  bookings: Booking[];
  dispatch: Dispatch<BookingAction>;
}

export const defaultBookingContext: IBookingContext = {
  bookings: [],
  dispatch: () => {
    throw new Error("BookingContext dispatch not implemented");
  },
};

export const BookingContext = createContext<IBookingContext>(defaultBookingContext);
