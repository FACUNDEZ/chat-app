import { emailRegex, passwordRegex } from '@/utils/regex';
import { encriptarPassword } from '@/utils/crypto';
import { sign } from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default async function Registarse(req, res) {
    const newUser = req.body;

    if (Object.values(newUser).includes(undefined)) {
        return res.status(400).json({ error: "Ingrese todos los datos, por favor" })
    }

    if (!newUser.email.match(emailRegex)) {
        return res.status(400).json({ error: "Email invalido" })
    }

    if (!newUser.password.match(passwordRegex)) {
        return res.status(400).json({ error: "Contraseña invalida" })
    }

    const hash = await encriptarPassword(newUser.password)

    const usuarioAGuardar = { ...newUser, password: hash }
    const usuarioSubido = await prisma.usuario.create({ data: usuarioAGuardar })

    if (!usuarioSubido) {
        return res.status(400).json({ error: "No se pudo crear el usuario" })
    }

    const token = sign(token, process.env.TOKEN_SECRET)

    return res.status(201).json(JSON.stringify({ msg: "Usuario registrado correctamente!", token}))
}
