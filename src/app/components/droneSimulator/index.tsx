"use client";

import { MapContext } from "@/app/MapContext";
import React, { useContext, useState } from "react";
import { Form } from "react-final-form";

const DroneSimulator = () => {
  const { dataSets, setDataSets } = useContext(MapContext);
  console.log("🚀 ~ DroneSimulator ~ dataSets:", dataSets);

  const onSubmit = (event) => {
    event.preventDefault();
    console.log("form submitted");
  };

  const handelOnChange = (event: any, index: number) => {
    const { name, value } = event.target;
    console.log("🚀 ~ handelOnChange ~ dataSets:", value);
    if (name === "lat" && (value > 90 || value < -90)) {
      return alert("please enter correct latitude");
    }
    if (name === "lng" && (value > 180 || value < -180)) {
      return alert("please enter correct longitude");
    }
    const updatedDataSets = [...dataSets];
    // console.log("🚀 ~ handelOnChange ~ updatedDataSets:", updatedDataSets)
    if (name == "timestamp") {
      updatedDataSets[index][name] = value;
    } else {
      updatedDataSets[index][name] = parseFloat(value);
    }

    setDataSets(updatedDataSets);
  };

  const handleAddMore = (e) => {
    const now = new Date();
    const offset = now.getTimezoneOffset() * 60000;
    const adjustedDate = new Date(now.getTime() - offset);
    const formattedDate = adjustedDate.toISOString().substring(0, 16);
    e.preventDefault();
    console.log("formattedDate", formattedDate);
    const updatedData = [
      ...dataSets,
      { lat: "", lng: "", timestamp: formattedDate },
    ];
    setDataSets(updatedData);
  };

  return (
    <div>
      <Form
        onSubmit={(event) => onSubmit(event)}
        render={({ handleSubmit }) => (
          <form>
            {dataSets.map((data, index) => (
              <div key={data.timestamp}>
                <input
                  placeholder="lat"
                  value={data.lat}
                  onChange={(event) => handelOnChange(event, index)}
                  name="lat"
                  type="number"
                />
                <input
                  placeholder="lng"
                  value={data.lng}
                  onChange={(event) => handelOnChange(event, index)}
                  name="lng"
                  type="number"
                />
                <input
                  placeholder="timestamp"
                  value={data.timestamp}
                  onChange={(event) => handelOnChange(event, index)}
                  name="timestamp"
                  type="datetime-local"
                />

                {/* <button>delete</button> */}
              </div>
            ))}
                <button onClick={(e) => handleAddMore(e)}>add more</button>

          </form>
        )}
      />
    </div>
  );
};

export default DroneSimulator;
