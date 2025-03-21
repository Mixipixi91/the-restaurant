export interface IBooking {
  _id: string | null;
  name: string;
  lastname: string;
  email: string;
  phone: string;
  numberOfGuests: number;
  date: Date;
  time: string;
  restaurantId: string;
  customerId: string;
}

export class Booking implements IBooking {
  public readonly restaurantId: string = '67ab1d2b6c6da27544081a1c';

  constructor(
    public _id: string | null,
    public name: string,
    public lastname: string,
    public email: string,
    public phone: string,
    public numberOfGuests: number,
    public date: Date,
    public time: string,
    public customerId: string
  ) {}
}

// types for the schedule
export type TimeSlot = string;
export type Day = string;
export interface ISelectedSlot {
  day: Day;
  time: TimeSlot;
}