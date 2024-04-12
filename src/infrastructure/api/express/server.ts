import dotenv from "dotenv"
import { NewSequelize, NewExpress } from "./express";

(async () => {
    dotenv.config()
    const port: number = Number(process.env.PORT) || 3000;

    const sequelize = await NewSequelize()
    const app = await NewExpress()

    app.listen(port, () => console.log(`Server is listening on port ${port}...`))
})();