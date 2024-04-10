import Product from "../../../domain/product/entity/product";
import ProductRepositoryInterface from "../../../domain/product/repository/product.repository.interface";
import { UpdateProductInputDTO, UpdateProductOutputDTO } from "./dto";

export default class UpdateProductUseCase {
    private repository: ProductRepositoryInterface;

    constructor(repository: ProductRepositoryInterface) {
        this.repository = repository;
    }

    async execute(input: UpdateProductInputDTO): Promise<UpdateProductOutputDTO> {
        const product = new Product(input.id, input.name, input.price)
        await this.repository.update(product)

        return {
            id: product.ID,
            name: product.Name,
            price: product.Price
        }
    }
}