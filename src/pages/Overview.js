import React from "react"
import styled from "styled-components"
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

const OverviewContainer = styled.div`
  background-color: #f7f8fa;
  color: #333;
  font-family: Arial, sans-serif;
`

const Greeting = styled.div`
  margin-bottom: 20px;

  h1 {
    font-size: 24px;
    color: #405189;
  }

  p {
    color: #555;
  }
`

// const DateRange = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   margin-bottom: 20px;

//   span {
//     margin-right: 10px;
//     color: #888;
//   }

//   button {
//     padding: 5px 10px;
//     background-color: #3498db;
//     color: white;
//     border: none;
//     cursor: pointer;
//   }
// `

const SummaryStats = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  gap: 15px;
`

const StatBox = styled.div`
  width: 23%;
  padding: 20px;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;

  h2 {
    margin: 0;
    font-size: 16px;
    color: #333;
  }

  p {
    font-size: 24px;
    margin: 10px 0;
    color: #333;
  }

  .increase {
    color: #27ae60;
  }

  .decrease {
    color: #c0392b;
  }

  .neutral {
    color: #f39c12;
  }

  a {
    color: #3498db;
    text-decoration: none;
    font-size: 14px;
  }
`

const RevenueSection = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`

const RevenueStats = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 10px;
`

const RevenueBox = styled.div`
  width: 23%;
  padding: 20px;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;

  p {
    margin: 0;
    font-size: 16px;
    color: #333;
  }

  h3 {
    margin: 10px 0;
    font-size: 24px;
    color: #333;
  }
`

const SalesLocations = styled.div`
  width: 100%;
  padding: 20px 40px;
  box-sizing: border-box;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;

  h2 {
    margin: 0 0 10px 0;
    font-size: 18px;
    color: #333;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 10px 0;
  }

  li {
    margin: 5px 0;
    font-size: 14px;
    color: #333;
    display: flex;
    justify-content: space-between;
  }

  button {
    padding: 5px 10px;
    background-color: #3498db;
    color: white;
    border: none;
    cursor: pointer;
  }
