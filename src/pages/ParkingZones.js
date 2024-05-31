import React, { useState } from 'react';
import styled from 'styled-components';
import ReactMapGL, { Marker, Popup, NavigationControl, FullscreenControl, ScaleControl, GeolocateControl } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

// Dummy data for parking zones in Dhaka
const parkingZones = [
  { id: 1, name: 'Parking Zone 1', latitude: 23.8103, longitude: 90.4125, description: 'Near Bashundhara City Mall' },
  { id: 2, name: 'Parking Zone 2', latitude: 23.7945, longitude: 90.4043, description: 'Beside Dhaka University' },
  { id: 3, name: 'Parking Zone 3', latitude: 23.7793, longitude: 90.3996, description: 'Adjacent to BUET' },
  { id: 4, name: 'Parking Zone 4', latitude: 23.7285, longitude: 90.3854, description: 'Close to Sadarghat' },
];

const Container = styled.div`
  display: flex;
  height: 100vh;
`;

const Sidebar = styled.div`
  width: 300px;
  background-color: #2c3e50;
  color: white;
  padding: 20px;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h1`
  font-size: 24px;
  color: #ecf0f1;
  margin-bottom: 20px;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  flex-grow: 1;
  overflow-y: auto;
`;

const ListItem = styled.li`
  margin-bottom: 10px;
  padding: 10px;
  background: ${(props) => (props.active ? '#34495e' : 'transparent')};
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: #34495e;
  }
`;

const MapContainer = styled.div`
  flex-grow: 1;
  position: relative;
`;

const PopupContainer = styled.div`
  padding: 10px;
  background: white;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

const SearchInput = styled.input`
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 4px;
  border: none;
  font-size: 16px;
`;

const controlStyle = {
  position: 'absolute',
  top: 10,
  left: 10,
};

const fullscreenControlStyle = {
  position: 'absolute',
  top: 10,
  right: 10,
};

const geolocateControlStyle = {
  position: 'absolute',
  top: 10,
  right: 50,
};

const ParkingZones = () => {
  const [viewport, setViewport] = useState({
    latitude: 23.8103,
    longitude: 90.4125,
    zoom: 12,
    width: '100%',
    height: '100%',
  });

  const [selectedZone, setSelectedZone] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredZones = parkingZones.filter(zone =>
    zone.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewportChange = (newViewport) => {
    console.log("New viewport: ", newViewport);
    setViewport(newViewport);
  };

  return (
    <Container>
      <Sidebar>
        <Title>Parking Zones in Dhaka</Title>
        <SearchInput
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <List>
          {filteredZones.map((zone) => (
            <ListItem
              key={zone.id}
              onClick={() => {
                const { latitude, longitude } = zone;
                if (latitude !== undefined && longitude !== undefined) {
                  setViewport({ ...viewport, latitude, longitude, zoom: 14 });
                  setSelectedZone(zone);
                } else {
                  console.error("Latitude or longitude is undefined for zone: ", zone);
                }
              }}
              active={selectedZone && selectedZone.id === zone.id}
            >
              {zone.name}
            </ListItem>
          ))}
        </List>
      </Sidebar>
      <MapContainer>
        <ReactMapGL
          {...viewport}
          mapboxApiAccessToken="pk.eyJ1IjoibW93dWoiLCJhIjoiY2x3ZHJjcWs4MDRrMjJqcXBmZnIwMHpvNCJ9.YGSlU2XkHa7quHa1Mnd2Pg"
          onViewportChange={handleViewportChange}
          mapStyle="mapbox://styles/mapbox/streets-v11"
        >
          {filteredZones.map((zone) => (
            <Marker key={zone.id} latitude={zone.latitude} longitude={zone.longitude}>
              <button
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  transform: 'translate(-50%, -50%)',
                }}
                onClick={() => setSelectedZone(zone)}
              >
                <img
                  src="https://docs.mapbox.com/help/demos/custom-markers-gl-js/mapbox-icon.png"
                  alt="Parking Zone Marker"
                  width="30px"
                  height="30px"
                />
              </button>
            </Marker>
          ))}

          {selectedZone && (
            <Popup
              latitude={selectedZone.latitude}
              longitude={selectedZone.longitude}
              onClose={() => setSelectedZone(null)}
              closeOnClick={true}
              anchor="top"
            >
              <PopupContainer>
                <h3>{selectedZone.name}</h3>
                <p>{selectedZone.description}</p>
                <p>Latitude: {selectedZone.latitude}</p>
                <p>Longitude: {selectedZone.longitude}</p>
              </PopupContainer>
            </Popup>
          )}

          <NavigationControl style={controlStyle} />
          <FullscreenControl style={fullscreenControlStyle} />
          <GeolocateControl style={geolocateControlStyle} />
          <ScaleControl />
        </ReactMapGL>
      </MapContainer>
    </Container>
  );
};

export default ParkingZones;
