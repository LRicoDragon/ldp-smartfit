import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

/* Custom hook que devuelve los parametros de búsqueda por url */

export const useQuery = () => {
    const { search } = useLocation();
    
    return useMemo(() => new URLSearchParams(search), [new URLSearchParams(search)]);

}
