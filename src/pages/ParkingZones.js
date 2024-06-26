import React, { useEffect, useState } from "react"
import mapboxgl from "mapbox-gl"
import axios from "axios"
import {
  Container,
  MapContainer,
  ParkOwner,
  SearchBox,
  SidePanel,
} from "./ParkingZones.styled"

mapboxgl.accessToken =
  "pk.eyJ1IjoibW93dWoiLCJhIjoiY2x3ZHJjcWs4MDRrMjJqcXBmZnIwMHpvNCJ9.YGSlU2XkHa7quHa1Mnd2Pg"

const isValidCoordinate = (coord) =>
  coord !== null && typeof coord === "number" && !isNaN(coord)

const parseCoordinate = (coord) => {
  if (coord === null) return null
  const parsed = parseFloat(coord)
  return isNaN(parsed) ? null : parsed
}

const ParkingZones = () => {
  const [parkOwners, setParkOwners] = useState([])
  const [filteredParkOwners, setFilteredParkOwners] = useState([])
  const [map, setMap] = useState(null)

  useEffect(() => {
    const fetchParkOwners = async () => {
      try {
        const response = await axios.get(
          "https://parkspotter-backened.onrender.com/accounts/parkowner-list/"
        )
        const data = response.data.map((owner) => ({
          ...owner,
          latitude: parseCoordinate(owner.latitude),
          longitude: parseCoordinate(owner.longitude),
        }))
        setParkOwners(data)
        setFilteredParkOwners(data)
      } catch (error) {
        console.error("Error fetching park owners:", error)
      }
    }

    fetchParkOwners()
  }, [])

  useEffect(() => {
    if (parkOwners.length && !map) {
      const initializeMap = () => {
        const map = new mapboxgl.Map({
          container: "map",
          style: "mapbox://styles/mapbox/streets-v11",
          center: [90.4125, 23.8103],
          zoom: 12,
        })

        parkOwners.forEach((owner) => {
          if (
            isValidCoordinate(owner.longitude) &&
            isValidCoordinate(owner.latitude)
          ) {
            const popupContent = `
               <div style="padding:20px 40px 20px 20px; display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; width: 250px;">
    <div style="grid-column: span 2; text-align: center; margin-bottom: 10px;">
      <h3 style="margin: 0;">${owner.park_owner_id.first_name} ${owner.park_owner_id.last_name}</h3>
    </div>
    <div><strong>Username:</strong> ${owner.park_owner_id.username}</div>
    <div><strong>Email:</strong> ${owner.park_owner_id.email}</div>
    <div><strong>Mobile No:</strong> ${owner.mobile_no}</div>
    <div><strong>NID Card No:</strong> ${owner.nid_card_no}</div>
    <div><strong>Slot Size:</strong> ${owner.slot_size}</div>
    <div><strong>Available Slot:</strong> ${owner.available_slot}</div>
    <div><strong>Subscription Start Date:</strong> ${owner.subscription_start_date}</div>
    <div><strong>Subscription End Date:</strong> ${owner.subscription_end_date}</div>
    <div><strong>Subscription ID:</strong> ${owner.subscription_id}</div>
    <div><strong>Payment Method:</strong> ${owner.payment_method}</div>
    <div><strong>Amount:</strong> ${owner.amount}</div>
    <div><strong>Payment Date:</strong> ${owner.payment_date}</div>
    <div><strong>Joined Date:</strong> ${owner.joined_date}</div>
  </div>
            `

            new mapboxgl.Marker()
              .setLngLat([owner.longitude, owner.latitude])
              .setPopup(
                new mapboxgl.Popup({
                  offset: 25,
                  maxWidth: "none",
                  className: "my-popup",
                  anchor: "top",
                }).setHTML(popupContent)
              )
              .addTo(map)
          } else {
            console.warn("Invalid coordinates for owner:", owner)
          }
        })

        setMap(map)
      }

      initializeMap()
    }
  }, [parkOwners, map])

  const handleSearch = (event) => {
    const searchQuery = event.target.value.toLowerCase()
    const filtered = parkOwners.filter(
      (owner) =>
        owner.park_owner_id.first_name.toLowerCase().includes(searchQuery) ||
        owner.park_owner_id.last_name.toLowerCase().includes(searchQuery) ||
        owner.address.toLowerCase().includes(searchQuery)
    )
    setFilteredParkOwners(filtered)
  }

  const handleParkOwnerClick = (longitude, latitude) => {
    if (map && isValidCoordinate(longitude) && isValidCoordinate(latitude)) {
      map.flyTo({
        center: [longitude, latitude],
        zoom: 15,
        essential: true,
      })
    }
  }

  return (
    <Container>
      <MapContainer id="map" />
      <SidePanel>
        <SearchBox
          type="text"
          placeholder="Search by name or address"
          onChange={handleSearch}
        />
        {filteredParkOwners.map((owner) => (
          <ParkOwner
            key={owner.id}
            onClick={() =>
              handleParkOwnerClick(owner.longitude, owner.latitude)
            }
          >
            <h3>
              {owner.park_owner_id.first_name} {owner.park_owner_id.last_name}
            </h3>
            <p>Address: {owner.address}</p>
            <p>Capacity: {owner.capacity}</p>
            <p>Latitude: {owner.latitude}</p>
            <p>Longitude: {owner.longitude}</p>
            <p>Area: {owner.area}</p>
          </ParkOwner>
        ))}
      </SidePanel>
    </Container>
  )
}

export default ParkingZones
