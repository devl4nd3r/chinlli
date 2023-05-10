import express, { Application } from "express"
import usuarioRoutes from "../routes/usuario"
import cors from "cors"
import db from "../db/connection"

class Server {
  private app: Application
  private port: string
  private apiPaths = {
    usuarios: "/api/usuarios",
  }
  constructor() {
    this.app = express()
    this.port = process.env.PORT || "8000"

    this.dbConnection()
    this.middlewares()
    this.router()
  }

  middlewares() {
    // Cors
    this.app.use(cors())
    // parse body
    this.app.use(express.json())
    //public folder
    this.app.use(express.static("public"))
  }

  router() {
    this.app.use(this.apiPaths.usuarios, usuarioRoutes)
  }

  listen() {
    this.app.listen(this.port, () =>
      console.log(`Servidor corriendo en puerto ${this.port}`)
    )
  }

  async dbConnection() {
    try {
      await db.authenticate()
      console.log("conectados")
    } catch (error: unknown) {
      throw new Error(String(error))
    }
  }
}

export default Server
