import { useState, useContext } from "react"
import { UserContext } from "@/context/UserContext"
import { ListUsersContext } from "@/context/ListUsersContext"

function HeaderChat() {
    const { user } = useContext(UserContext)
    const [listUsers] = useContext(ListUsersContext)
    console.log(listUsers)

    const [aside, setAside] = useState(false)

    const toggleMenu = () => {
        setAside(true)
    }

    return (
        <header className="bg-emerald-400 text-center">
            <div className="flex justify-between">
                <button onClick={toggleMenu} className="text-black block lg:hidden ml-1"><svg class="icon icon-tabler icon-tabler-menu" width="32" height="32" viewBox="0 0 24 24" stroke-width="1.5" stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round">
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
                            <ul>
                         
                                {
                                listUsers.map((user, index) => (
                                    <li key={index}>{user.email}</li>
                                ))}
                            </ul>
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