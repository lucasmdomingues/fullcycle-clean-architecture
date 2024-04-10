export interface UpdateCustomerInputDTO {
    id: string;
    name: string;
    address: {
        street: string;
        number: number;
        zip: string;
        city: string;
    }
}

export interface UpdateCustomerOutputDTO {
    id: string;
    name: string;
    address: {
        street: string;
        number: number;
        zip: string;
        city: string;
    }
}