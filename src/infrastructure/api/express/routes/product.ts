import express, { Request, Response, Router } from "express";
import ProductRepositoryInterface from "../../../../domain/product/repository/product.repository.interface";
import ListProductUseCase from "../../../../usecase/product/list/usecase";
import CreateProductUseCase from "../../../../usecase/product/create/usecase";

export function NewProductRouter(repository: ProductRepositoryInterface): Router {
    const router = express.Router()

    router.post("/", async (req: Request, res: Response)=> {
        const usecase = new CreateProductUseCase(repository)

        try {
            const output = await usecase.execute({
                id: req.body.id,
                name: req.body.name,
                price: req.body.price
            })

            return res.send(output)
        } catch (err) {
            res.status(500).send(err)
        }
    })

    router.get("/", async (req: Request, res: Response) => {
        const usecase = new ListProductUseCase(repository)

        try {
            const output = await usecase.execute({})
            res.status(200).send(output)
        } catch (err) {
            res.send(500).send(err)
        }
    })

    return router
}