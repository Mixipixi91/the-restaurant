import { Customer } from '../models/Customer';

export enum CustomerActionTypes {
  ADD ,
  UPDATE
}

export interface IAction {
  type: CustomerActionTypes;
  payload: Customer;
}



export const CustomerReducer = (state: Customer[], action: IAction): Customer[] => {
  switch (action.type) {
    case CustomerActionTypes.ADD:
      return [...state, action.payload];
    case CustomerActionTypes.UPDATE:
      return state.map(customer => 
        customer.id === action.payload.id ? action.payload : customer
      );
    default:
      return state;
  }
};
