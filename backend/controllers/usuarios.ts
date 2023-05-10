import { Request, Response } from "express"
import Usuario from "../models/usuario"

export const getUsuarios = async (req: Request, res: Response) => {
  const usuarios = await Usuario.findAll()
  res.json({ usuarios })
}

export const getUsuario = async (req: Request, res: Response) => {
  const { id } = req.params
  const usuario = await Usuario.findByPk(id)
  if (usuario) {
    res.json({ usuario })
  } else {
    res.status(404).json({
      msg: `No existe usuario con id: ${id}`,
    })
  }
}

const emailExiste = async (email: string) => {
  return await Usuario.findOne({ where: { email } })
}

export const postUsuario = async (req: Request, res: Response) => {
  const { body } = req
  try {
    if (!emailExiste(body.email)) {
      const createUsuario = await Usuario.create({ ...body })
      res.status(201).json({
        ok: true,
        createUsuario,
      })
    } else {
      res.status(400).json({
        msg: `usuario con email: ${body.email}, ya existe en db`,
      })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({
      msg: `Hable con el admin`,
    })
  }
}

export const putUsuario = async (req: Request, res: Response) => {
  const { id } = req.params
  const { body } = req
  try {
    const usuario = await Usuario.findByPk(id)
    if (!usuario) {
      res.status(404).json({
        msg: `no existe usuario con el id: ${id}`,
      })
    } else {
      if (body.email) {
        if (await emailExiste(body.email)) {
          res.status(400).json({
            msg: `usuario con email: ${body.email}, ya existe en db`,
          })
        }
      }
      await usuario.update({ ...body })
      res.json(usuario)
    }
  } catch (error) {
    res.status(500).json({
      msg: `Hable con el admin`,
    })
  }
}

export const deleteUsuario = (req: Request, res: Response) => {
  const { id } = req.params
  res.json({
    msg: "deleteUsuario",
    id,
  })
}
