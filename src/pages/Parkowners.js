import React, { useState } from "react"
import styled from "styled-components"
import {
  FaSearch,
  // FaFilter,
  FaPlusCircle,
  FaTrashAlt,
  FaSort,
  FaEdit,
  FaEye,
} from "react-icons/fa"
import { Modal, Button, Form, Input, Pagination, Tooltip } from "antd"
import { Bar } from "react-chartjs-2"

const ParkownersContainer = styled.div`
  background-color: #f8f9fa;
  color: #333;
  max-width: 1200px;
  margin: 0 auto;
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`

const Title = styled.h1`
  font-size: 28px;
  color: #405189;
  margin: 0;
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
    transition: background-color 0.3s;

    svg {
      margin-right: 10px;
    }

    &:hover {
      background-color: #2980b9;
    }
  }
`

const ParkownersList = styled.ul`
  list-style: none;
  padding: 0;
`

const ParkownerItem = styled.li`
  background: #fff;
  border: 1px solid #ddd;
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;

  h2 {
    margin: 0;
    font-size: 20px;
    color: #405189;
  }

  p {
    margin: 5px 0;
  }

  .actions {
    display: flex;
    align-items: center;

    button {
      background: none;
      border: none;
      cursor: pointer;
      margin-left: 10px;
      transition: color 0.3s;

      &:hover {
        color: #3498db;
      }
    }
  }
`

const parkownersData = [
  {
    id: 1,
    name: "Morshed Bhai",
    contact: "morshed.bhai@rocket.com",
    parksOwned: 3,
    revenue: 12000,
  },
  {
    id: 2,
    name: "Siyan Bhai",
    contact: "siyan.bhai@kite.com",
    parksOwned: 5,
    revenue: 20000,
  },
  {
    id: 3,
    name: "Jafor Bhai",
    contact: "jafor.brother@yahoo.com",
    parksOwned: 2,
    revenue: 8000,
  },
  {
    id: 4,
    name: "Habib Bhai",
    contact: "habib.bhai@tempist.com",
    parksOwned: 4,
    revenue: 15000,
  },
  {
    id: 5,
    name: "Gondho Paddey",
    contact: "bongkimchondro.gondho@pad.dey",
    parksOwned: 1,
    revenue: 5000,
  },
]

