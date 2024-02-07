import { emailRegex, passwordRegex } from '@/utils/regex';
import { encriptarPassword } from '@/utils/crypto';
import { sign } from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client'
import NextCors from 'nextjs-cors';

const prisma = new PrismaClient()

export default async function Registarse(req, res) {
    try {
        await NextCors(req, res, {
            methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
            origin: '*',
            optionsSuccessStatus: 200,
        });
        
        const newUser = req.body;

        if (Object.values(newUser).includes(undefined)) {
            return res.status(400).json({ error: "Ingrese todos los datos, por favor." })
        }

        if (!newUser.email.match(emailRegex)) {
            return res.status(400).json({ error: "Email inválido." })
        }

        if (!newUser.password.match(passwordRegex)) {
            return res.status(400).json({ error: "Contraseña inválida. Debes insertar mínimo 8 carácteres (letras, una mayúscula y números)." })
        }

        const hash = await encriptarPassword(newUser.password)

        const usuarioAGuardar = { ...newUser, password: hash }
        const usuarioSubido = await prisma.usuario.create({ data: usuarioAGuardar })

        if (!usuarioSubido) {
            return res.status(400).json({ error: "No se pudo crear el usuario." })
        }

        const token = sign(usuarioSubido.id, process.env.TOKEN_SECRET)

        return res.status(201).json({ msg: "Usuario registrado correctamente!", token })
    } catch (error) {
        console.error("Error en registrarse:", error)
        return res.status(500).json({ error: "Error interno del servidor. Por favor, inténtelo de nuevo más tarde." })
    }
}
