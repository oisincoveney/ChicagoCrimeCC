import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import './Map.css'


const Map = () => {

    const [map, setMap] = useState(null)

    const onLoad = React.useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds();
        map.fitBounds(bounds);
        setMap(map)
    }, [])

    const onUnmount = React.useCallback(function callback(map) {
        setMap(null)
    }, [])

    const containerStyle = {
        width: '80vw',
        height: '100%'
    };

    const chicago = {
        lat: 41.881832,
        lng: -87.623177
    };
    console.log(process.env.REACT_APP_GOOGLE_MAPS_API_KEY);

    return (
        <div className="map-container">
            <LoadScript
                googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>

                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={chicago}
                    zoom={12}
                    onLoad={onLoad}
                    onUnmount={onUnmount}>

                    <Marker
                        label="Chicago is here"
                        position={chicago} />
                    {/* <></> */}
                </GoogleMap>

            </LoadScript>

            <div className="filter-container">
                <strong>Filters to be added here</strong>
            </div>
        </div>
    );
}

export default Map;