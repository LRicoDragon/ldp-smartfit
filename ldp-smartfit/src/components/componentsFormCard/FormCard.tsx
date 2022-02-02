import Styles from './Styles'
import { Form, Field } from 'react-final-form'
import Card from './Card'
import { useContext } from 'react';
import UserContext from '../UserContext';
import {
  formatCreditCardNumber,
  formatCVC,
  formatExpirationDate
} from './cardUtils';
import {CopyToClipboard} from 'react-copy-to-clipboard';

/* 
    Este es un componente obtenido de Github con el cual se pueden manejar los datos de una tarjeta de 
    débito o crédito, este componente sólo es el formulario de la tarjeta
*/

const sleep = (ms: number | undefined) => new Promise(resolve => setTimeout(resolve, ms))
let folioCopied: boolean = false;

const FormCard = () => {

    /*
        Esta función maneja las acciones cuando un usuario se registra en la plataforma 
        genera un folio que valida la transacción para su registro en el gimnasio
    */
    const onSubmit = async (values: any) => {
        await sleep(300);
        const rand = Math.floor( Math.random() * (100 - 10) ) + 10;
        const folio = '' + (parseInt(cliente.fechaNac.split('-')[2]) * rand ) + (parseInt(cliente.fechaNac.split('-')[1]) * rand )
        window.alert(`Bienvenido a Smart fit ${cliente.nombre.split(' ')[0]}\nPresenta este folio en sucursal: ${folio}`
        );
        
        /* Aquí se agregan los datos de la tarjeta en una variable de contexto */

        setCliente({
            ...cliente,
            folio: folio,
            tarjeta: values
        });

    }

    /* 
        Esta variable de contexto tiene todos los datos que ingresa el usuario a lo largo de su
        interacción con la plataforma
    */

    const {cliente, setCliente} = useContext(UserContext);

    /* 
        Esta fucnión se utiliza para que el usuario copie al portapapeles el folio que se generó
    */
    const handleClickFolio = () => {
        setCliente({
            ...cliente
        });
        console.log(folioCopied);
        folioCopied = true;
        document.querySelector('#btn-folio')?.classList.add('folio-copied');
    };
    

    return (
        /* Este es el componente que renderiza todo el formulario */
        <Styles>
            <h1>Gracias por elegir nuestro plan {cliente.plan}</h1>
            <h2>Por favor introduzca su método de pago</h2>
            

            {/* {this.state.copied ? <span style={{color: 'red'}}>Copied.</span> : null} */}
            
            <Form
            onSubmit={onSubmit}
            render={({
                handleSubmit,
                form,
                submitting,
                pristine,
                values,
                active
            }) => {
                return (
                <form onSubmit={handleSubmit}>
                    {/*
                        Se manejan los datos de cambio, en caso de que el valor sea undefine en las variables
                        se tomará en cuenta sólo una cadena vacía
                    */}
                    <Card
                    number={values.number || ''}
                    name={values.name || ''}
                    expiry={values.expiry || ''}
                    cvc={values.cvc || ''}
                    focused={active}
                    />
                    <div>
                    <Field
                        name="number"
                        component="input"
                        type="text"
                        pattern="[\d| ]{16,22}"
                        placeholder="Número de tarjeta"
                        format={formatCreditCardNumber}
                    />
                    </div>
                    <div>
                    <Field
                        name="name"
                        component="input"
                        type="text"
                        initialValue={cliente.nombre}
                        placeholder="Nombre"
                    />
                    </div>
                    <div>
                    <Field
                        name="expiry"
                        component="input"
                        type="text"
                        pattern="\d\d/\d\d"
                        placeholder="Fecha de expiración (MM/AA)"
                        format={formatExpirationDate}
                    />
                    <Field
                        name="cvc"
                        component="input"
                        type="text"
                        pattern="\d{3,4}"
                        placeholder="CDS"
                        format={formatCVC}
                    />
                    </div>
                    <div className="buttons">
                    <button type="submit" disabled={submitting}>
                        Continuar
                    </button>
                    <button
                        type="button"
                        onClick={form.reset}
                        disabled={submitting || pristine}
                    >
                        Borrar
                    </button>
                    </div>
                </form>
                )
            }}
            />

            {/*
                Se renderiza de manera condicional el botón para copiar el folio, una vez que se generó, este botón
                aparece en pantalla 
            */}
            {
                cliente.folio && (
                    <div id='copia-folio'>
                        {
                            folioCopied ?
                            <h3>Folio en portapapeles</h3> :
                            <h3>Para copiar su folio al portapapeles, presione el botón</h3>
                        }
                        
                        {/* Se usa el componente que maneja el copiar al portapapeles */}

                        <CopyToClipboard text={cliente.folio}
                        onCopy={() => handleClickFolio()}>
                            
                            <button id='btn-folio'>Folio</button>
                        </CopyToClipboard>
                    </div>
                )
            }
        </Styles>
    )
}

export default FormCard;