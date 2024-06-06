import React, { useEffect, useState } from "react"
import {
  Table,
  Input,
  Button,
  Space,
  Statistic,
  Row,
  Col,
  Pagination,
  Modal,
  Card,
} from "antd"
import { SearchOutlined, CheckOutlined, CloseOutlined } from "@ant-design/icons"
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
import styled from "styled-components"

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
  padding: 20px;
`

const Charts = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`

const ChartBox = styled.div`
  flex: 1;
  min-width: 300px;
`

const StatisticCard = styled(Card)`
  .ant-card-body {
    padding: 12px;
  }
`

const Users = () => {
  const [users, setUsers] = useState([])
  const [search, setSearch] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedUser, setSelectedUser] = useState(null)
  const [isModalVisible, setIsModalVisible] = useState(false)
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

  const handleToggleUserStatus = async (userId, isActive) => {
    const token = localStorage.getItem("token")
    const url = `https://parkspotter-backened.onrender.com/accounts/user_activation/${userId}/${
      isActive ? "deactivate" : "activate"
    }/`

    try {
      await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify({ user_type: "customer" }),
      })

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId
            ? {
                ...user,
                customer_id: {
                  ...user.customer_id,
                  is_active: isActive ? 0 : 1,
                },
              }
            : user
        )
      )
    } catch (error) {
      console.error("Error toggling user status:", error)
    }
  }

  const showModal = (user) => {
    setSelectedUser(user)
    setIsModalVisible(true)
  }

  const handleOk = () => {
    setIsModalVisible(false)
    setSelectedUser(null)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
    setSelectedUser(null)
  }

  const indexOfLastUser = currentPage * usersPerPage
  const indexOfFirstUser = indexOfLastUser - usersPerPage
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser)

  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  const totalUsers = users.length
  const activeUsers = users.filter((user) => user.points > 0).length
  const inactiveUsers = totalUsers - activeUsers
  const bannedUsers = users.filter(
    (user) => user.customer_id.is_active === 0
  ).length

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

  const columns = [
    {
      title: "Username",
      dataIndex: ["customer_id", "username"],
      key: "username",
      render: (text, record) => (
        <Button type="link" onClick={() => showModal(record)}>
          {text}
        </Button>
      ),
    },
    {
      title: "Email",
      dataIndex: ["customer_id", "email"],
      key: "email",
    },
    {
      title: "First Name",
      dataIndex: ["customer_id", "first_name"],
      key: "first_name",
    },
    {
      title: "Last Name",
      dataIndex: ["customer_id", "last_name"],
      key: "last_name",
    },
    {
      title: "Mobile",
      dataIndex: "mobile_no",
      key: "mobile_no",
    },

    {
      title: "Joined Date",
      dataIndex: "joined_date",
      key: "joined_date",
      render: (text) => new Date(text).toLocaleDateString(),
    },
    {
      title: "Points",
      dataIndex: "points",
      key: "points",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Button
          type={record.customer_id.is_active ? "primary" : "danger"}
          icon={
            record.customer_id.is_active ? <CloseOutlined /> : <CheckOutlined />
          }
          onClick={() =>
            handleToggleUserStatus(record.id, record.customer_id.is_active)
          }
        >
          {record.customer_id.is_active ? "Deactivate" : "Activate"}
        </Button>
      ),
    },
  ]

  return (
    <UsersContainer>
      <Row gutter={16}>
        <Col span={6}>
          <StatisticCard>
            <Statistic title="Total Users" value={totalUsers} />
          </StatisticCard>
        </Col>
        <Col span={6}>
          <StatisticCard>
            <Statistic
              title="Active Users"
              value={activeUsers}
              valueStyle={{ color: "#3f8600" }}
            />
          </StatisticCard>
        </Col>
        <Col span={6}>
          <StatisticCard>
            <Statistic
              title="Inactive Users"
              value={inactiveUsers}
              valueStyle={{ color: "#cf1322" }}
            />
          </StatisticCard>
        </Col>
        <Col span={6}>
          <StatisticCard>
            <Statistic
              title="Banned Users"
              value={bannedUsers}
              valueStyle={{ color: "#cf1322" }}
            />
          </StatisticCard>
        </Col>
      </Row>
      <Space style={{ margin: "20px 0" }}>
        <Input
          placeholder="Search users..."
          prefix={<SearchOutlined />}
          value={search}
          onChange={handleSearchChange}
        />
      </Space>
      <Table
        columns={columns}
        dataSource={currentUsers}
        pagination={false}
        rowKey="id"
      />
      <Pagination
        current={currentPage}
        pageSize={usersPerPage}
        total={filteredUsers.length}
        onChange={paginate}
        style={{ marginTop: "20px", textAlign: "right" }}
      />
      <Charts>
        <ChartBox>
          <h3>User Growth</h3>
          <Line data={userGrowthData} />
        </ChartBox>
        <ChartBox>
          <h3>User Status</h3>
          <Doughnut data={userStatusData} />
        </ChartBox>
        <ChartBox>
          <h3>Weekly Activity</h3>
          <Bar data={userActivityData} />
        </ChartBox>
      </Charts>
      {selectedUser && (
        <Modal
          title="User Details"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <p>
            <strong>Username:</strong> {selectedUser.customer_id.username}
          </p>
          <p>
            <strong>Email:</strong> {selectedUser.customer_id.email}
          </p>
          <p>
            <strong>First Name:</strong> {selectedUser.customer_id.first_name}
          </p>
          <p>
            <strong>Last Name:</strong> {selectedUser.customer_id.last_name}
          </p>
          <p>
            <strong>Mobile:</strong> {selectedUser.mobile_no}
          </p>
          <p>
            <strong>Vehicle Brand:</strong> {selectedUser.vehicle_brand}
          </p>
          <p>
            <strong>Plate Number:</strong> {selectedUser.plate_number}
          </p>
          <p>
            <strong>Joined Date:</strong>{" "}
            {new Date(selectedUser.joined_date).toLocaleDateString()}
          </p>
          <p>
            <strong>Points:</strong> {selectedUser.points}
          </p>
          <p>
            <strong>Status:</strong>{" "}
            {selectedUser.customer_id.is_active ? "Active" : "Inactive"}
          </p>
        </Modal>
      )}
    </UsersContainer>
  )
}

export default Users