const Parkowners = () => {
  const [parkowners, setParkowners] = useState(parkownersData)
  const [searchTerm, setSearchTerm] = useState("")
  const [sorted, setSorted] = useState(false)
  const [page, setPage] = useState(1)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [selectedParkowner, setSelectedParkowner] = useState(null)
  const [isEditModalVisible, setIsEditModalVisible] = useState(false)
  const [newParkowner, setNewParkowner] = useState({
    name: "",
    contact: "",
    parksOwned: 0,
    revenue: 0,
  })
  const itemsPerPage = 3

  const toggleSort = () => {
    setSorted(!sorted)
  }

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
  }

  const showDetails = (owner) => {
    setSelectedParkowner(owner)
    setIsModalVisible(true)
  }

  const showEditModal = (owner) => {
    setSelectedParkowner(owner)
    setIsEditModalVisible(true)
  }

  const handleEditSubmit = (values) => {
    setParkowners(
      parkowners.map((owner) =>
        owner.id === selectedParkowner.id
          ? { ...selectedParkowner, ...values }
          : owner
      )
    )
    setIsEditModalVisible(false)
  }

  const handleAddSubmit = () => {
    setParkowners([
      ...parkowners,
      { ...newParkowner, id: parkowners.length + 1 },
    ])
    setIsModalVisible(false)
    setNewParkowner({ name: "", contact: "", parksOwned: 0, revenue: 0 })
  }

  const handleDelete = (id) => {
    setParkowners(parkowners.filter((owner) => owner.id !== id))
  }

  const filteredParkowners = parkowners
    .filter((owner) =>
      owner.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => (sorted ? b.parksOwned - a.parksOwned : a.id - b.id))

  const displayedParkowners = filteredParkowners.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  )

  // const nextPage = () => {
  //   if (page < Math.ceil(filteredParkowners.length / itemsPerPage)) {
  //     setPage(page + 1)
  //   }
  // }

  // const prevPage = () => {
  //   if (page > 1) {
  //     setPage(page - 1)
  //   }
  // }

  const revenueData = {
    labels: filteredParkowners.map((owner) => owner.name),
    datasets: [
      {
        label: "Revenue",
        data: filteredParkowners.map((owner) => owner.revenue),
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  }

  return (
    <ParkownersContainer>
      <Header>
        <Title>Parkowners</Title>
        <SearchBar>
          <FaSearch />
          <input
            type="text"
            placeholder="Search parkowners..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </SearchBar>
      </Header>
      <Filters>
        <button onClick={toggleSort}>
          <FaSort />
          {sorted ? "Sort by ID" : "Sort by Parks Owned"}
        </button>
        <button onClick={() => setIsModalVisible(true)}>
          <FaPlusCircle />
          Add Parkowner
        </button>
      </Filters>
      <ParkownersList>
        {displayedParkowners.map((owner) => (
          <ParkownerItem key={owner.id}>
            <div>
              <h2>{owner.name}</h2>
              <p>Contact: {owner.contact}</p>
              <p>Parks Owned: {owner.parksOwned}</p>
              <p>Revenue: ${owner.revenue.toLocaleString()}</p>
            </div>
            <div className="actions">
              <Tooltip title="View Details">
                <button onClick={() => showDetails(owner)}>
                  <FaEye />
                </button>
              </Tooltip>
              <Tooltip title="Edit Parkowner">
                <button onClick={() => showEditModal(owner)}>
                  <FaEdit />
                </button>
              </Tooltip>
              <Tooltip title="Delete Parkowner">
                <button onClick={() => handleDelete(owner.id)}>
                  <FaTrashAlt />
                </button>
              </Tooltip>
            </div>
          </ParkownerItem>
        ))}
      </ParkownersList>
      <Pagination
        current={page}
        total={filteredParkowners.length}
        pageSize={itemsPerPage}
        onChange={(page) => setPage(page)}
      />
      <Bar data={revenueData} options={{ responsive: true }} />
      <Modal
        title="Add Parkowner"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setIsModalVisible(false)}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleAddSubmit}>
            Submit
          </Button>,
        ]}
      >
        <Form layout="vertical">
          <Form.Item label="Name" name="name">
            <Input
              value={newParkowner.name}
              onChange={(e) =>
                setNewParkowner({ ...newParkowner, name: e.target.value })
              }
            />
          </Form.Item>
          <Form.Item label="Contact" name="contact">
            <Input
              value={newParkowner.contact}
              onChange={(e) =>
                setNewParkowner({ ...newParkowner, contact: e.target.value })
              }
            />
          </Form.Item>
          <Form.Item label="Parks Owned" name="parksOwned">
            <Input
              type="number"
              value={newParkowner.parksOwned}
              onChange={(e) =>
                setNewParkowner({
                  ...newParkowner,
                  parksOwned: parseInt(e.target.value),
                })
              }
            />
          </Form.Item>
          <Form.Item label="Revenue" name="revenue">
            <Input
              type="number"
              value={newParkowner.revenue}
              onChange={(e) =>
                setNewParkowner({
                  ...newParkowner,
                  revenue: parseFloat(e.target.value),
                })
              }
            />
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Edit Parkowner"
        visible={isEditModalVisible}
        onCancel={() => setIsEditModalVisible(false)}
        footer={null}
      >
        <Form
          layout="vertical"
          initialValues={selectedParkowner}
          onFinish={handleEditSubmit}
        >
          <Form.Item label="Name" name="name">
            <Input />
          </Form.Item>
          <Form.Item label="Contact" name="contact">
            <Input />
          </Form.Item>
          <Form.Item label="Parks Owned" name="parksOwned">
            <Input type="number" />
          </Form.Item>
          <Form.Item label="Revenue" name="revenue">
            <Input type="number" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </ParkownersContainer>
  )
}

export default Parkowners
