"use client";

import { Dispatch, SetStateAction, createContext, useState } from "react";


export type MapDataType ={
    lat: number;
    lng: number;
}
export interface DataSets  {
    lat: string;
    lng: string;
  timestamp: any;
};

interface ContextType {
  dataSets: DataSets[];
  setDataSets?: any;
}

const initialValues = [{ lat: '', lng: '', timestamp: "" }];
export const MapContext = createContext<ContextType>({
  dataSets: initialValues,
});

export const MapProvider = ({ children }) => {
  const [dataSets, setDataSets] = useState<DataSets[]>(initialValues);

  return (
    <MapContext.Provider value={{ dataSets, setDataSets }}>
      {children}
    </MapContext.Provider>
  );
};
