import axios from "axios";

export interface IRequestBody {
  id: string | null;
  restaurantId: string;
  date: Date;
  time: string;
  numberOfGuests: number;
  customerId: string;
}

export const get = async <T>(url: string): Promise<T> => {
  try {
    const response = await axios.get(url);
    return response.data as T;
  } catch (error) {
    console.error(`Error making GET request to ${url}:`, error);
    throw error;
  }
};

export const post = async <T, B>(url: string, body: B): Promise<T> => {
  try {
    const response = await axios.post(url, body, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data as T;
  } catch (error) {
    console.error(`Error making POST request to ${url}:`, error);
    throw error;
  }
};

export const put = async <T, B = T>(url: string, body: B): Promise<T> => {
  try {
    const response = await axios.put(url, body, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data as T;
  } catch (error) {
    console.error(`Error making PUT request to ${url}:`, error);
    throw error;
  }
};

export const remove = async (url: string): Promise<void> => {
  try {
    await axios.delete(url);
  } catch (error) {
    console.error(`Error making DELETE request to ${url}:`, error);
    throw error;
  }
};