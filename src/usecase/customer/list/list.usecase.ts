import Customer from "../../../domain/customer/entity/customer";
import CustomerRepositoryInterface from "../../../domain/customer/repository/customer.repository.interface";
import { ListCustomerInputDTO, ListCustomerOutputDTO } from "./list.dto";

export default class ListCustomerUseCase {
    private repository: CustomerRepositoryInterface;

    constructor(repository: CustomerRepositoryInterface) {
        this.repository = repository
    }

    async execute(input: ListCustomerInputDTO): Promise<ListCustomerOutputDTO> {
        const customers = await this.repository.findAll();
        return OutputMapper.toOutput(customers)
    }
}

class OutputMapper {
    static toOutput(data: Customer[]): ListCustomerOutputDTO {
        return {
            customers: data.map((customer) => ({
                id: customer.Id,
                name: customer.Name,
                address: {
                    street: customer.Address.Street,
                    number: customer.Address.Number,
                    zip: customer.Address.Zipcode,
                    city: customer.Address.City
                }
            }))
        }
    }
}