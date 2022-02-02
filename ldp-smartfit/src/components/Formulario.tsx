import { useForm } from '../hooks/useForm';
import { useQuery } from '../hooks/useQuery';
import { FormEvent, useContext, useEffect } from 'react';
import UserContext from './UserContext';

import './css/styles.css';
import { ubicaciones } from './data/ubicaciones';

const Formulario = () => {

    /* Hook para obtener un query por la url */
    let query = useQuery();
    const locaciones = ubicaciones;

    /* Se usa el useForm para manipular las variables de contexto del cliente */
    const {
        onChange,
        nombre,
        email,
        numero,
        plan,
        ubicacion,
        curp,
        fechaNac,
        genero,
        contPagoStatus,
        formulario } = useForm({
        nombre: query.get('nombreF') || '',
        email: query.get('correoF') || '',
        numero: query.get('numeroF') || '',
        ubicacion: query.get('ubicacion') || '',
        plan: (query.get('plan') === 'smart' || query.get('plan') === 'black' ) ? query.get('plan') : 'smart',
        curp: '',
        fechaNac: '',
        genero: '',
        contPagoStatus: false
    });

     
    /* Se extrae el context de la vaiable cliente y su función para cambiar sus valores */
    const { cliente, setCliente } = useContext(UserContext);

    /* La primera vez que se renderiza el formulario se agregan los datos que este contiene al cliente */
    useEffect(() => {
        setCliente({...formulario })
    }, []);

    /* Función para manejar los cambios en el formulario */
    const handleOnChange = (targetValue: string | boolean | number, value:
        "email"     |
        "nombre"    |
        "numero"    |
        'curp'      |
        'fechaNac'  |
        'genero'    |
        'plan'      |
        'ubicacion'
    ) => {
        onChange(targetValue, value);
        (value === 'email') ?
        setCliente({ ...cliente, correo: targetValue, }) :
        setCliente({ ...cliente, [value]: targetValue, })
    }

    /* Cuando se haga submit en el formulatio se hace esta acción para pasar al formulario de pago */
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setCliente({...formulario, contPagoStatus: true})
        console.log(formulario);
    }

    /* Se renderiza el formulario */
    return (
        <form id='formulario' onSubmit={ handleSubmit }>  
            <h1>CREA UN USUARIO PARA CONTINUAR</h1>
            <span>Llena los siguientes datos para registrarte</span>
            <input
                type='text'
                className='input-form'
                placeholder="Nombre Completo"
                value={ nombre }
                required
                onChange={ ({target}) => { handleOnChange( target.value, 'nombre' ) } }
            />
            <input
                type='text'
                className='input-form'
                placeholder="E-mail"
                value={ email }
                required
                onChange={ ({target}) => { handleOnChange( target.value, 'email' ) } }
            />
            <input
                type='text'
                className='input-form'
                placeholder="CURP"
                value={ curp }
                required
                onChange={ ({target}) => { handleOnChange( target.value, 'curp' ) } }
            />
            <input
                type='date'
                className='input-form'
                placeholder="Fecha de nacimiento"
                value={ fechaNac }
                required
                onChange={ ({target}) => { handleOnChange( target.value, 'fechaNac' ) } }
            />
            <input
                type='phone'
                className='input-form'
                placeholder="Número"
                value={ numero }
                required
                onChange={ ({target}) => { handleOnChange( /\d+/.test(target.value)? target.value: '', 'numero' ) } }
            />

            {
                /* En esta sección se renderizan las opciones dependiendo la cantidad que tengamos en locaciones */
                cliente.plan === 'smart' && (
                    <select
                        name="Ubicacion"
                        defaultValue={ubicacion}
                        required
                        onChange={ ({target}) => { handleOnChange(
                            ([...target.options].filter(({selected}) => selected)[0].value),
                            'ubicacion'
                            )
                        }}
                    >
                        <option value="" disabled >Elija una ubicación</option>
                        {
                            locaciones.map( ({ nombre, valor }) => (
                                <option
                                    value={nombre}
                                    key={nombre}
                                >
                                    {valor}
                                </option>
                            ))
                        }
                    </select>
                )
            }

            <div className='form-gender'>
                <h2>Sexo</h2>
                <input
                    type='radio'
                    id='masculino'
                    className='input-form'
                    value='masculino'
                    name='genero'
                   required={(genero === '')}
                    onChange={ ({target}) => { handleOnChange( target.value, 'genero' ) } }
                />
                <label htmlFor='masculino'>Masculino</label>
                <input
                    type='radio'
                    id='femenino'
                    className='input-form'
                    value='femenino'
                    name='genero'
                    onChange={ ({target}) => { handleOnChange( target.value, 'genero' ) }}
                />
                <label htmlFor='femenino'>Femenino</label>
            </div>
            <div>
                <h2>Plan</h2>
                <input
                    type='radio'
                    id='smart'
                    className='input-form'
                    value='smart'
                    name='plan'
                    required={(genero === '')}
                    checked={plan === 'smart' ? true : false}
                    onChange={ ({target}) => { handleOnChange( target.value, 'plan' ) } }
                />
                <label htmlFor='smart'>Smart</label>
                <input
                    type='radio'
                    id='black'
                    className='input-form'
                    value='black'
                    name='plan'
                    checked={plan === 'black' ? true : false}
                    onChange={ ({target}) => { handleOnChange( target.value, 'plan' ) }}
                />
                <label htmlFor='black'>Black</label>
            </div>
            
            <input type="submit" value='Continuar'/>
            
        </form>
    )
}

export default Formulario;