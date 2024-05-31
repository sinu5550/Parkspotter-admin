import React, { useState } from 'react';
import styled from 'styled-components';
import { FaSearch, FaBell, FaUserCircle, FaRegFlag, FaSignOutAlt, FaCog } from 'react-icons/fa';
import { Dropdown, Menu, Input, Modal, Button, List, Tabs, Form, Switch } from 'antd';

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
  'New user registered',
  'Server rebooted',
  'System update available',
];

const reports = [
  'Monthly sales report',
  'User activity report',
  'System performance report',
];

const settingsData = [
  { label: 'Enable notifications', value: true },
  { label: 'Dark mode', value: false },
];

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [notifVisible, setNotifVisible] = useState(false);
  const [isProfileModalVisible, setIsProfileModalVisible] = useState(false);
  const [isReportsModalVisible, setIsReportsModalVisible] = useState(false);
  const [isNotificationsModalVisible, setIsNotificationsModalVisible] = useState(false);
  const [isSettingsModalVisible, setIsSettingsModalVisible] = useState(false);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const profileMenu = (
    <ProfileMenu>
      <Menu.Item key="1" icon={<FaUserCircle />} onClick={() => setIsProfileModalVisible(true)}>
        Profile
      </Menu.Item>
      <Menu.Item key="2" icon={<FaRegFlag />} onClick={() => setIsReportsModalVisible(true)}>
        Reports
      </Menu.Item>
      <Menu.Item key="3" icon={<FaBell />} onClick={() => setIsNotificationsModalVisible(true)}>
        Notifications
      </Menu.Item>
      <Menu.Item key="4" icon={<FaCog />} onClick={() => setIsSettingsModalVisible(true)}>
        Settings
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="5" icon={<FaSignOutAlt />}>
        Logout
      </Menu.Item>
    </ProfileMenu>
  );

  return (
    <NavbarContainer>
      <SearchBar>
        <FaSearch />
        <Input
          placeholder="Search parkowners or users..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </SearchBar>
      <NavIcons>
        <FaRegFlag title="Reports" onClick={() => setIsReportsModalVisible(true)} />
        <FaBell title="Notifications" onClick={() => setIsNotificationsModalVisible(true)} />
        <Dropdown overlay={profileMenu} trigger={['click']}>
          <Profile>
            <img src="https://icon-library.com/images/generic-user-icon/generic-user-icon-9.jpg" alt="Profile" />
            <div>
              <span>Admin Name</span>
              <small>Admin Role</small>
            </div>
          </Profile>
        </Dropdown>
      </NavIcons>

      
      <Modal
        title="User Profile"
        visible={isProfileModalVisible}
        onCancel={() => setIsProfileModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setIsProfileModalVisible(false)}>Close</Button>,
        ]}
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <img src="https://via.placeholder.com/100" alt="Profile" style={{ borderRadius: '50%', marginBottom: '20px' }} />
          <h2>Admin Name</h2>
          <p><strong>Role:</strong> Admin Role</p>
          <p><strong>Email:</strong> admin@example.com</p>
          <p><strong>Joined:</strong> January 1, 2020</p>
        </div>
      </Modal>

      
      <Modal
        title="Reports"
        visible={isReportsModalVisible}
        onCancel={() => setIsReportsModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setIsReportsModalVisible(false)}>Close</Button>,
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
          <Button key="close" onClick={() => setIsNotificationsModalVisible(false)}>Close</Button>,
        ]}
      >
        <List
          dataSource={notifications}
          renderItem={(notif) => (
            <List.Item>
              <List.Item.Meta title={notif} />
            </List.Item>
          )}
        />
      </Modal>

      <Modal
        title="Settings"
        visible={isSettingsModalVisible}
        onCancel={() => setIsSettingsModalVisible(false)}
        footer={[
          <Button key="save" type="primary" onClick={() => setIsSettingsModalVisible(false)}>Save</Button>,
          <Button key="cancel" onClick={() => setIsSettingsModalVisible(false)}>Cancel</Button>,
        ]}
      >
        <Tabs defaultActiveKey="1">
          <TabPane tab="General" key="1">
            <Form>
              {settingsData.map((setting, index) => (
                <Form.Item key={index} label={setting.label}>
                  <Switch defaultChecked={setting.value} />
                </Form.Item>
              ))}
            </Form>
          </TabPane>
          <TabPane tab="Privacy" key="2">
            <Form>
              <Form.Item label="Allow data collection">
                <Switch defaultChecked />
              </Form.Item>
              <Form.Item label="Enable two-factor authentication">
                <Switch />
              </Form.Item>
            </Form>
          </TabPane>
        </Tabs>
      </Modal>
    </NavbarContainer>
  );
};

export default Navbar;
