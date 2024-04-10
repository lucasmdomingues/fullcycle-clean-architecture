import Product from "../../../domain/product/entity/product";
import ProductRepositoryInterface from "../../../domain/product/repository/product.repository.interface";
import { CreateProductOutputDTO, CreateProductInputDTO } from "./dto";

export default class CreateProductUseCase {
    private repository: ProductRepositoryInterface;

    constructor(repository: ProductRepositoryInterface) {
        this.repository = repository
    }

    async execute(input: CreateProductInputDTO): Promise<CreateProductOutputDTO> {
        const product = new Product(input.id, input.name, input.price)
        await this.repository.create(product)

        return {
            id: product.ID,
            name: product.Name,
            price: product.Price
        }
    }
}