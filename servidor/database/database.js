import { Sequelize } from "sequelize";
const db = new Sequelize("title",'user', 'pass',{
    host:"localhost",
    dialect:"mysql"
})

export default db
