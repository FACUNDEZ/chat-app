import Footer from "@/components/Footer"
import Header from "@/components/Header"
import { useRouter } from "next/navigation"
import { useRef, useContext } from "react"
import { UserContext } from "@/context/UserContext"

export default function Home() {
  const router = useRouter()

  const emailRef = useRef(null)
  const passwordRef = useRef(null)

  const { user, setUser } = useContext(UserContext);

  const getData = async () => {
    try {
      const api = "https://chatsim-4cqf.onrender.com//api/usuarios/login"
      const response = await fetch(api, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email: emailRef.current?.value, password: passwordRef.current?.value })
      })
      const data = await response.json()

      if (response.status === 400 || response.status === 401) {
        alert(data.error)
        return
      }

      setUser({ email: emailRef.current?.value, token: data.token });

      alert(data.msg)
      router.push("/chat")
      return data.token
    } catch (error) {
      console.log(error)
    }
  }

  async function envioDeFormulario(e) {
    e.preventDefault()

    if (!emailRef.current?.value || !passwordRef.current?.value) {
      alert("Completa los datos, por favor.")
      return
    }

    await getData()
  }

  return (
    <>
      <Header />
      <div className="mx-auto max-w-screen-xl m-6 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-lg">
          <h1 className="text-center text-2xl font-bold text-emerald-400  sm:text-3xl">
            Comienza Hoy
          </h1>

          <p class="mx-auto mt-4 max-w-md text-center text-gray-500">
            Disfruta chateando con tus amigos en tiempo real!
          </p>

          <form
            onSubmit={envioDeFormulario}
            className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
          >
            <p className="text-center text-xl font-bold">Inicia sesión con tu cuenta</p>

            <div>
              <label for="email" class="sr-only">Correo electrónico</label>

              <div className="relative">
                <input
                  ref={emailRef}
                  type="email"
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                  placeholder="Ingrese su correo electrónico"
                />

                <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                    />
                  </svg>
                </span>
              </div>
            </div>

            <div>
              <label for="password" className="sr-only">Contraseña</label>

              <div className="relative">
                <input
                  ref={passwordRef}
                  type="password"
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                  placeholder="Ingrese su contraseña"
                />

                <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </span>
              </div>
            </div>

            <button
              type="submit"
              className="block w-full rounded-lg bg-emerald-400 px-5 py-3 text-sm font-medium text-white"
            >
              Iniciar sesión
            </button>

            <p className="text-center text-sm text-gray-500">
              Aún no te has registrado?
              <a className="underline ml-1 cursor-pointer" onClick={() => router.push("/register")}>Regístrate Aquí</a>
            </p>
          </form>
        </div>
      </div>
      <Footer />
    </>
  )
}
