import HeaderChat from "@/components/HeaderChat";
import { useState, useEffect, useContext } from "react";
import io from "socket.io-client";
import { UserContext} from "@/context/UserContext"

let socket;

export default function ChatPage() {
    const [message, setMessage] = useState("");
    const [username, setUsername] = useState("");
    const [todosLosMensajes, setTodosLosMensajes] = useState([]);
 
    const {user} = useContext(UserContext)

    useEffect(() => {
        iniciarSockets();

        return () => {
            socket.disconnect();
        };
    }, []);

    function iniciarSockets() {
        fetch("/api/socket");

        socket = io();

        socket.on("chat:mensaje", (mensajeNuevo) => {
            setTodosLosMensajes((mensajesAnteriores) => [
                ...mensajesAnteriores,
                mensajeNuevo,
            ]);
        });
    }
  
    function manejarEnvioDeMensaje(evento) {
        evento.preventDefault();

        socket.emit("chat:mensaje", { user: user.email, contenido: message });

        setMessage("");
    }

        return (
            <>
            <HeaderChat />
            <main className="bg-gray-100 h-screen relative overflow-hidden">
                <section className="px-4 py-4 overflow-y-auto">
                    <ul className="text-gray-800 text-lg space-y-4">
                        {todosLosMensajes.map((mensaje, index) => (
                            <li key={index}>
                                <div className="bg-emerald-300 rounded p-3 inline-block">
                                    <span className="text-black font-semibold">{mensaje.user}:</span> {mensaje.contenido}
                                </div>
                            </li>
                        ))}
                    </ul>
                </section>
                <form onSubmit={manejarEnvioDeMensaje} className="fixed bottom-8 left-0 right-0 px-4 py-2 flex items-center justify-between bg-white shadow-lg">
                    <input
                        className="py-3 px-4 w-full rounded border border-gray-300 focus:outline-none"
                        onChange={(evento) => setMessage(evento.target.value)}
                        value={message}
                        type="text"
                        placeholder="Escribe un mensaje..."
                    />
                    <button
                        type="submit"
                        className="bg-emerald-300 text-white rounded py-3 px-6 ml-2 hover:bg-emerald-400 transition duration-300"
                    >
                        Enviar
                    </button>
                </form>
            </main>
        </>
        );
    }
