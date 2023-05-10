import { Sequelize } from "sequelize"

const db = new Sequelize("chinlli", "root", "mypass", {
  host: "localhost",
  dialect: "mariadb",
})

export default db
