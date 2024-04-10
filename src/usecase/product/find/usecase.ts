import ProductRepositoryInterface from "../../../domain/product/repository/product.repository.interface";
import { FindProductInputDTO, FindProductOutputDTO } from "./dto";

export default class FindProductUseCase {
    private repository: ProductRepositoryInterface;

    constructor(repository: ProductRepositoryInterface) {
        this.repository = repository
    }

    async execute(input: FindProductInputDTO): Promise<FindProductOutputDTO> {
        const product = await this.repository.find(input.id)

        return {
            id: product.ID,
            name: product.Name,
            price: product.Price
        }
    }
}