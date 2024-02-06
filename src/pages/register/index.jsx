import Footer from "@/components/Footer"
import Header from "@/components/Header"
import { useRouter } from "next/navigation"
import { useRef } from "react"

function Page() {
    const router = useRouter()

    const nameRef = useRef(null)
    const emailRef = useRef(null)
    const passwordRef = useRef(null)
    const ageRef = useRef(null)

    const getApi = async () => {
        try {
            const api = "https://localhost:3000/api/usuarios/register"
            const response = await fetch(api, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ nombre: nameRef.current?.value, email: emailRef.current?.value, password: passwordRef.current?.value, edad: Number(ageRef.current?.value) })
            })
            const data = await response.json()

            if (response.status === 400) {
                alert(data.error)
                return
            }

            alert(data.msg)
            router.push("/")
        } catch (error) {
            console.log(error)
        }
    }

    async function enviarForm(e) {
        e.preventDefault()

        if (!nameRef.current?.value || !emailRef.current?.value || !passwordRef.current?.value || !ageRef.current?.value) {
            alert("Completa los datos, por favor")
            return
        }

        await getApi()
    }

    return (
        <>
            <Header />
            <div class="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
                <div class="mx-auto max-w-lg">
                    <h1 class="text-center text-2xl font-bold text-emerald-400  sm:text-3xl">
                        Disfruta más que nunca con tus amigos!
                    </h1>

                    <form
                        onSubmit={enviarForm}
                        class="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
                    >
                        <p class="text-center text-xl font-bold">Regístrate</p>

                        <div>
                            <label for="name" class="sr-only">Nombre</label>

                            <div class="relative">
                                <input
                                    ref={nameRef}
                                    type="name"
                                    class="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                    placeholder="Nombre..."
                                />
                            </div>
                        </div>

                        <div>
                            <label for="email" class="sr-only">Correo electrónico</label>

                            <div class="relative">
                                <input
                                    ref={emailRef}
                                    type="email"
                                    class="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                    placeholder="Correo Electrónico..."
                                />
                            </div>
                        </div>

                        <div>
                            <label for="password" class="sr-only">Contraseña</label>

                            <div class="relative">
                                <input
                                    ref={passwordRef}
                                    type="password"
                                    class="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                    placeholder="Contraseña..."
                                />
                            </div>
                        </div>

                        <div>
                            <label for="age" class="sr-only">Edad</label>

                            <div class="relative">
                                <input
                                    ref={ageRef}
                                    type="number"
                                    class="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                    placeholder="Edad..."
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            class="block w-full rounded-lg bg-emerald-400 px-5 py-3 text-sm font-medium text-white"
                        >
                            Regístrarse
                        </button>

                        <p class="text-center text-sm text-gray-500">
                            Ya tienes una cuenta?
                            <a class="underline ml-1 cursor-pointer" onClick={() => router.push("/")} >Inicia Sesión</a>
                        </p>
                    </form>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Page