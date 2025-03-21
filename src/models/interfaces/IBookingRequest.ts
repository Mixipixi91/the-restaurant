export interface ICreateBookingRequest {
    id: string | null;
    restaurantId: string;
    date: Date;
    time: string;
    numberOfGuests: number;
    customerId: string;
    customer: {
        name: string;
        lastname: string;
        email: string;
        phone: string;
    };
}

export interface IUpdateBookingRequest {
    id: string | null;
    restaurantId: string;
    date: Date;
    time: string;
    numberOfGuests: number;
    customerId: string;
} 