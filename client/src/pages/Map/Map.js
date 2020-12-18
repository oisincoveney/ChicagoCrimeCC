
import React, { useEffect, useState } from 'react';

import { useGoogleMaps } from 'react-hook-google-maps';
import './Map.css';
import { SuspenseWithPerf, useDatabase } from 'reactfire';
import 'firebase/database'


let prev_infowindow = false;
let markers = [];


const Map = React.memo(function Map() {

    const { ref, map, google } = useGoogleMaps(
        process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        {
            center: { lat: 41.881832, lng: -87.623177 },
            zoom: 11,
        },
    );
    console.log("render MapWithMarkers");




    const containerStyle = {
        width: '100vw',
        height: '100%'
    };


    const center = {
        lat: 41,
        lng: -87
    }


    const db = useDatabase();

    const [data, setData] = useState([]);




    // db.ref('/Crimes').orderByKey().limitToFirst(10).once('value').then(res => {
    //     const result = res.exportVal();
    //     console.log(result);
    //     Object.values(result).map((crime) => {
    //         db.ref('/Location').child(crime.Location).once('value').then(location => {
    //             const loc = location.exportVal();

    //             console.log("case id: " + crime["Case Number"] + " Lat: " + loc.Latitude + " Lon: " + loc.Longitude);
    //             const caseNo = crime["Case Number"];
    //             setData({...data, caseNo : {lat: loc.Latitude, lon: loc.Longitude}});
    //             console.log(data);
    //         });
    //     });
    // });

    useEffect(() => {
        
        const fetchData =  () => {
            db.ref('/Crimes').orderByKey().limitToFirst(500).once('value').then(res => {
                // // setCrime(res.exportVal());
                // return res.exportVal();
                const result = res.exportVal();

                let d = [];
                // // console.log(result);
                Object.values(result).map((crime) => {
                    db.ref('/Location').child(crime.Location).once('value').then(location => {
                        let loc = location.exportVal();
                        crime.Location = loc["Location Description"];
                        crime.lat = parseFloat(loc.Latitude);
                        crime.lng = parseFloat(loc.Longitude);
                        d.push(crime);
                    });

                });

                setData(d);
            });

        };
            fetchData();
    }, [map]);
    return (
        <div className="map-container">
            <div ref={ref} style={containerStyle}></div>
                <SuspenseWithPerf>
                    
                {
                    data.map(k => {
                        const pos = { lat: k.lat, lng: k.lng };

                        const marker = new google.maps.Marker({ position: pos, map });
                        const contentString = "<div class='content'><strong>Case #:</strong><span>" + k["Case Number"] + "</span><br/>" +
                            "<strong>Arrested?: </strong><span>" + (k.Arrest === "true" ? "yes" : "no") + "</span><br/>" +
                            "<strong>Date happened: </strong><span>" + k.Date + "</span><br/>" +
                            "<strong>Description: </strong><span>" + k.Description + "</span><br/>" +
                            "<strong>Location: </strong><span>" + k.Location + "</span><br/></div>";
                        const infoWindow = new google.maps.InfoWindow({ content: contentString });
                        marker.addListener("click", () => {
                            map.setZoom(15);
                            map.setCenter(marker.getPosition());
                            if (prev_infowindow) prev_infowindow.close();
                            prev_infowindow = infoWindow;
                            infoWindow.open(map, marker)
                        });
                        markers.push(marker);
                    })
                }
                </SuspenseWithPerf>
            
        
        </div>
    );
});

export default Map;