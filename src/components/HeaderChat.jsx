import { useState, useContext } from "react"
import { useRouter } from "next/router"
import { UserContext } from "@/context/UserContext"

function HeaderChat() {

    const router = useRouter()
    const { user, setUser } = useContext(UserContext)

    return (
        <header className="bg-emerald-400 text-center flex flex-row">
            <div>
                <button className="py-2 ml-2 text-left" onClick={() => {
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
                <div className="inline-flex items-center m-auto">
                    <svg className="icon icon-tabler icon-tabler-messages" width="50" height="50" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M21 14l-3 -3h-7a1 1 0 0 1 -1 -1v-6a1 1 0 0 1 1 -1h9a1 1 0 0 1 1 1v10" />
                        <path d="M14 15v2a1 1 0 0 1 -1 1h-7l-3 3v-10a1 1 0 0 1 1 -1h2" />
                    </svg>
                    <h1 className="text-xl font-bold pl-1">ChatSim!</h1>
                </div>
        </header>
    )
}

export default HeaderChat