import { useContext } from 'react';
import UserContext from "./UserContext";
import './css/styles.css';

/* 
    Este componente renderiza la información que se muestra del lado derecho dependiendo el plan que se elija.
    En el caso de la vista para dispositivos móviles la información se mostrará hasta abajo
*/

const Aside = () => {

    /* Se utiliza el contexto del cliente para usar el dato del plan más adelante */
    const { cliente } = useContext(UserContext);

    /* Se usa el query selector para poder manipular los estilos del componente */
    const aside = document.querySelector('aside');
    const header = document.querySelector('header');

    if(aside !== null)
    {
        aside.style.setProperty('--height', `${window.screen.height}px`);
    }

    /* En esta sección se manejan los estilos dependiendo si el plan es 'black' o 'smart' */

    if(cliente.plan === 'black' && (aside !== null && header !== null) ){
        aside.style.setProperty('background-color', '#202020');
        aside.style.setProperty('color', 'white');
        header.style.setProperty('background-color', '#202020');
        header.style.setProperty('color', 'white');
    } else if(cliente.plan === 'smart' && (aside !== null && header !== null)){
        aside.style.setProperty('background-color', '#eee');
        aside.style.setProperty('color', '#202020');
        header.style.setProperty('background-color', '#eee');
        header.style.setProperty('color', '#202020');
    }
        
    

    return (
        /* Se renderiza el componente de manera condicional dependiendo el plan elegido por el usuario */
        <aside>
            {
                cliente.plan === "black" && (
                    <div>
                        <h1>Plan Black</h1>
                        <h2 id='mensualidad'>Mensualidad</h2><h2 id='precio'>$ 559</h2>
                        <p>¡Mantente en forma en cualquiera de nuestros gimnasios!</p>
                    </div>
                )
            }
            {
                cliente.plan === "smart" && (
                    <div>
                        <h1>Plan Smart</h1>
                        <h2 id='mensualidad'>Mensualidad</h2><h2 id='precio'>$ 359</h2>
                        <p>Ir al gym nunca había sido tan sencillo</p>
                    </div>
                )
            }

        </aside>
    );
};

export default Aside;
