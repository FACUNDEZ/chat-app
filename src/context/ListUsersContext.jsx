import { createContext, useState } from "react";

export const ListUsersContext = createContext([]);

export default function ListUserProvider({ children }) {

    const [listUsers, setListUsers] = useState([])

    return (
        <ListUsersContext.Provider value={[ listUsers, setListUsers ]}>
            {children}
        </ListUsersContext.Provider>
    )
}
