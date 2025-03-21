import { Booking } from "../Booking";
import { Customer } from "../Customer";

export type BookingAction = 
  | { type: "ADD"; payload: Booking }
  | { type: "DELETE"; payload: string }
  | { type: "UPDATE"; payload: Booking }
  | { type: "SET_ALL"; payload: Booking[] };

export type CustomerAction = 
  | { type: "ADD"; payload: Customer }
  | { type: "DELETE"; payload: string }
  | { type: "UPDATE"; payload: Customer }
  | { type: "SET_ALL"; payload: Customer[] }; 