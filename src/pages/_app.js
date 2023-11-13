import '@/styles/globals.css'
import UserProvider from '@/context/UserContext'
import ListUserProvider from '@/context/ListUsersContext'

export default function App({ Component, pageProps }) {
  return (
    <>
      <UserProvider>
        <ListUserProvider>
        <Component {...pageProps} />
        </ListUserProvider>
      </UserProvider>
    </>
  )
}
