import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Hook para manejar los lugares y sincronizar con localStorage
const HandlePlaces = (initialPlaces = []) => {
    const [places, setPlaces] = useState(() => {
        // Al cargar, intentamos recuperar los lugares guardados en localStorage
        const savedPlaces = localStorage.getItem('places');
        return savedPlaces ? JSON.parse(savedPlaces) : initialPlaces;
    });

    // Efecto para guardar los cambios en localStorage
    useEffect(() => {
        localStorage.setItem('places', JSON.stringify(places));
    }, [places]);

    const addPlace = (newPlace) => {
        setPlaces([...places, newPlace]);
        toast.success('Lugar guardado');
    };

    const updatePlace = (updatedPlace) => {
        setPlaces(places.map((place) =>
            place.id === updatedPlace.id ? updatedPlace : place
        ));
        toast.info('Lugar actualizado');
    };

    const deletePlace = (placeId) => {
        setPlaces(places.filter((place) => place.id !== placeId));
        toast.error('Lugar eliminado');
    };

    return {
        places,
        addPlace,
        updatePlace,
        deletePlace
    };
};

export default HandlePlaces;
