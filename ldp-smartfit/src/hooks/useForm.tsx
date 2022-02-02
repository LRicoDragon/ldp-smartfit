import { useState } from "react";

export const useForm = <T extends Object >( form: T ) => {

    /* Custom hook para el manejo de formularios con todos sus campos */

    const [formulario, setFormulario] = useState( form );

    const onChange = ( value: string | boolean | number, campo: keyof T ) => {
        setFormulario({
            ...formulario,
            [campo]: value
        });
    }

    return {
        ...formulario,
        onChange,
        formulario
    };
}
