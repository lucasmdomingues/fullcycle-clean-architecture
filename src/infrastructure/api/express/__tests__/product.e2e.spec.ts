import { Sequelize } from "sequelize-typescript"
import { NewExpress, NewSequelize } from "../express";
import request from "supertest"


describe('E2E tests for products', () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = await NewSequelize()
    })

    afterAll(async () => {
        await sequelize.close()
    })

    it('should create a product', async () => {
        const app = await NewExpress()

        const data = {
            id: "1",
            name: "Product 1",
            price: 10
        }

        const response = await request(app).post("/products").send(data)
        expect(response.statusCode).toBe(200)
        expect(response.body.id).toBe(data.id)
        expect(response.body.name).toBe(data.name)
        expect(response.body.price).toBe(data.price)
    })

    it("should throw an error when create a product", async () => {
        const app = await NewExpress()
        const response = await request(app).post("/products").send({ name: "Product 1" })
        expect(response.statusCode).toBe(500)
    })

    it('should list products', async () => {
        const app = await NewExpress()

        let response = await request(app).post("/products").send({
            id: "123",
            name: "Product 1",
            price: 10
        })
        expect(response.statusCode).toBe(200)

        response = await request(app).post("/products").send({
            id: "456",
            name: "Product 2",
            price: 20
        })
        expect(response.statusCode).toBe(200)

        response = await request(app).get("/products").send()
        expect(response.statusCode).toBe(200)
        expect(response.body.products).toHaveLength(2)
    })
})