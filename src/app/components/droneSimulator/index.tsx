"use client";

import { MapContext } from "@/app/MapContext";
import React, { useContext, useState } from "react";
import csvToJSON from "@/app/helpers/csvToJsonConverter";

const DroneSimulator = () => {
  const { dataSets, setDataSets } = useContext(MapContext);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    console.log("file changed", event.target.files[0]);
  };

  const handleUpload = (e) => {
    e.preventDefault();
    if (!selectedFile) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const csvData = event.target.result;
      console.log(csvData.toString());
      const convertedCsv = csvToJSON(csvData.toString());
      console.log("🚀 ~ handleUpload ~ convertedCsv:", convertedCsv);
      setDataSets(convertedCsv);
    };
    // console.log(parsedData)
    reader.readAsText(selectedFile);
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
    console.log("updatedDataSets", updatedDataSets);
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
    <div style={{ marginTop: "40px" }}>
      <form>
        <div>
          <label htmlFor="csvFile">Select CSV file: </label>
          <input
            style={{ border: "1px solid", marginRight: "10px" }}
            type="file"
            id="csvFile"
            name="csvFile"
            onChange={handleFileChange}
            accept=".csv"
          />
          <button onClick={(e) => handleUpload(e)}>upload file</button>
        </div>

        <div style={{ paddingTop: "20px" }}>
          {dataSets.map((data, index) => (
            <div key={index}>
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
        </div>
        <button onClick={(e) => handleAddMore(e)}>add more</button>
      </form>
    </div>
  );
};

export default DroneSimulator;
