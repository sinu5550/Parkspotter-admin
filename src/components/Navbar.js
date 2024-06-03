import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  FaSearch,
  FaBell,
  FaUserCircle,
  FaRegFlag,
  FaSignOutAlt,
  FaCog,
} from "react-icons/fa";
import {
  Dropdown,
  Menu,
  Input,
  Modal,
  Button,
  List,
  Tabs,
  Form,
  Switch,
} from "antd";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const { TabPane } = Tabs;

const NavbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 1;
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  background-color: #f1f3f4;
  padding: 5px 10px;
  border-radius: 5px;
  width: 300px;

  input {
    border: none;
    background: none;
    margin-left: 10px;
    outline: none;
    width: 100%;
  }
`;

const SuggestionsList = styled.div`
  background: white;
  border: 1px solid #ddd;
  position: absolute;
  top: 45px;
  width: 300px;
  z-index: 2;
  max-height: 200px;
  overflow-y: auto;

  div {
    padding: 10px;
    cursor: pointer;
    &:hover {
      background: #eee;
    }
  }
`;

const NavIcons = styled.div`
  display: flex;
  align-items: center;

  > * {
    margin-left: 20px;
    cursor: pointer;
    position: relative;
  }

  svg {
    transition: color 0.3s;
  }

  svg:hover {
    color: #3498db;
  }
`;

const Profile = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;

  img {
    border-radius: 50%;
    width: 40px;
    height: 40px;
    margin-right: 10px;
  }

  div {
    display: flex;
    flex-direction: column;

    span {
      font-size: 14px;
    }

    small {
      font-size: 12px;
      color: grey;
    }
  }
`;

const ProfileMenu = styled(Menu)`
  .ant-dropdown-menu-item {
    display: flex;
    align-items: center;
    svg {
      margin-right: 10px;
    }
  }
`;

const notifications = [
  "New user registered",
  "Server rebooted",
  "System update available",
];

const reports = [
  "Monthly sales report",
  "User activity report",
  "System performance report",
];

const settingsData = [
  { label: "Enable notifications", value: true },
  { label: "Dark mode", value: false },
];

