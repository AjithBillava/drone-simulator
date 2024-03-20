import { MapProvider } from "./MapContext";
import DroneSimulator from "./components/droneSimulator";
import MapComponent from "./components/map";

export default function Home() {
  return (
    <MapProvider>
      <main style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',minWidth:'100vw'}} >
        <h1 style={{margin:'20px'}}>Drone Simulator </h1>
        <DroneSimulator />
        <MapComponent />
      </main>
    </MapProvider>
  );
}
