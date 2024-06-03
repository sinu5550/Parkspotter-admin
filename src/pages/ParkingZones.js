import React, { useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import axios from 'axios';
import { Container, MapContainer, ParkOwner, SearchBox, SidePanel } from './ParkingZones.styled';

mapboxgl.accessToken = 'pk.eyJ1IjoibW93dWoiLCJhIjoiY2x3ZHJjcWs4MDRrMjJqcXBmZnIwMHpvNCJ9.YGSlU2XkHa7quHa1Mnd2Pg';



const ParkingZones = () => {
  const [parkOwners, setParkOwners] = useState([]);
  const [filteredParkOwners, setFilteredParkOwners] = useState([]);
  const [map, setMap] = useState(null);

  useEffect(() => {
    const fetchParkOwners = async () => {
      try {
        const response = await axios.get('https://parkspotter-backened.onrender.com/accounts/parkowner-list/');
        setParkOwners(response.data);
        setFilteredParkOwners(response.data);
      } catch (error) {
        console.error('Error fetching park owners:', error);
      }
    };

    fetchParkOwners();
  }, []);

  useEffect(() => {
    if (parkOwners.length && !map) {
      const initializeMap = () => {
        const map = new mapboxgl.Map({
          container: 'map',
          style: 'mapbox://styles/mapbox/streets-v11',
          center: [90.4125, 23.8103],
          zoom: 12
        });

        parkOwners.forEach(owner => {
          new mapboxgl.Marker()
            .setLngLat([owner.longitude, owner.latitude])
            .setPopup(new mapboxgl.Popup({ offset: 25 }).setText(`${owner.park_owner_id.first_name} ${owner.park_owner_id.last_name}`))
            .addTo(map);
        });

        setMap(map);
      };

      initializeMap();
    }
  }, [parkOwners, map]);

  const handleSearch = (event) => {
    const searchQuery = event.target.value.toLowerCase();
    const filtered = parkOwners.filter(owner => 
      owner.park_owner_id.first_name.toLowerCase().includes(searchQuery) ||
      owner.park_owner_id.last_name.toLowerCase().includes(searchQuery) ||
      owner.address.toLowerCase().includes(searchQuery)
    );
    setFilteredParkOwners(filtered);
  };

  const handleParkOwnerClick = (longitude, latitude) => {
    if (map) {
      map.flyTo({
        center: [longitude, latitude],
        zoom: 15,
        essential: true
      });
    }
  };

  return (
    <Container>
      <MapContainer id="map" />
      <SidePanel>
        <SearchBox type="text" placeholder="Search by name or address" onChange={handleSearch} />
        {filteredParkOwners.map(owner => (
          <ParkOwner key={owner.id} onClick={() => handleParkOwnerClick(owner.longitude, owner.latitude)}>
            <h3>{owner.park_owner_id.first_name} {owner.park_owner_id.last_name}</h3>
            <p>ID: {owner.id}</p>
            <p>Address: {owner.address}</p>
          </ParkOwner>
        ))}
      </SidePanel>
    </Container>
  );
};

export default ParkingZones;
// original