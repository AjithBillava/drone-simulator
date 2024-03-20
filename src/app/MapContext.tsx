"use client";

import { Dispatch, SetStateAction, createContext, useState } from "react";

export type MapDataType = {
  lat: number;
  lng: number;
};
export interface DataSets {
  lat: string;
  lng: string;
  timestamp: any;
}

interface ContextType {
  dataSets: DataSets[];
  setDataSets?: any;
}

const now = new Date();
const offset = now.getTimezoneOffset() * 60000;
const adjustedDate = new Date(now.getTime() - offset);
const formattedDate = adjustedDate.toISOString().substring(0, 16);

const initialValues = [{ lat: "", lng: "", timestamp: formattedDate }];
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
