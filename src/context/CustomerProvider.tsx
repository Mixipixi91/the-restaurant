import { ReactNode, useReducer } from 'react';
import { CustomerContext, defaultCustomerContext } from './CustomerContext';
import { Customer } from '../models/Customer';
import { CustomerAction } from '../models/interfaces/IContextActions';

interface CustomerProviderProps {
  children: ReactNode;
}

const customerReducer = (state: Customer[], action: CustomerAction): Customer[] => {
  switch (action.type) {
    case "ADD":
      return [...state, action.payload];
    case "DELETE":
      return state.filter(customer => customer.id !== action.payload);
    case "UPDATE":
      return state.map(customer => 
        customer.id === action.payload.id ? action.payload : customer
      );
    case "SET_ALL":
      return action.payload;
    default:
      return state;
  }
};

export const CustomerProvider = ({ children }: CustomerProviderProps) => {
  const [customers, dispatch] = useReducer(customerReducer, defaultCustomerContext.customers);

  return (
    <CustomerContext.Provider value={{ customers, dispatch }}>
      {children}
    </CustomerContext.Provider>
  );
}; 