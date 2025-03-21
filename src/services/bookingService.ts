import { Booking } from '../models/Booking';
import { post, get, remove, put } from './serviceBase';
import { ICreateBookingRequest, IUpdateBookingRequest } from '../models/interfaces/IBookingRequest';

const BASE_URL = 'https://school-restaurant-api.azurewebsites.net';

export const createBooking = async (booking: Booking): Promise<Booking> => {
    const requestBody: ICreateBookingRequest = {
        id: booking._id,
        restaurantId: booking.restaurantId,
        date: new Date(booking.date),
        time: booking.time,
        numberOfGuests: booking.numberOfGuests,
        customerId: booking.customerId,
        customer: {
            name: booking.name,
            lastname: booking.lastname,
            email: booking.email,
            phone: booking.phone
        }
    };
    
    return await post<Booking, ICreateBookingRequest>(`${BASE_URL}/booking/create`, requestBody);
};

export const getBookingsByRestaurantId = async (restaurantId: string): Promise<Booking[]> => {
    try {
        const url = `${BASE_URL}/booking/restaurant/${restaurantId}`;
        return await get<Booking[]>(url);
    } catch (error) {
        console.error(`Error fetching bookings:`, error);
        throw error;
    }
};

export const deleteBooking = async (bookingId: string): Promise<void> => {
    try {
        const url = `${BASE_URL}/booking/delete/${bookingId}`;
        await remove(url);
    } catch (error) {
        console.error(`Error deleting booking:`, error);
        throw error;
    }
};

export const updateBooking = async (booking: Booking): Promise<Booking> => {
    try {
        const requestBody: IUpdateBookingRequest = {
            id: booking._id,
            restaurantId: booking.restaurantId,
            date: new Date(booking.date),
            time: booking.time,
            numberOfGuests: booking.numberOfGuests,
            customerId: booking.customerId
        };
        
        return await put<Booking>(`${BASE_URL}/booking/update/${booking._id}`, requestBody);
    } catch (error) {
        console.error(`Error updating booking:`, error);
        throw error;
    }
};