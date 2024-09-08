import { useState, useEffect } from 'react';

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
        console.log(newPlace)
        setPlaces([...places, newPlace]);
    };

    const updatePlace = (updatedPlace) => {
        setPlaces(places.map((place) =>
            place.id === updatedPlace.id ? updatedPlace : place
        ));
    };

    const deletePlace = (placeId) => {
        setPlaces(places.filter((place) => place.id !== placeId));
    };

    return {
        places,
        addPlace,
        updatePlace,
        deletePlace
    };
};

export default HandlePlaces;
