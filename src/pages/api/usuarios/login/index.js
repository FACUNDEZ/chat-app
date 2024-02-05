import { compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'
import { emailRegex, passwordRegex } from '@/utils/regex'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default async function Login(req, res) {
    const usuario = req.body

    if (!usuario.email.match(emailRegex)) {
        return res.status(400).json({ error: "Email inválido. Complete los caracteres, por favor."})
    }

    if (!usuario.password.match(passwordRegex)) {
        return res.status(400).json({ error: "Contraseña inválida. Complete los caracteres, por favor."})
    }

    const usuarioEnBD = await prisma.usuario.findUnique({ where: { email: usuario.email }})

    if (!usuarioEnBD) {
        return res.status(401).json({ error: "El usuario no existe. Ingrese su email correctamente."})
    }

    const contrasenaValida = await compare(usuario.password, usuarioEnBD.password) 

    if (!contrasenaValida) {
        return res.status(401).json({ error: "Contraseña incorrecta. Ingrese su contraseña correctamente."})
    }

    const token = sign(usuarioEnBD, process.env.TOKEN_SECRET, {
        expiresIn: "7d"
    })

    return res.status(200).json({ msg: "Inicio de sesión exitoso!", token})
}