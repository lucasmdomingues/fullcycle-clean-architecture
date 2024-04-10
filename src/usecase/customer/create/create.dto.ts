// Dado puro, não precisa saber o agregado, value object
export interface CreateCustomerInputDTO {
    name: string;
    address: {
        street: string;
        number: number;
        zip: string;
        city: string;
    }
}

export interface CreateCustomerOutputDTO {
    id: string;
    name: string;
    address: {
        street: string;
        number: number;
        zip: string;
        city: string;
    }
}