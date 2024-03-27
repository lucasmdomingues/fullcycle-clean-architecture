import CustomerRepositoryInterface from "../../../domain/customer/repository/customer.repository.interface";
import { FindCustomerInputDTO, FindCustomerOutputDTO } from "./find.dto";

export default class FindCustomerUseCase {
    private repository: CustomerRepositoryInterface;

    constructor(repository: CustomerRepositoryInterface) {
        this.repository = repository;
    }

    async execute(input: FindCustomerInputDTO): Promise<FindCustomerOutputDTO> {
        const customer = await this.repository.find(input.id)

        return {
            id: customer.Id,
            name: customer.Name,
            address: {
                street: customer.Address.Street,
                city: customer.Address.City,
                number: customer.Address.Number,
                zipcode: customer.Address.Zipcode
            }
        }
    }
}