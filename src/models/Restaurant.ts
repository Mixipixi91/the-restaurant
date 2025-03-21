export interface IAddress {
  street: string;
  zip: string;
  city: string;
}

export class Address implements IAddress {
  constructor(
    public street: string,
    public zip: string,
    public city: string
  ) {}
}

export interface IRestaurant {
  _id: string;
  name: string;
  address: Address;
  phone: string;
  email: string;
}

export class Restaurant implements IRestaurant {
  public readonly _id: string = '67ab1d2b6c6da27544081a1c';

  constructor(
    public name: string,
    public address: Address,
    public phone: string,
    public email: string
  ) {}

  get fullAddress(): string {
    return `${this.address.street}, ${this.address.zip} ${this.address.city}`;
  }
}