`

const chartData = {
  labels: ["January", "February", "March", "April", "May", "June"],
  datasets: [
    {
      label: "Earnings",
      backgroundColor: "rgba(54, 162, 235, 0.6)",
      borderColor: "rgba(54, 162, 235, 1)",
      borderWidth: 1,
      hoverBackgroundColor: "rgba(54, 162, 235, 0.8)",
      hoverBorderColor: "rgba(54, 162, 235, 1)",
      data: [65, 59, 80, 81, 56, 55],
    },
  ],
}

const lineChartData = {
  labels: ["January", "February", "March", "April", "May", "June"],
  datasets: [
    {
      label: "Orders",
      fill: false,
      lineTension: 0.1,
      backgroundColor: "rgba(75,192,192,0.4)",
      borderColor: "rgba(75,192,192,1)",
      borderCapStyle: "butt",
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: "miter",
      pointBorderColor: "rgba(75,192,192,1)",
      pointBackgroundColor: "#fff",
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: "rgba(75,192,192,1)",
      pointHoverBorderColor: "rgba(220,220,220,1)",
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [65, 59, 80, 81, 56, 55],
    },
  ],
}

const Overview = () => {
  const MAPBOX_TOKEN =
    "pk.eyJ1IjoibW93dWoiLCJhIjoiY2x3ZHJjcWs4MDRrMjJqcXBmZnIwMHpvNCJ9.YGSlU2XkHa7quHa1Mnd2Pg" 

  return (
    <OverviewContainer>
      <Greeting>
        <h1>Good Morning, Anna!</h1>
        <p>Here's what's happening with ParkSpotter today.</p>
      </Greeting>
      <SummaryStats>
        <StatBox>
          <h2>Total Earnings</h2>
          <p className="increase">$559.25k</p>
          <Link to={"#"}>View net earnings</Link>
        </StatBox>
        <StatBox>
          <h2>Bookings</h2>
          <p className="decrease">36,894</p>
          <Link to={"#"}>View all Bookings</Link>
        </StatBox>
        <StatBox>
          <h2>Users</h2>
          <p className="increase">183.35M</p>
          <Link to={"#"}>See details</Link>
        </StatBox>
        <StatBox>
          <h2>Company Balance</h2>
          <p className="neutral">$165.89k</p>
          <Link to={"#"}>Withdraw money</Link>
        </StatBox>
      </SummaryStats>
      <RevenueSection>
        <RevenueStats>
          <RevenueBox>
            <p>User Bookings</p>
            <h3>7,585</h3>
          </RevenueBox>
          <RevenueBox>
            <p>Revenue</p>
            <h3>$22.89k</h3>
          </RevenueBox>
          <RevenueBox>
            <p>Parkowners</p>
            <h3>2,890</h3>
          </RevenueBox>
          <RevenueBox>
            <p>Refunds</p>
            <h3>367</h3>
          </RevenueBox>
          <RevenueBox>
            <p>Conversion Ratio</p>
            <h3>18.92%</h3>
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
          <Marker latitude={23.777176} longitude={90.399452}>
            <div
              style={{
                backgroundColor: "red",
                width: "20px",
                height: "20px",
                borderRadius: "99px",
              }}
            >
              <div
                style={{
                  backgroundColor: "white",
                  width: "15px",
                  height: "15px",
                  borderRadius: "99px",
                }}
              >
                <div
                  style={{
                    backgroundColor: "black",
                    width: "10px",
                    height: "10px",
                    borderRadius: "99px",
                  }}
                ></div>
              </div>
            </div>
          </Marker>
          <Marker latitude={23.86667} longitude={89.95}>
            <div
              style={{
                backgroundColor: "red",
                width: "20px",
                height: "20px",
                borderRadius: "99px",
              }}
            >
              <div
                style={{
                  backgroundColor: "white",
                  width: "15px",
                  height: "15px",
                  borderRadius: "99px",
                }}
              >
                <div
                  style={{
                    backgroundColor: "black",
                    width: "10px",
                    height: "10px",
                    borderRadius: "99px",
                  }}
                ></div>
              </div>
            </div>
          </Marker>
          <Marker latitude={23.911522} longitude={90.388962}>
            <div
              style={{
                backgroundColor: "red",
                width: "20px",
                height: "20px",
                borderRadius: "99px",
              }}
            >
              <div
                style={{
                  backgroundColor: "white",
                  width: "15px",
                  height: "15px",
                  borderRadius: "99px",
                }}
              >
                <div
                  style={{
                    backgroundColor: "black",
                    width: "10px",
                    height: "10px",
                    borderRadius: "99px",
                  }}
                ></div>
              </div>
            </div>
          </Marker>
          <Marker latitude={23.98333} longitude={91.16667}>
            <div
              style={{
                backgroundColor: "red",
                width: "20px",
                height: "20px",
                borderRadius: "99px",
              }}
            >
              <div
                style={{
                  backgroundColor: "white",
                  width: "15px",
                  height: "15px",
                  borderRadius: "99px",
                }}
              >
                <div
                  style={{
                    backgroundColor: "black",
                    width: "10px",
                    height: "10px",
                    borderRadius: "99px",
                  }}
                ></div>
              </div>
            </div>
          </Marker>
        </Map>
        <ul>
          <li>
            <span style={{ fontWeight: "bold" }}>Dhaka</span>
            <span>75%</span>
          </li>
          <li>
            <span style={{ fontWeight: "bold" }}>Tongi</span>
            <span>47%</span>
          </li>
          <li>
            <span style={{ fontWeight: "bold" }}>Manikganj</span>
            <span>36%</span>
          </li>
          <li>
            <span style={{ fontWeight: "bold" }}>Brahmanbaria</span>
            <span>25%</span>
          </li>
        </ul>
        <button>Export Report</button>
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
