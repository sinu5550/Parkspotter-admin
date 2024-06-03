import React from "react"
import styled from "styled-components"
import { FaUsers, FaParking, FaDollarSign, FaChartLine } from "react-icons/fa"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js"
import { Bar, Line, Doughnut } from "react-chartjs-2"
import annotationPlugin from "chartjs-plugin-annotation"
import datalabels from "chartjs-plugin-datalabels"
import gradient from "chartjs-plugin-gradient"
import zoomPlugin from "chartjs-plugin-zoom"

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement, 
  Title,
  Tooltip,
  Legend,
  Filler,
  annotationPlugin,
  datalabels,
  gradient,
  zoomPlugin
)

const AnalyticsContainer = styled.div`
  flex: 1;
  background-color: #f7f8fa;
  font-family: Arial, sans-serif;
  padding: 20px;

`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  h1 {
    font-size: 24px;
    color: #333;
  }
`

const DateRange = styled.div`
  display: flex;
  align-items: center;

  span {
    margin-right: 10px;
    font-size: 14px;
    color: #666;
  }

  button {
    padding: 5px 10px;
    background-color: #3498db;
    color: white;
    border: none;
    cursor: pointer;
    border-radius: 5px;
  }
`

const Stats = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`

const StatBox = styled.div`
  flex: 1;
  margin-right: 20px;
  padding: 20px;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &:last-child {
    margin-right: 0;
  }

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
`

const Charts = styled.div`
  display: flex;
  justify-content: space-between;
`

const ChartBox = styled.div`
  flex: 1;
  margin-right: 20px;
  padding: 20px;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &:last-child {
    margin-right: 0;
  }

  h3 {
    margin: 0 0 10px 0;
    font-size: 18px;
    color: #333;
  }
`

const revenueData = {
  labels: ["January", "February", "March", "April", "May", "June"],
  datasets: [
    {
      label: "Revenue",
      data: [65, 59, 80, 81, 56, 55],
      backgroundColor: "rgba(75, 192, 192, 0.2)",
      borderColor: "rgba(75, 192, 192, 1)",
      borderWidth: 1,
    },
  ],
}

const userGrowthData = {
  labels: ["January", "February", "March", "April", "May", "June"],
  datasets: [
    {
      label: "User Growth",
      data: [33, 53, 85, 41, 44, 65],
      fill: true,
      backgroundColor: "rgba(153, 102, 255, 0.2)",
      borderColor: "rgba(153, 102, 255, 1)",
      borderWidth: 1,
    },
  ],
}

const bookingsData = {
  labels: ["Zone A", "Zone B", "Zone C", "Zone D"],
  datasets: [
    {
      label: "Bookings",
      data: [300, 50, 100, 80],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
      ],
      borderWidth: 1,
    },
  ],
}

const Analytics = () => {
  return (
    <AnalyticsContainer>
      <Header>
        <h1>Analytics</h1>
        <DateRange>
          <span>01 Jan, 2024 to 31 Jan, 2024</span>
          <button>Filter Date</button>
        </DateRange>
      </Header>
      <Stats>
        <StatBox>
          <h2>Total Users</h2>
          <p className="increase">
            <FaUsers /> 183.35M
          </p>
        </StatBox>
        <StatBox>
          <h2>Active Parkowners</h2>
          <p className="neutral">
            <FaParking /> 36,894
          </p>
        </StatBox>
        <StatBox>
          <h2>Total Revenue</h2>
          <p className="increase">
            <FaDollarSign /> $559.25k
          </p>
        </StatBox>
        <StatBox>
          <h2>Bookings</h2>
          <p className="decrease">
            <FaChartLine /> 7,585
          </p>
        </StatBox>
      </Stats>
      <Charts>
        <ChartBox>
          <h3>Revenue Over Time</h3>
          <Line data={revenueData} />
        </ChartBox>
        <ChartBox>
          <h3>User Growth</h3>
          <Bar data={userGrowthData} />
        </ChartBox>
      </Charts>
      <ChartBox style={{ marginTop: "20px" }}>
        <h3>Bookings by Zone</h3>
        <Doughnut data={bookingsData} />
      </ChartBox>
    </AnalyticsContainer>
  )
}

export default Analytics
