import { createContext } from "react"

/* Se utiliza este componente para crear el contexto en la aplicación */

let initialState: any;

const UserContext = createContext(initialState);

export default UserContext;