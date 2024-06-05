import React, { useState, useEffect } from "react";
import {
  FaSearch,
  FaPlusCircle,
  FaSort,
  FaEdit,
  FaEye,
  FaCheck,
  FaTimes,
} from "react-icons/fa";
import Modal from "react-modal";
import { Button, Form, Input, Pagination, Tooltip, Select, DatePicker } from "antd";
import moment from "moment";
import { Bar } from "react-chartjs-2";
import {
  Filters,
  Header,
  ParkownerItem,
  ParkownersContainer,
  ParkownersList,
  SearchBar,
  Title,
  StyledModal,
} from "./ParkOwners.styled";

Modal.setAppElement("#root"); // to remove accessibility-related warnings

const { Option } = Select;

const Parkowners = () => {
  const [parkowners, setParkowners] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sorted, setSorted] = useState(false);
  const [page, setPage] = useState(1);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isDetailsModalVisible, setIsDetailsModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isActivationModalVisible, setIsActivationModalVisible] = useState(false);
  const [selectedParkowner, setSelectedParkowner] = useState(null);
  const [newParkowner, setNewParkowner] = useState({
    zones: "",
    is_active: true,
    username: "",
    email: "",
    phone: "",
    password: "",
    subscription: "",
    subscriptionEndDate: null,
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

  const showActivationModal = (owner) => {
    setSelectedParkowner(owner);
    setIsActivationModalVisible(true);
  };

  const handleEditSubmit = (values) => {
    setIsEditModalVisible(false);
  };

  const handleAddSubmit = () => {
    setIsAddModalVisible(false);
    setNewParkowner({
      zones: "",
      is_active: true,
      username: "",
      email: "",
      phone: "",
      password: "",
      subscription: "",
      subscriptionEndDate: null,
    });
  };

  const handleActivate = async () => {
    console.log("Activating park owner:", selectedParkowner);
    try {
      await fetch(
        `https://parkspotter-backened.onrender.com/accounts/user_activation/${selectedParkowner.park_owner_id}/activate/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            user_type: "park_owner",
          }),
        }
      );
      const updatedParkowners = parkowners.map(owner => {
        if (owner.park_owner_id === selectedParkowner.park_owner_id) {
          return { ...owner, is_active: true };
        } else {
          return owner;
        }
      });
      setParkowners(updatedParkowners);

    } catch (error) {
      console.error("Error activating parkowner:", error);
    }
    setIsActivationModalVisible(false);
  };

  const handleDeactivate = async () => {
    try {
      await fetch(
        `https://parkspotter-backened.onrender.com/accounts/user_activation/${selectedParkowner.park_owner_id}/deactivate/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            user_type: "park_owner",
          }),
        }
      );
      const updatedParkowners = parkowners.map(owner => {
        if (owner.park_owner_id === selectedParkowner.park_owner_id) {
          return { ...owner, is_active: false };
        } else {
          return owner;
        }
      });
      setParkowners(updatedParkowners);
    } catch (error) {
      console.error("Error deactivating parkowner:", error);
    }
    setIsActivationModalVisible(false);
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
              <Tooltip title={owner.is_active ? "Deactivate Parkowner" : "Activate Parkowner"}>
                <button onClick={() => showActivationModal(owner)}>
                  {owner.is_active ? <FaCheck style={{ color: "green" }} /> : <FaTimes style={{ color: "red" }} />}
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
      <StyledModal
        isOpen={isAddModalVisible}
        onRequestClose={() => setIsAddModalVisible(false)}
        contentLabel="Add Parkowner"
      >
        <h2>Add Parkowner</h2>
        <Form layout="vertical">
          <Form.Item label="Zones" name="zones">
            <Input
              value={newParkowner.zones}
              onChange={(e) =>
                setNewParkowner({ ...newParkowner, zones: e.target.value })
              }
            />
          </Form.Item>
          <Form.Item label="Active/Deactive" name="is_active">
            <Select
              value={newParkowner.is_active}
              onChange={(value) =>
                setNewParkowner({ ...newParkowner, is_active: value })
              }
            >
              <Option value={true}>Active</Option>
              <Option value={false}>Deactive</Option>
            </Select>
          </Form.Item>
          <Form.Item label="Username" name="username">
            <Input
              value={newParkowner.username}
              onChange={(e) =>
                setNewParkowner({ ...newParkowner, username: e.target.value })
              }
            />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input
              type="email"
              value={newParkowner.email}
              onChange={(e) =>
                setNewParkowner({ ...newParkowner, email: e.target.value })
              }
            />
          </Form.Item>
          <Form.Item label="Phone" name="phone">
            <Input
              value={newParkowner.phone}
              onChange={(e) =>
                setNewParkowner({ ...newParkowner, phone: e.target.value })
              }
            />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input
              type="password"
              value={newParkowner.password}
              onChange={(e) =>
                setNewParkowner({ ...newParkowner, password: e.target.value })
              }
            />
          </Form.Item>
          <Form.Item label="Subscription" name="subscription">
            <Input
              value={newParkowner.subscription}
              onChange={(e) =>
                setNewParkowner({ ...newParkowner, subscription: e.target.value })
              }
            />
          </Form.Item>
          <Form.Item label="Subscription End Date" name="subscriptionEndDate">
            <DatePicker
              value={
                newParkowner.subscriptionEndDate
                  ? moment(newParkowner.subscriptionEndDate)
                  : null
              }
              onChange={(date) =>
                setNewParkowner({
                  ...newParkowner,
                  subscriptionEndDate: date ? date.toISOString() : null,
                })
              }
            />
          </Form.Item>
        </Form>
        <Button type="primary" onClick={handleAddSubmit}>
          Add
        </Button>
      </StyledModal>
      <StyledModal
        isOpen={isDetailsModalVisible}
        onRequestClose={() => setIsDetailsModalVisible(false)}
        contentLabel="Parkowner Details"
      >
        <h2>Parkowner Details</h2>
        {selectedParkowner && (
          <div>
            <p>Username: {selectedParkowner.username}</p>
            <p>Email: {selectedParkowner.email}</p>
            <p>Phone: {selectedParkowner.phone}</p>
            <p>Zones: {selectedParkowner.zones}</p>
            <p>Subscription: {selectedParkowner.subscription.package}</p>
            <p>
              Subscription End Date:{" "}
              {selectedParkowner.subscriptionEndDate
                ? moment(selectedParkowner.subscriptionEndDate).format(
                  "MMMM Do YYYY"
                )
                : "N/A"}
            </p>
            <p>
              Status:{" "}
              {selectedParkowner.is_active ? (
                <FaCheck style={{ color: "green" }} />
              ) : (
                <FaTimes style={{ color: "red" }} />
              )}
            </p>
          </div>
        )}
      </StyledModal>
      <StyledModal
        isOpen={isEditModalVisible}
        onRequestClose={() => setIsEditModalVisible(false)}
        contentLabel="Edit Parkowner"
      >
        <h2>Edit Parkowner</h2>
        {selectedParkowner && (
          <Form layout="vertical" initialValues={selectedParkowner} onFinish={handleEditSubmit}>
            <Form.Item label="Username" name="username">
              <Input />
            </Form.Item>
            <Form.Item label="Email" name="email">
              <Input type="email" />
            </Form.Item>
            <Form.Item label="Phone" name="phone">
              <Input />
            </Form.Item>
            <Form.Item label="Zones" name="zones">
              <Input />
            </Form.Item>
            <Form.Item label="Subscription" name="subscription">
              <Input />
            </Form.Item>
            <Form.Item label="Subscription End Date" name="subscriptionEndDate">
              <DatePicker />
            </Form.Item>
            <Button type="primary" htmlType="submit">
              Save Changes
            </Button>
          </Form>
        )}
      </StyledModal>
      <StyledModal
        isOpen={isActivationModalVisible}
        onRequestClose={() => setIsActivationModalVisible(false)}
        contentLabel="Activate/Deactivate Parkowner"
      >
        <h2>{selectedParkowner?.is_active ? "Deactivate" : "Activate"} Parkowner</h2>
        <p>
          Are you sure you want to {selectedParkowner?.is_active ? "deactivate" : "activate"} this parkowner?
        </p>
        <Button
          type="primary"
          onClick={selectedParkowner?.is_active ? handleDeactivate : handleActivate}
        >
          {selectedParkowner?.is_active ? "Deactivate" : "Activate"}
        </Button>
        <Button onClick={() => setIsActivationModalVisible(false)}>Cancel</Button>
      </StyledModal>
    </ParkownersContainer>
  );
};

export default Parkowners;
