import './css/styles.css'
import { useContext } from 'react';
import UserContext from './UserContext';

const Encabezado = () => {

    /* Se usa el contexto para usar el dato del plan elegido */
    const { cliente } = useContext(UserContext);
    /* Se crea la variable para usar la ruta donde se encuentran las imagenes */
    const src = (cliente.plan === 'smart') ? '../media/logo-grey.437733b6b03b22f4740a.svg' : '../media/logo-black.b547ccde344480121bff.svg';

    /* Se usa el querySelector para utilizar la imagen */
    document.querySelector('header')?.style.setProperty('--src', `url('${src}')`);
    /* Se renderiza el componente */
    return (
        <header id="header">
            <a id='logo' href='/'/>
        </header>
    )
}

export default  Encabezado;