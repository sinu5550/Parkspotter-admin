import React from "react"
import styled from "styled-components"
import {
  FaSearch,
  FaFilter,
  // FaChartLine,
  FaUserPlus,
  FaUserTimes,
} from "react-icons/fa"
import { Bar, Line, Doughnut } from "react-chartjs-2"
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
  Filler
)

const UsersContainer = styled.div`
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

  .increase {
    color: #27ae60;
  }

  .decrease {
    color: #c0392b;
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

const userGrowthData = {
  labels: ["January", "February", "March", "April", "May", "June"],
  datasets: [
    {
      label: "New Users",
      data: [30, 45, 28, 80, 99, 120],
      backgroundColor: "#3498db",
      borderColor: "#3498db",
      fill: true,
    },
  ],
}

const userStatusData = {
  labels: ["Active", "Inactive", "Banned"],
  datasets: [
    {
      data: [300, 50, 20],
      backgroundColor: ["#2ecc71", "#e74c3c", "#95a5a6"],
    },
  ],
}

const userActivityData = {
  labels: [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ],
  datasets: [
    {
      label: "User Activity",
      data: [50, 40, 60, 70, 50, 30, 40],
      backgroundColor: "#e67e22",
      borderColor: "#e67e22",
      fill: true,
    },
  ],
}

const Users = () => {
  return (
    <UsersContainer>
      <Header>
        <h1>Users</h1>
        <SearchBar>
          <FaSearch />
          <input type="text" placeholder="Search users..." />
        </SearchBar>
      </Header>
      <Filters>
        <button>
          <FaFilter />
          Filter
        </button>
        <button>
          <FaUserPlus />
          Add User
        </button>
        <button>
          <FaUserTimes />
          Remove User
        </button>
      </Filters>
      <Stats>
        <StatBox>
          <h2>Total Users</h2>
          <p>370</p>
        </StatBox>
        <StatBox>
          <h2>Active Users</h2>
          <p className="increase">300</p>
        </StatBox>
        <StatBox>
          <h2>Inactive Users</h2>
          <p className="decrease">50</p>
        </StatBox>
        <StatBox>
          <h2>Banned Users</h2>
          <p className="decrease">20</p>
        </StatBox>
      </Stats>
      <Charts>
        <ChartBox>
          <h3>User Growth</h3>
          <Line data={userGrowthData} />
        </ChartBox>
        <ChartBox>
          <h3>User Status</h3>
          <Doughnut data={userStatusData} />
        </ChartBox>
      </Charts>
      <ChartBox>
        <h3>Weekly Activity</h3>
        <Bar data={userActivityData} />
      </ChartBox>
    </UsersContainer>
  )
}

export default Users
