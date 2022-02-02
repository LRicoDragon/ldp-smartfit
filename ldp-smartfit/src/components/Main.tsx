import UserContext from './UserContext';
import Encabezado from './Encabezado';
import RouterComponent from './RouterComponent';
import { useState } from 'react';
import { Cliente } from '../interfaces/interfaceCliente';

const initialState: Cliente = {
    nombre: '',
    numero: '',
    correo: ''
};

export const Main = () => {

    /* Se crean las variables de useState para manipular los datos del cliente */
    const [cliente, setCliente] = useState(initialState);

    return (
        /* Se crea el contexto para usarlo entre componentes */
        <UserContext.Provider value={{
            cliente,
            setCliente
        }}>
            {/* Se renderiza el componente del Header */}
            <Encabezado />
                
            {/* Se renderiza el contenido pricnipal con el Router para manejar las rutas de acceso */}
            <div id="content">
                <RouterComponent />
            </div>
        </UserContext.Provider>
    )
}
