import React from "react"
import styled from "styled-components"
import {
  FaSearch,
  FaFilter,
  // FaChartPie,
  FaPlusCircle,
  FaTrashAlt,
} from "react-icons/fa"
import { Bar, Doughnut, Pie } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
)

const ZonesContainer = styled.div`
  background-color: #f7f8fa;
  font-family: Arial, sans-serif;
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

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  background-color: #fff;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  input {
    border: none;
    outline: none;
    margin-left: 10px;
    flex: 1;
  }
`

const Filters = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;

  button {
    display: flex;
    align-items: center;
    background-color: #3498db;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;

    svg {
      margin-right: 10px;
    }

    &:hover {
      background-color: #2980b9;
    }
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

const zoneDistributionData = {
  labels: ["Zone A", "Zone B", "Zone C", "Zone D"],
  datasets: [
    {
      data: [300, 50, 100, 40],
      backgroundColor: ["#3498db", "#2ecc71", "#e74c3c", "#f1c40f"],
    },
  ],
}

const occupancyRateData = {
  labels: ["Zone A", "Zone B", "Zone C", "Zone D"],
  datasets: [
    {
      label: "Occupancy Rate",
      data: [85, 65, 45, 30],
      backgroundColor: "#3498db",
      borderColor: "#3498db",
      fill: true,
    },
  ],
}

const revenueData = {
  labels: ["Zone A", "Zone B", "Zone C", "Zone D"],
  datasets: [
    {
      label: "Revenue",
      data: [3000, 5000, 4000, 2000],
      backgroundColor: ["#3498db", "#2ecc71", "#e74c3c", "#f1c40f"],
    },
  ],
}

const Zones = () => {
  return (
    <ZonesContainer>
      <Header>
        <h1>Zones</h1>
        <SearchBar>
          <FaSearch />
          <input type="text" placeholder="Search zones..." />
        </SearchBar>
      </Header>
      <Filters>
        <button>
          <FaFilter />
          Filter
        </button>
        <button>
          <FaPlusCircle />
          Add Zone
        </button>
        <button>
          <FaTrashAlt />
          Remove Zone
        </button>
      </Filters>
      <Stats>
        <StatBox>
          <h2>Total Zones</h2>
          <p>10</p>
        </StatBox>
        <StatBox>
          <h2>Occupied Zones</h2>
          <p>7</p>
        </StatBox>
        <StatBox>
          <h2>Vacant Zones</h2>
          <p>3</p>
        </StatBox>
      </Stats>
      <Charts>
        <ChartBox>
          <h3>Zone Distribution</h3>
          <Doughnut data={zoneDistributionData} />
        </ChartBox>
        <ChartBox>
          <h3>Revenue</h3>
          <Pie data={revenueData} />
        </ChartBox>
      </Charts>
      <ChartBox>
        <h3>Occupancy Rate</h3>
        <Bar data={occupancyRateData} />
      </ChartBox>
    </ZonesContainer>
  )
}

export default Zones
