
import { Sequelize } from "sequelize-typescript"
import request from "supertest"
import { validate as IsUUID } from "uuid"
import { NewExpress, NewSequelize } from "../express"

describe('E2E tests for customer', () => {
    let sequelize: Sequelize

    beforeEach(async () => {
        sequelize = await NewSequelize()
    })

    afterAll(async () => {
        await sequelize.close()
    })

    it("should create a customer", async () => {
        const app = await NewExpress()

        const data = {
            name: "John",
            address: {
                street: "Street",
                city: "City",
                number: 123,
                zip: "12345"
            }
        }

        const response = await request(app).
            post("/customers").
            send(data)

        expect(response.status).toBe(200)
        expect(response.body.id).toBeDefined()
        expect(IsUUID(response.body.id)).toBeTruthy()
        expect(response.body.name).toEqual(data.name)
        expect(response.body.address.street).toEqual(data.address.street)
        expect(response.body.address.city).toEqual(data.address.city)
        expect(response.body.address.number).toEqual(data.address.number)
        expect(response.body.address.zip).toEqual(data.address.zip)
    })

    it('should not create a customer', async () => {
        const app = await NewExpress()
        const response = await request(app).post("/customers").send({ name: "John" })

        expect(response.status).toBe(500)
    })

    it('should list all customers', async () => {
        const app = await NewExpress()

        let response = await request(app).post("/customers").send({
            name: "John",
            address: {
                street: "Street",
                city: "City",
                number: 123,
                zip: "12345"
            }
        })
        expect(response.statusCode).toBe(200)

        response = await request(app).post("/customers").send({
            name: "Jane",
            address: {
                street: "Street 2",
                city: "City 2",
                number: 456,
                zip: "678910"
            }
        })
        expect(response.statusCode).toBe(200)

        response = await request(app).get("/customers").send()
        expect(response.status).toBe(200)
        expect(response.body.customers).toHaveLength(2)
    })
})