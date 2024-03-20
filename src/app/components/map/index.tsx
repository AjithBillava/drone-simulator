"use client";

import React, { useContext, useEffect, useState } from "react";
import {
  GoogleMap,
  useLoadScript,
  MarkerF,
  Polyline,
} from "@react-google-maps/api";
import { MapContext } from "@/app/MapContext";

const MapComponent = () => {
  const { dataSets } = useContext(MapContext);

  const [selectedArea, setSelectedAreas] = useState({
    lat: 28.6167,
    lng: 77.2092,
  });

  const [polyPath, setPolyPath] = useState([]);

  useEffect(() => {
    const lat = parseFloat(dataSets[0].lat);
    const lng = parseFloat(dataSets[0].lng);
    lat > 0 && setSelectedAreas({ lat, lng });

    // setInterval(()=>{
    //     setPolyPath(dataSets.map((data) => ({ lat: data.lat, lng: data.lng })));
    // }, 2000)

    // setPolyPath(dataSets.map((data) => ({ lat: data.lat, lng: data.lng })));
    // console.log( polyPath)
  }, [dataSets]);

  const handleSimulate = () => {
    setInterval(() => {
      setPolyPath(dataSets.map((data) => ({ lat: data.lat, lng: data.lng })));
      
    }, 200);
  };

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyAtLmI2JS2lpzq6RF9eVHH_Bzr0pP7jmc4",
  });
  const mapRef = React.useRef<google.maps.Map>();
  const onMapLoad = React.useCallback((map: google.maps.Map) => {
    mapRef.current = map;
  }, []);
  return (
    <div style={{ marginTop: "50px" }}>
      <button onClick={handleSimulate}>simulate</button>

      {isLoaded && (
        <GoogleMap
          mapContainerStyle={{
            height: "800px",
          }}
          center={selectedArea}
          zoom={13}
          onLoad={onMapLoad}
        >
          {dataSets.map((data) => (
            <MarkerF
              key={data.timestamp}
              position={{
                lat: parseFloat(data.lat),
                lng: parseFloat(data.lng),
              }}
              icon={"http://maps.google.com/mapfiles/ms/icons/red-dot.png"}
            />
          ))}
          <Polyline
            path={polyPath}
            options={{
              strokeColor: "#FF0000",
              strokeOpacity: 0.8,
              strokeWeight: 2,
            }}
          />
        </GoogleMap>
      )}

      {/* <button>simulate</button> */}
      {!isLoaded && <>Loading...</>}
    </div>
  );
};

export default MapComponent;
