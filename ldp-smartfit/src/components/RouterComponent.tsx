import {
    BrowserRouter as Router,
} from "react-router-dom";
import Aside from "./Aside";
import Formulario from "./Formulario";
import { useContext } from 'react';
import UserContext from './UserContext';
import FormCard from "./componentsFormCard/FormCard";

/* Componente que maneja las rutas que se usan */

const RouterComponent = () => {

    /* Se usa el estado del cliente para rtenderizar la pantalla de pago o la de formulario */
    const {cliente} = useContext(UserContext);

    /* Si es la pantalla de pago se cambian los estilos del cliente y del contenido */
    if(cliente.contPagoStatus)
    {
        document.querySelector('header')?.classList.add('headerPago');
        document.querySelector('#content')?.classList.add('contentPago');
    }

    /* Se renderiza de forma condicional el formulario de datos del cliente o el de la tarjeta */
    return (
        <Router>
            {
                !cliente.contPagoStatus && (
                    <>
                        <Formulario />
                        <Aside />
                    </>
                    
                )
            }
            {
                cliente.contPagoStatus && (
                    <FormCard />
                )
            }
            
        </Router>
    )
}

export default RouterComponent;