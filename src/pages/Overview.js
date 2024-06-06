import React, { useEffect, useState } from "react"
import Map, { Marker } from "react-map-gl"
import "mapbox-gl/dist/mapbox-gl.css"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js"
import { Bar, Line } from "react-chartjs-2"
import annotationPlugin from "chartjs-plugin-annotation"
import datalabels from "chartjs-plugin-datalabels"
import gradient from "chartjs-plugin-gradient"
import zoomPlugin from "chartjs-plugin-zoom"
import { Link } from "react-router-dom"
import {
  Greeting,
  OverviewContainer,
  RevenueBox,
  RevenueSection,
  RevenueStats,
  SalesLocations,
  StatBox,
  SummaryStats,
} from "./Overview.styled"
import { chartData, lineChartData } from "./overview.data"

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  annotationPlugin,
  datalabels,
  gradient,
  zoomPlugin
)

const Overview = () => {
  const [data, setData] = useState(null)
  const [customerData, setCustomerData] = useState(null)
  const [bookingData, setBookingData] = useState(null)
  const [totalUserBookings, setTotalUserBookings] = useState(0)
  const [parkOwnerData, setParkOwnerData] = useState(null)

  const MAPBOX_TOKEN =
    "pk.eyJ1IjoibW93dWoiLCJhIjoiY2x3ZHJjcWs4MDRrMjJqcXBmZnIwMHpvNCJ9.YGSlU2XkHa7quHa1Mnd2Pg"

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token")
      try {
        const response = await fetch(
          "https://parkspotter-backened.onrender.com/accounts/admin_dashboard/",
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        )
        if (response.ok) {
          const result = await response.json()
          setData(result)
          console.log(result)
        } else {
          console.error(
            "Failed to fetch data:",
            response.status,
            response.statusText
          )
        }
      } catch (error) {
        console.error("Error fetching data:", error)
      }
      try {
        const response = await fetch(
          "https://parkspotter-backened.onrender.com/customer/customer-list",
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        )
        if (response.ok) {
          const result = await response.json()
          setCustomerData(result)
          console.log({ result })
        } else {
          console.error(
            "Failed to fetch data:",
            response.status,
            response.statusText
          )
        }
      } catch (error) {
        console.error("Error fetching data:", error)
      }
      try {
        const response = await fetch(
          "https://parkspotter-backened.onrender.com/accounts/bookings/",
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        )
        if (response.ok) {
          const result = await response.json()
          setBookingData(result)
          console.log({ result })
        } else {
          console.error(
            "Failed to fetch data:",
            response.status,
            response.statusText
          )
        }
      } catch (error) {
        console.error("Error fetching data:", error)
      }

      try {
        const response = await fetch(
          "https://parkspotter-backened.onrender.com/accounts/parkowner-list/",
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        )
        if (response.ok) {
          const result = await response.json()
          setParkOwnerData(result)
          console.log(result)
        } else {
          console.error(
            "Failed to fetch data:",
            response.status,
            response.statusText
          )
        }
      } catch (error) {
        console.error("Error fetching data:", error)
      }

    };

    fetchData()
  }, []);

  const countTotalBookings = (data) => {
    let totalBookingCount = 0

    data.park_owners_with_subscription.forEach((owner) => {
      owner.customers.forEach((customer) => {
        totalBookingCount += customer.booking_count
      })
    })

    return totalBookingCount
  }

  useEffect(() => {
    if (data) {
      const total = countTotalBookings(data)
      setTotalUserBookings(total)
    }
  }, [data])

  const calculateDivisionRatios = (data) => {
    const divisions = {}

    data.forEach((owner) => {
      const division = owner.area
      if (!divisions[division]) {
        divisions[division] = 0
      }
      divisions[division]++
    })

    const totalOwners = data.length
    const divisionRatios = {}

    for (const division in divisions) {
      divisionRatios[division] = (
        (divisions[division] / totalOwners) *
        100
      ).toFixed(2)
    }

    return { divisionRatios, divisions }
  }

  const { divisionRatios, divisions } = parkOwnerData
    ? calculateDivisionRatios(parkOwnerData)
    : { divisionRatios: {}, divisions: {} }

  const maxDivision =
    parkOwnerData &&
    Object.keys(divisions).reduce((a, b) =>
      divisions[a] > divisions[b] ? a : b
    )

  const exportToCSV = () => {
    const headers = ["Division", "Ratio (%)"]
    const rows = Object.entries(divisionRatios).map(([division, ratio]) => [division, ratio])
    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map(row => row.join(","))].join("\n")
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement("a")
    link.setAttribute("href", encodedUri)
    link.setAttribute("download", "division_ratios.csv")
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <OverviewContainer>
      <Greeting>
        <h1>Good Morning, {data?.username}</h1>
        <p>Here's what's happening with ParkSpotter today.</p>
      </Greeting>
      <SummaryStats>
        <StatBox>
          <h2>Total Earnings</h2>
          <p className="increase">
            {data?.total_earnings}
            <span style={{ fontSize: "15px" }}>৳</span>
          </p>
          <Link to={"#"}>View net earnings</Link>
        </StatBox>
        <StatBox>
          <h2>Bookings</h2>
          <p className="decrease">{totalUserBookings} </p>
          <Link to={"#"}>View all Bookings</Link>
        </StatBox>
        <StatBox>
          <h2>Users</h2>
          <p className="increase">{customerData?.length}</p>
          <Link to={"#"}>See details</Link>
        </StatBox>
        <StatBox>
          <h2>Company Balance</h2>
          <p className="neutral">
            {data?.total_earnings}
            <span style={{ fontSize: "15px" }}>৳</span>
          </p>
          <Link to={"#"}>Withdraw money</Link>
        </StatBox>
      </SummaryStats>
      <RevenueSection>
        <RevenueStats>
          <RevenueBox>
            <p>User Bookings</p>
            <h3>{bookingData?.length}</h3>
          </RevenueBox>
          <RevenueBox>
            <p>Revenue</p>
            <h3>
              {data?.net_revenue}
              <span style={{ fontSize: "15px" }}>৳</span>
            </h3>
          </RevenueBox>
          <RevenueBox>
            <p>Parkowners</p>
            <h3>{data?.park_owners_with_subscription?.length}</h3>
          </RevenueBox>
          <RevenueBox>
            <p>Refunds</p>
            <h3>0</h3>
          </RevenueBox>
          <RevenueBox>
            <p>Conversion Ratio</p>
            <h3>{data?.conversion_ratio}%</h3>
          </RevenueBox>
        </RevenueStats>
      </RevenueSection>
      <SalesLocations>
        <h2>Sales by Locations</h2>
        <Map
          initialViewState={{
            latitude: 23.813334,
            longitude: 90.424164,
            zoom: 7.5,
          }}
          style={{ width: "100%", height: 400 }}
          mapStyle="mapbox://styles/mapbox/streets-v11"
          mapboxAccessToken={MAPBOX_TOKEN}
        >
          {parkOwnerData &&
            parkOwnerData
              .filter(owner => owner.latitude && owner.longitude) 
              .map(owner => (
                <Marker
                  key={owner.id}
                  latitude={parseFloat(owner.latitude)}
                  longitude={parseFloat(owner.longitude)}
                >
                  <div
                    style={{
                      backgroundColor: owner.area === maxDivision ? "red" : "lightblue",
                      width: "30px",
                      height: "30px",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <div
                      style={{
                        backgroundColor: "white",
                        width: "15px",
                        height: "15px",
                        borderRadius: "50%",
                      }}
                    ></div>
                  </div>
                </Marker>
              ))}
        </Map>
        <table style={{ width: "100%", marginTop: "20px", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Division</th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Ratio (%)</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(divisionRatios).map(([division, ratio]) => (
              <tr key={division}>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{division}</td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{ratio}%</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={exportToCSV} style={{ marginTop: "20px", padding: "10px 20px" }}>
          Export Report
        </button>
      </SalesLocations>
      <div>
        <h2>Monthly Earnings</h2>
        <Bar data={chartData} />
      </div>
      <div>
        <h2>Monthly Bookings</h2>
        <Line data={lineChartData} />
      </div>
    </OverviewContainer>
  )
}

export default Overview
