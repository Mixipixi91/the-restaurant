import { Customer } from "../models/Customer";
import { get, post } from "./serviceBase";

const BASE_URL = "https://school-restaurant-api.azurewebsites.net";

export const createCustomer = async (customer: Customer): Promise<Customer> => {
  const requestBody = {
    name: customer.name,
    lastname: customer.lastname,
    email: customer.email,
    phone: customer.phone,
  };
  try {
    const id = await post<string, typeof requestBody>(`${BASE_URL}/customer/create`, requestBody);
    if (!id) {
      throw new Error("Failed to create customer: ID is missing");
    }
    return new Customer(id, customer.name, customer.lastname, customer.email, customer.phone);
  } catch (error) {
    console.error("Error creating customer:", error);
    throw error;
  }
};

export const getCustomerById = async (id: string): Promise<Customer> => {
  try {
    const data = await get<any[]>(`${BASE_URL}/customer/${id}`);
    if (Array.isArray(data) && data.length > 0) {
      const customerData = data[0];
      return new Customer(
        customerData.id,
        customerData.name,
        customerData.lastname,
        customerData.email,
        customerData.phone
      );
    } else {
      throw new Error("Customer not found");
    }
  } catch (error) {
    console.error("Error fetching customer:", error);
    throw error;
  }
};
