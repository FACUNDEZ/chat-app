import { useState, useContext, useEffect } from "react"
import { useRouter } from "next/router"
import { UserContext } from "@/context/UserContext"
import { ListUsersContext } from "@/context/ListUsersContext"

function HeaderChat() {

    const router = useRouter()
    const { user, setUser } = useContext(UserContext)
    const [listUsers, setListUsers] = useState([])

    const [aside, setAside] = useState(false)

    const toggleMenu = () => {
        setAside(true);
    };

    return (
        <header className="bg-emerald-400 text-center">
            <div className="flex justify-between items-center">
                <button onClick={toggleMenu} type="button" className="text-black block ml-1"><svg width="32" height="32" viewBox="0 0 24 24" stroke-width="1.5" stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M4 8l16 0" />
                    <path d="M4 16l16 0" />
                </svg></button>
                {aside === true && (
                    <aside id="cta-button-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform sm:translate-x-0" aria-label="Sidebar">
                        <div className="h-full px-3 py-4 overflow-y-auto bg-emerald-300">
                            <button onClick={() => (setAside(false))}>
                                <svg width="30" height="30" viewBox="0 0 24 24" stroke-width="1.5" stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                    <path d="M18 6l-12 12" />
                                    <path d="M6 6l12 12" />
                                </svg>
                            </button>
                            <h1 className="font-bold text-xl">Usuarios Conectados</h1>
                            <ul id="lista">
                                {
                                    listUsers.map((user, index) => (
                                        <li key={index}>{user.email}</li>
                                    ))}
                            </ul>

                            <div>
                                <button className="mr-1 fixed bottom-5 left-48" onClick={() => {
                                    setUser({ email: "", token: "" })
                                    router.push("/")
                                }}>
                                    <svg width="40" height="40" viewBox="0 0 24 24" stroke-width="1.5" stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                        <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />
                                        <path d="M9 12h12l-3 -3" />
                                        <path d="M18 15l3 -3" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </aside>
                )}
                <div className="inline-flex items-center m-auto">
                    <svg className="icon icon-tabler icon-tabler-messages" width="50" height="50" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M21 14l-3 -3h-7a1 1 0 0 1 -1 -1v-6a1 1 0 0 1 1 -1h9a1 1 0 0 1 1 1v10" />
                        <path d="M14 15v2a1 1 0 0 1 -1 1h-7l-3 3v-10a1 1 0 0 1 1 -1h2" />
                    </svg>
                    <h1 className="text-xl font-bold pl-1">ChatSim!</h1>
                </div>
            </div>
        </header>
    )
}

export default HeaderChat