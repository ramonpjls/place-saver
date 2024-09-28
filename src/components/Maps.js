import React, { useMemo, useRef, useState } from 'react';
import Map, { FullscreenControl, GeolocateControl, Marker, NavigationControl, Popup } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import './Maps.css';
import PlaceForm from './PlaceForm';
import HandlePlaces from '../utils/HandlePlaces';
import { useLocalStorage } from '@uidotdev/usehooks';
import Pin from './pin';
import { MdDelete } from 'react-icons/md';
import { SiGooglemaps } from 'react-icons/si';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const apiKey = process.env.REACT_APP_MAPBOX_API_TOKEN;

const mapContainerStyle = {
    width: '100vw',
    height: '100vh',
};

const MapboxComponent = () => {
    const mapRef = useRef(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPlace, setSelectedPlace] = useState(null);
    const [popupInfo, setPopupInfo] = useState(null);
    const [lng, setLng] = useState(null);
    const [lat, setLat] = useState(null);

    navigator.geolocation.getCurrentPosition((position) => {
        setLat(position.coords.latitude);
        setLng(position.coords.longitude);
    });


    const setMarker = (e) => {
        setIsModalOpen(true);
        setSelectedPlace({
            coordinates: [e?.lngLat?.lng, e?.lngLat?.lat],
            name: '',
            description: '',
            color: '',
        });
    };

    // Usar `useLocalStorage` dentro de HandlePlaces
    const { places, addPlace, updatePlace, deletePlace } = HandlePlaces(useLocalStorage('savedPlaces', [])[0]);


    const handleFormSubmit = (place) => {
        addPlace(place); // Agregar el nuevo lugar a localStorage
        setIsModalOpen(false);
        // Cerrar el modal después de guardar
    };


    const handleDelete = (place) => {
        deletePlace(place.id)
    }

    const handleShare = (place) => {
        window.open(`http://maps.google.com/maps?z=12&t=m&q=loc:${place?.coordinates[1]}+${place?.coordinates[0]}`)
    }

    const pins = useMemo(
        () =>
            places.map((place, index) => (
                <Marker
                    key={index}
                    longitude={place?.coordinates[0]}
                    latitude={place?.coordinates[1]}
                    anchor="bottom"
                    onClick={e => {
                        // If we let the click event propagates to the map, it will immediately close the popup
                        // with `closeOnClick: true`
                        e.originalEvent.stopPropagation();
                        setPopupInfo(place);
                    }}
                >
                    <Pin color={place?.color} />
                </Marker>
            )),
        [places]
    );

    return (
        <div>
            <Map
                onClick={setMarker}
                initialViewState={{
                    latitude: lat,
                    longitude: lng,
                    zoom: 3,
                }}
                style={mapContainerStyle}
                mapStyle="mapbox://styles/mapbox/streets-v11"
                mapboxAccessToken={apiKey}
                ref={mapRef}
            >
                <GeolocateControl position="top-left" />
                <FullscreenControl position="top-left" />
                <NavigationControl position="top-left" />

                {pins}

                {popupInfo && (
                    <Popup
                        anchor="top"
                        longitude={Number(popupInfo?.coordinates[0])}
                        latitude={Number(popupInfo?.coordinates[1])}
                        onClose={() => setPopupInfo(null)}

                    >
                        <div className='flex flex-col gap-4 m-2'>
                            <span className='text-lg font-bold'>{popupInfo.name}</span>
                            <span className="text-sm">{popupInfo.description}</span>
                            <div className='flex justify-between'>
                                <MdDelete title="Delete" className='text-[30px] text-red-600 hover:border-2 hover:border-red-600 hover:rounded-full hover:shadow-lg' onClick={() => handleDelete(popupInfo)} />
                                <SiGooglemaps title='share on Google Maps' className='text-[30px] text-orange-400 hover:border-2 hover:border-orange-400 hover:rounded-full hover:shadow-lg' onClick={() => handleShare(popupInfo)} />
                            </div>
                        </div>
                    </Popup>
                )}
            </Map>

            <PlaceForm
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleFormSubmit} // Cambiado a manejar la lógica en el padre
                place={selectedPlace}
                onUpdate={updatePlace}
                onDelete={deletePlace}
            />
            <ToastContainer />
        </div >
    );
};

export default MapboxComponent;