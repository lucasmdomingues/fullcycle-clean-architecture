import ProductRepositoryInterface from "../../../domain/product/repository/product.repository.interface";
import { ListProductInputDTO, ListProductOutputDTO } from "./dto";

export default class ListProductUseCase {
    private repository: ProductRepositoryInterface

    constructor(repository: ProductRepositoryInterface) {
        this.repository = repository
    }

    async execute(input: ListProductInputDTO): Promise<ListProductOutputDTO> {
        const data = await this.repository.findAll()

        return {
            products: data.map((product) => ({
                id: product.ID,
                name: product.Name,
                price: product.Price
            }))
        }
    }
}