import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

function MapPage() {

  const center = {
    lat: 44.4268,   // București
    lng: 26.1025
  };

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <LoadScript googleMapsApiKey="AIzaSyCJLe-apjbNBGc__MZeeIELZI3d3WazNP0">
        
        <GoogleMap
          mapContainerStyle={{ width: "100%", height: "100%" }}
          center={center}
          zoom={12}
        >
          <Marker position={center} />
        </GoogleMap>

      </LoadScript>
    </div>
  );
}

export default MapPage;