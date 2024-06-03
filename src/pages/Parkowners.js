import React, { useState, useEffect } from "react";
import {
  FaSearch,
  FaPlusCircle,
  FaTrashAlt,
  FaSort,
  FaEdit,
  FaEye,
} from "react-icons/fa";
import Modal from "react-modal";
import { Button, Form, Input, Pagination, Tooltip } from "antd";
import { Bar } from "react-chartjs-2";
import {
  Filters,
  Header,
  ParkownerItem,
  ParkownersContainer,
  ParkownersList,
  SearchBar,
  Title,
} from "./ParkOwners.styled";

Modal.setAppElement('#root'); // to remove accessibility-related warnings

const Parkowners = () => {
  const [parkowners, setParkowners] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sorted, setSorted] = useState(false);
  const [page, setPage] = useState(1);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isDetailsModalVisible, setIsDetailsModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [selectedParkowner, setSelectedParkowner] = useState(null);
  const [newParkowner, setNewParkowner] = useState({
    name: "",
    contact: "",
    parksOwned: 0,
    revenue: 0,
  });
  const itemsPerPage = 3;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://parkspotter-backened.onrender.com/accounts/admin_dashboard/",
          {
            headers: {
              Authorization: `Token ${localStorage.getItem("token")}`,
            },
          }
        );
        const data = await response.json();
        setParkowners(data.park_owners_with_subscription);
      } catch (error) {
        console.error("Error fetching parkowners:", error);
      }
    };

    fetchData();
  }, []);

  const toggleSort = () => {
    setSorted(!sorted);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const showDetails = (owner) => {
    setSelectedParkowner(owner);
    setIsDetailsModalVisible(true);
  };

  const showEditModal = (owner) => {
    setSelectedParkowner(owner);
    setIsEditModalVisible(true);
  };

  const handleEditSubmit = (values) => {
    setParkowners(
      parkowners.map((owner) =>
        owner.park_owner_id === selectedParkowner.park_owner_id
          ? { ...selectedParkowner, ...values }
          : owner
      )
    );
    setIsEditModalVisible(false);
  };

  const handleAddSubmit = () => {
    setParkowners([
      ...parkowners,
      { ...newParkowner, park_owner_id: parkowners.length + 1 },
    ]);
    setIsAddModalVisible(false);
    setNewParkowner({ name: "", contact: "", parksOwned: 0, revenue: 0 });
  };

  const handleDelete = (id) => {
    setParkowners(parkowners.filter((owner) => owner.park_owner_id !== id));
  };

  const filteredParkowners = parkowners
    ? parkowners
        .filter((owner) =>
          owner.username.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .sort((a, b) =>
          sorted ? b.total_earnings - a.total_earnings : a.park_owner_id - b.park_owner_id
        )
    : [];

  const displayedParkowners = filteredParkowners.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const revenueData = {
    labels: filteredParkowners.map((owner) => owner.username),
    datasets: [
      {
        label: "Revenue",
        data: filteredParkowners.map((owner) => owner.total_earnings),
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

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
          {sorted ? "Sort by ID" : "Sort by Revenue"}
        </button>
        <button onClick={() => setIsAddModalVisible(true)}>
          <FaPlusCircle />
          Add Parkowner
        </button>
      </Filters>
      <ParkownersList>
        {displayedParkowners.map((owner) => (
          <ParkownerItem key={owner.park_owner_id}>
            <div>
              <h2>{owner.username}</h2>
              <p>Total Earnings: ${owner.total_earnings.toFixed(2)}</p>
              <p>Net Revenue: ${owner.park_owner_net_revenue.toFixed(2)}</p>
              <p>Subscription: {owner.subscription.package}</p>
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
                <button onClick={() => handleDelete(owner.park_owner_id)}>
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
        isOpen={isAddModalVisible}
        onRequestClose={() => setIsAddModalVisible(false)}
        contentLabel="Add Parkowner"
      >
        <h2>Add Parkowner</h2>
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
          <Button type="primary" onClick={handleAddSubmit}>
            Submit
          </Button>
          <Button onClick={() => setIsAddModalVisible(false)}>Cancel</Button>
        </Form>
      </Modal>
      <Modal
        isOpen={isEditModalVisible}
        onRequestClose={() => setIsEditModalVisible(false)}
        contentLabel="Edit Parkowner"
      >
        <h2>Edit Parkowner</h2>
        {selectedParkowner && (
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
            <Button type="primary" htmlType="submit">
              Save
            </Button>
            <Button onClick={() => setIsEditModalVisible(false)}>Cancel</Button>
          </Form>
        )}
      </Modal>
      <Modal
        isOpen={isDetailsModalVisible}
        onRequestClose={() => setIsDetailsModalVisible(false)}
        contentLabel="Parkowner Details"
      >
        <h2>Parkowner Details</h2>
        {selectedParkowner && (
          <div>
            <p>Username: {selectedParkowner.username}</p>
            <p>Total Earnings: ${selectedParkowner.total_earnings.toFixed(2)}</p>
            <p>Total Salary Cost: ${selectedParkowner.total_salary_cost.toFixed(2)}</p>
            <p>Net Revenue: ${selectedParkowner.park_owner_net_revenue.toFixed(2)}</p>
            <p>
              Subscription Package: {selectedParkowner.subscription.package}
            </p>
          </div>
        )}
        <Button onClick={() => setIsDetailsModalVisible(false)}>Close</Button>
      </Modal>
    </ParkownersContainer>
  );
};

export default Parkowners;
// original