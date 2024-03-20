import { MapProvider } from "./MapContext";
import DroneSimulator from "./components/droneSimulator";
import MapComponent from "./components/map";

export default function Home() {
  return (
    <MapProvider>
      <main>
        <DroneSimulator />
        <MapComponent />
      </main>
    </MapProvider>
  );
}
