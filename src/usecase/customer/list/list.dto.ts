type Customer = {
    id: string,
    name: string,
    address: {
        street: string;
        number: number;
        city: string,
        zip: string
    }
}

export interface ListCustomerInputDTO {

}

export interface ListCustomerOutputDTO {
    customers: Customer[]
}