const searchOptions = [
  { label: "Overview", path: "/dashboard" },
  { label: "Analytics", path: "/dashboard/analytics" },
  { label: "Parking Zones", path: "/dashboard/parking-zones" },
  { label: "View Subscriptions", path: "/dashboard/subscriptions" },
  { label: "Bookings", path: "/dashboard/bookings" },
  { label: "Parkowners", path: "/dashboard/parkowners" },
  { label: "Users", path: "/dashboard/users" },
  { label: "Zones", path: "/dashboard/zones" },
  // Add more options as needed
];

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isProfileModalVisible, setIsProfileModalVisible] = useState(false);
  const [isReportsModalVisible, setIsReportsModalVisible] = useState(false);
  const [isNotificationsModalVisible, setIsNotificationsModalVisible] =
    useState(false);
  const [isSettingsModalVisible, setIsSettingsModalVisible] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      const role = localStorage.getItem("role");
      setRole(role);

      try {
        const response = await fetch(
          "https://parkspotter-backened.onrender.com/accounts/admin_dashboard/",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();

        if (data.park_owners_with_subscription.length > 0) {
          setUsername(data.park_owners_with_subscription[0].username);
        } else {
          setUsername("Admin");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setUsername("Admin");
      }
    };

    fetchUserData();
  }, []);

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    if (term) {
      const filteredSuggestions = searchOptions.filter((option) =>
        option.label.toLowerCase().includes(term.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (path) => {
    navigate(path);
    setSearchTerm("");
    setSuggestions([]);
  };

  const handleLogout = () => {
    const token = localStorage.getItem("token");
    fetch("https://parkspotter-backened.onrender.com/accounts/logout/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    })
      .then((res) => {
        res.json();
      })
      .then((data) => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("user_id");
        window.location.reload();
        toast.success("Log out successful");
      })
      .catch((error) => {
        // console.error("Error logging out:", error);
      });
  };

  const profileMenu = (
    <ProfileMenu>
      <Menu.Item
        key="1"
        icon={<FaUserCircle />}
        onClick={() => setIsProfileModalVisible(true)}
      >
        Profile
      </Menu.Item>
      <Menu.Item
        key="2"
        icon={<FaRegFlag />}
        onClick={() => setIsReportsModalVisible(true)}
      >
        Reports
      </Menu.Item>
      <Menu.Item
        key="3"
        icon={<FaBell />}
        onClick={() => setIsNotificationsModalVisible(true)}
      >
        Notifications
      </Menu.Item>
      <Menu.Item
        key="4"
        icon={<FaCog />}
        onClick={() => setIsSettingsModalVisible(true)}
      >
        Settings
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="5" icon={<FaSignOutAlt />} onClick={handleLogout}>
        Logout
      </Menu.Item>
    </ProfileMenu>
  );

  return (
    <NavbarContainer>
      <SearchBar>
        <FaSearch />
        <Input
          placeholder="Search for Menus & Sub-Menus..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        {suggestions.length > 0 && (
          <SuggestionsList>
            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                onClick={() => handleSuggestionClick(suggestion.path)}
              >
                {suggestion.label}
              </div>
            ))}
          </SuggestionsList>
        )}
      </SearchBar>
      <NavIcons>
        <FaRegFlag
          title="Reports"
          onClick={() => setIsReportsModalVisible(true)}
        />
        <FaBell
          title="Notifications"
          onClick={() => setIsNotificationsModalVisible(true)}
        />
        <Dropdown overlay={profileMenu} trigger={["click"]}>
          <Profile>
            <img
              src="https://icon-library.com/images/generic-user-icon/generic-user-icon-9.jpg"
              alt="Profile"
            />
            <div>
              <span>{username}</span>
              <small>{role}</small>
            </div>
          </Profile>
        </Dropdown>
      </NavIcons>

      <Modal
        title="User Profile"
        visible={isProfileModalVisible}
        onCancel={() => setIsProfileModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setIsProfileModalVisible(false)}>
            Close
          </Button>,
        ]}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img
            src="https://via.placeholder.com/100"
            alt="Profile"
            style={{ borderRadius: "50%", marginBottom: "20px" }}
          />
          <h2>{username}</h2>
          <p>
            <strong>Role:</strong> {role}
          </p>
          <p>
            <strong>Email:</strong> admin@example.com
          </p>
          <p>
            <strong>Joined:</strong> January 1, 2020
          </p>
        </div>
      </Modal>

      <Modal
        title="Reports"
        visible={isReportsModalVisible}
        onCancel={() => setIsReportsModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setIsReportsModalVisible(false)}>
            Close
          </Button>,
        ]}
      >
        <List
          dataSource={reports}
          renderItem={(report) => (
            <List.Item>
              <List.Item.Meta title={report} />
            </List.Item>
          )}
        />
      </Modal>

      <Modal
        title="Notifications"
        visible={isNotificationsModalVisible}
        onCancel={() => setIsNotificationsModalVisible(false)}
        footer={[
          <Button
            key="close"
            onClick={() => setIsNotificationsModalVisible(false)}
          >
            Close
          </Button>,
        ]}
      >
        <List
          dataSource={notifications}
          renderItem={(notification) => (
            <List.Item>
              <List.Item.Meta title={notification} />
            </List.Item>
          )}
        />
      </Modal>

      <Modal
        title="Settings"
        visible={isSettingsModalVisible}
        onCancel={() => setIsSettingsModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setIsSettingsModalVisible(false)}>
            Close
          </Button>,
        ]}
      >
        <Tabs defaultActiveKey="1">
          <TabPane tab="General" key="1">
            <Form layout="vertical">
              {settingsData.map((setting, index) => (
                <Form.Item key={index} label={setting.label}>
                  <Switch defaultChecked={setting.value} />
                </Form.Item>
              ))}
            </Form>
          </TabPane>
          <TabPane tab="Security" key="2">
            {/* Add security settings form items here */}
          </TabPane>
          <TabPane tab="Notifications" key="3">
            {/* Add notifications settings form items here */}
          </TabPane>
        </Tabs>
      </Modal>
    </NavbarContainer>
  );
};

export default Navbar;
