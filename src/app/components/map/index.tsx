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
    const lat = parseFloat(dataSets[0].lat);
    const lng = parseFloat(dataSets[0].lng);
    lat > 0 && setSelectedAreas({ lat, lng });
  }, [dataSets]);

  const polyPathHandler = (trigger,sourceArray) => {
    console.log("trigger", trigger);
    console.log(
      "🚀 ~ polyPathHandler ~ sortedArray:",
      sourceArray.length,
      sourceArray,
      isResumed
    );

    if (sourceArray?.length > 0) {
      const objectToTransfer = sourceArray.shift();

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
    setIsResumed(false);
    // if (intervalRef.current) {

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    // }
    console.log("intervalRef.current after clear", intervalRef.current);
  };

  const handleResume = () => {
    setIsResumed(true);
    console.log("polyPath", polyPath);
    const currentPolyPath = [...polyPath]
    // setPolyPath([...newArray]);
    // if (!intervalRef.current) {
      intervalRef.current = setInterval(
        () => polyPath.length > 0 && polyPathHandler("resume",currentPolyPath),
        2000
      );
    // }
  };
  const handleSimulate = () => {
    setIsResumed(true);
    intervalRef.current = setInterval(
      () => polyPath.length > 0 && polyPathHandler("simulate", sortedArray),
      2000
    );
  };

  useEffect(() => {
    if (isResumed) {
      // console.log('from useEffect')
      intervalRef.current = setInterval(
        () => polyPathHandler("useEffect",sortedArray),
        2000
      );
      return () => clearInterval(intervalRef.current);
    }
    // return ()=>{
    //    sortedArray.length===0 && setIsResumed(false);
    // }
  }, [isResumed]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "20px",
      }}
    >
      <div style={{ margin: "20px 0" }}>
        <button onClick={handleSimulate}>simulate</button>
        <button onClick={handlePause}>pause</button>
        <button onClick={handleResume}>resume</button>
      </div>

      {isLoaded && (
        <GoogleMap
          mapContainerStyle={{
            height: "700px",
            width: "700px",
          }}
          center={selectedArea}
          zoom={13}
          onLoad={onMapLoad}
        >
          {dataSets.map((data, index) => (
            <MarkerF
              key={index}
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
