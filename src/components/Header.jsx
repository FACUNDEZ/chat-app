
function Header() {
    return (
        <header className="bg-emerald-400 p-2 text-center">
            <div className="inline-flex  items-center">
                <svg className="icon icon-tabler icon-tabler-messages" width="70" height="70" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M21 14l-3 -3h-7a1 1 0 0 1 -1 -1v-6a1 1 0 0 1 1 -1h9a1 1 0 0 1 1 1v10" />
                    <path d="M14 15v2a1 1 0 0 1 -1 1h-7l-3 3v-10a1 1 0 0 1 1 -1h2" />
                </svg>
                <h1 className="text-3xl font-bold pl-1">ChatSim!</h1>
            </div>
        </header>
    )
}

export default Header