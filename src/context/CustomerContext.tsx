import { createContext, Dispatch } from 'react';
import { Customer } from '../models/Customer';
import { CustomerAction } from '../models/interfaces/IContextActions';

export interface ICustomerContext {
  customers: Customer[];
  dispatch: Dispatch<CustomerAction>;
}

export const defaultCustomerContext: ICustomerContext = {
  customers: [],
  dispatch: () => {
    throw new Error("CustomerContext dispatch not implemented");
  },
};

export const CustomerContext = createContext<ICustomerContext>(defaultCustomerContext);


