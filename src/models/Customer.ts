export interface ICustomer {
    id: string;
    name: string;
    lastname: string;
    email: string;
    phone: string;
}

export class Customer implements ICustomer {
    constructor(
        public id: string,
        public name: string,
        public lastname: string,
        public email: string,
        public phone: string
    ) {}

    get fullName(): string {
        return `${this.name} ${this.lastname}`;
    }
}
