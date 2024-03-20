"use client";

import React, { useContext, useEffect, useRef, useState } from "react";
import {
  GoogleMap,
  useLoadScript,
  MarkerF,
  Polyline,
} from "@react-google-maps/api";
import { MapContext } from "@/app/MapContext";

const sortArrayByTimestamp = (data) => {
  return data.sort((item1, item2) => {
    const timestamp1 = new Date(item1.timestamp);
    const timestamp2 = new Date(item2.timestamp);

    return timestamp1 - timestamp2;
  });
};

const MapComponent = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyAtLmI2JS2lpzq6RF9eVHH_Bzr0pP7jmc4",
  });
  const mapRef = React.useRef<google.maps.Map>();
  const onMapLoad = React.useCallback((map: google.maps.Map) => {
    mapRef.current = map;
  }, []);
  const { dataSets } = useContext(MapContext);

  const [selectedArea, setSelectedAreas] = useState({
    lat: 28.6167,
    lng: 77.2092,
  });

  const [polyPath, setPolyPath] = useState([]);
  const [isResumed, setIsResumed] = useState(false);
  const intervalRef = useRef(null);
  const sortedArray = [...sortArrayByTimestamp(dataSets)];
  const newArray = [];
  useEffect(() => {
    if (isResumed) {
      // console.log('from useEffect')
      intervalRef.current = setInterval(
        () => polyPathHandler("useEffect"),
        2000
      );
      return () => clearInterval(intervalRef.current);
    }
    // return ()=>{
    //    sortedArray.length===0 && setIsResumed(false);
    // }
  }, [isResumed, newArray.length]);

  useEffect(() => {
    const lat = parseFloat(dataSets[0].lat);
    const lng = parseFloat(dataSets[0].lng);
    lat > 0 && setSelectedAreas({ lat, lng });
  }, [dataSets]);

  const polyPathHandler = (trigger) => {
    console.log("trigger", trigger);
    console.log(
      "🚀 ~ polyPathHandler ~ sortedArray:",
      sortedArray.length,
      sortedArray,
      isResumed
    );

    if (sortedArray.length > 0) {
      const objectToTransfer = sortedArray.shift();

      objectToTransfer &&
        newArray.push({ lat: objectToTransfer.lat, lng: objectToTransfer.lng });
      setPolyPath([...newArray]);
      console.log("🚀 ~ polyPathHandler ~ newArray:", [...newArray]);
    } else {
      console.log("cleared");
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const handlePause = () => {
    isResumed && setIsResumed(false);
    // if (intervalRef.current) {
    clearInterval(intervalRef.current);
    // }
    console.log("intervalRef.current after clear", intervalRef.current);
  };

  const handleResume = () => {
    !isResumed && setIsResumed(true);
    intervalRef.current = setInterval(
      () => polyPath.length > 0 && polyPathHandler("resume"),
      2000
    );
  };

  

  return (
    <div style={{ marginTop: "50px" }}>
      <button onClick={handleResume}>simulate</button>
      <button onClick={handlePause}>pause</button>
      <button onClick={handleResume}>resume</button>

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
