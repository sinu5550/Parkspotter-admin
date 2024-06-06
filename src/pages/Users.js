import React, { useEffect, useState } from "react"
import { FaSearch, FaUserTimes } from "react-icons/fa"
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
import {
  ChartBox,
  Charts,
  Header,
  SearchBar,
  StatBox,
  Stats,
  UsersContainer,
  UserTable,
  Pagination,
  PaginationButton,
} from "./Users.styled"

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

const Users = () => {
  const [users, setUsers] = useState([])
  const [search, setSearch] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const usersPerPage = 5

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          "https://parkspotter-backened.onrender.com/customer/customer-list/"
        )
        const data = await response.json()
        setUsers(data)
      } catch (error) {
        console.error("Error fetching users:", error)
      }
    }

    fetchUsers()
  }, [])

  const handleSearchChange = (event) => {
    setSearch(event.target.value)
  }

  const filteredUsers = users.filter((user) =>
    user.customer_id.username.toLowerCase().includes(search.toLowerCase())
  )

  const handleRemoveUser = (userId) => {
    setUsers(users.filter((user) => user.id !== userId))
  }

  const indexOfLastUser = currentPage * usersPerPage
  const indexOfFirstUser = indexOfLastUser - usersPerPage
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser)

  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  const totalUsers = users.length
  const activeUsers = users.filter((user) => user.points > 0).length
  const inactiveUsers = totalUsers - activeUsers
  const bannedUsers = users.filter((user) => user.customer_id.is_active === 0).length

  const userGrowthData = {
    labels: [],
    datasets: [
      {
        label: "New Users",
        data: [],
        backgroundColor: "#3498db",
        borderColor: "#3498db",
        fill: true,
      },
    ],
  }

  const monthMap = {
    0: "January",
    1: "February",
    2: "March",
    3: "April",
    4: "May",
    5: "June",
    6: "July",
    7: "August",
    8: "September",
    9: "October",
    10: "November",
    11: "December",
  }

  const userCountByMonth = new Array(12).fill(0)

  users.forEach((user) => {
    const joinedDate = new Date(user.joined_date)
    const month = joinedDate.getMonth()
    userCountByMonth[month] += 1
  })

  userGrowthData.labels = Object.values(monthMap)
  userGrowthData.datasets[0].data = userCountByMonth

  const userStatusData = {
    labels: ["Active", "Inactive", "Banned"],
    datasets: [
      {
        data: [activeUsers, inactiveUsers, bannedUsers],
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
        data: new Array(7).fill(0),
        backgroundColor: "#e67e22",
        borderColor: "#e67e22",
        fill: true,
        pointRadius: 5,
        pointHoverRadius: 8,
      },
    ],
  }

  users.forEach((user) => {
    const joinedDate = new Date(user.joined_date)
    const dayOfWeek = joinedDate.getDay()
    userActivityData.datasets[0].data[dayOfWeek] += user.points
  })

  return (
    <UsersContainer>
      <Stats>
        <StatBox>
          <h2>Total Users</h2>
          <p>{totalUsers}</p>
        </StatBox>
        <StatBox>
          <h2>Active Users</h2>
          <p className="increase">{activeUsers}</p>
        </StatBox>
        <StatBox>
          <h2>Inactive Users</h2>
          <p className="decrease">{inactiveUsers}</p>
        </StatBox>
        <StatBox>
          <h2>Banned Users</h2>
          <p className="decrease">{bannedUsers}</p>
        </StatBox>
      </Stats>
      <Header>
        <SearchBar>
          <FaSearch />
          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={handleSearchChange}
          />
        </SearchBar>
      </Header>
      <UserTable>
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Mobile</th>
            <th>Vehicle Brand</th>
            <th>Plate Number</th>
            <th>Joined Date</th>
            <th>Points</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.customer_id.username}</td>
              <td>{user.customer_id.email}</td>
              <td>{user.customer_id.first_name}</td>
              <td>{user.customer_id.last_name}</td>
              <td>{user.mobile_no}</td>
              <td>{user.vehicle_brand}</td>
              <td>{user.plate_number}</td>
              <td>{new Date(user.joined_date).toLocaleDateString()}</td>
              <td>{user.points}</td>
              <td>
                <button className="userActivateDeactivateToggle" onClick={() => handleRemoveUser(user.id)}>
                  <FaUserTimes />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </UserTable>
      <Pagination>
        {Array.from({
          length: Math.ceil(filteredUsers.length / usersPerPage),
        }).map((_, index) => (
          <PaginationButton key={index} onClick={() => paginate(index + 1)}>
            {index + 1}
          </PaginationButton>
        ))}
      </Pagination>
      <Charts>
        <ChartBox type="1st">
          <h3>User Growth</h3>
          <Line data={userGrowthData} />
        </ChartBox>
        <ChartBox type="2nd">
          <h3>User Status</h3>
          <Doughnut data={userStatusData} />
        </ChartBox>
      </Charts>
      <ChartBox type="3rd">
        <h3>Weekly Activity</h3>
        <Bar data={userActivityData} />
      </ChartBox>
    </UsersContainer>
  )
}

export default Users
