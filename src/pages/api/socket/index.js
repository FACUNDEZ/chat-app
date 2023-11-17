import { Server } from "socket.io";
import { UserContext } from "@/context/UserContext";
import { ListUsersContext } from "@/context/ListUsersContext";
import { useContext } from "react";

export default function ManejadorDeSockets(req, res) {
    const { user, setUser } = useContext(UserContext);
    const [listUsers, setListUsers] = useContext(ListUsersContext)

    if (res.socket.server.io) {
        console.log("Conexion ya configurada!")
        res.end()
        return
    }

    const io = new Server(res.socket.server)
    res.socket.server.io = io

    io.on("connection", (socket) => {
        console.log(`Usuario conectado en el socket: ${socket.id}`)

        socket.on("chat:mensaje", (mensaje) => {
            io.emit("chat:mensaje", mensaje)
        })
    })

    console.log("Configurando socket!")
    res.end()
}