"use client"

import { MapContext } from "@/app/MapContext";
import React, { useContext, useState } from "react";
import { Form } from "react-final-form";

type DataSets = {
  lat: number;
  lng: number;
  timestamp: any;
};

const DroneSimulator = () => {
//   const [dataSets, setDataSets] = useState<DataSets[]>([
//     { lat: 0, lng: 0, timestamp: '' },
//   ]);
const {dataSets,setDataSets} = useContext(MapContext)
console.log("🚀 ~ DroneSimulator ~ dataSets:", dataSets)

    

  const onSubmit = (event) => {
    event.preventDefault();
    console.log("form submitted");
  };

  const handelOnChange = ( event:any,index:number) => {
    const {name, value} = event.target;
   // console.log("🚀 ~ handelOnChange ~ dataSets:", dataSets)

    const updatedDataSets  = [...dataSets]
    console.log("🚀 ~ handelOnChange ~ updatedDataSets:", updatedDataSets)
    updatedDataSets[index][name] = parseFloat(value)  ;

    setDataSets(updatedDataSets)
    

  }
    
  const handleAddMore = (e) =>{
    e.preventDefault();
    const updatedData = [...dataSets, { lat: 0, lng: 0, timestamp: '' }]
    setDataSets(updatedData)
  }

  return (
    <div >
      

      <Form onSubmit={(event)=>onSubmit(event)}
       render={({ handleSubmit }) => (
        <form  >
        {dataSets.map((data,index) => (
          <div key={data.timestamp} >
            <input placeholder="lat" value={data.lat} onChange={(event)=>handelOnChange(event,index)}  name="lat" type="number" />
            <input placeholder="lng" value={data.lng} onChange={(event)=>handelOnChange(event,index)} name="lng" type="number" />
            <input placeholder="timestamp" value={data.timestamp} onChange={(event)=>handelOnChange(event,index)} name="timestamp" type="datetime-local" />
          
            <button onClick={(e)=>handleAddMore(e)}  >add more</button>
            {/* <button>delete</button> */}
          </div>
        ))}
        </form>
       )}
      />
        
    </div>
  );
};

export default DroneSimulator;
