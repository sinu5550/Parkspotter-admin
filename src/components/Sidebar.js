import React, { useState } from 'react';
import styled from 'styled-components';
import { 
  FaChevronRight, 
  FaChevronLeft, 
  FaChartPie, 
  FaTh, 
  FaCalendarAlt, 
  FaMapMarkedAlt, 
  FaTicketAlt, 
  FaUserShield, 
  FaFileInvoiceDollar,
  FaChevronDown,
  // FaUsers
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

const SidebarContainer = styled.div`
  width: ${props => (props.collapsed ? '80px' : '250px')};
  background-color: #405189;
  color: #ecf0f1;
  display: flex;
  flex-direction: column;
  padding: 20px;
  transition: width 0.3s;
`;

const CollapseButton = styled.div`
  cursor: pointer;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
`;

const Menu = styled.nav`
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    width: 100%;
  }

  li {
    margin: 10px 0;
    display: flex;
    flex-direction: column;
  }

  a {
    color: #ecf0f1;
    text-decoration: none;
    display: flex;
    align-items: center;
    padding: 5px 0;
    cursor: pointer;

    &:hover {
      background-color: #34495e;
      border-radius: 4px;
      padding-left: 10px;
    }
  }

  svg {
    margin-right: 10px;
  }

  .submenu {
    padding-left: 20px;
  }
`;

const SubMenuList = styled.ul`
  display: ${props => (props.isOpen ? 'block' : 'none')};
`;

const Sidebar = ({ collapsed, toggleCollapse }) => {
  const [openMenus, setOpenMenus] = useState({});

  const toggleMenu = (menu) => {
    setOpenMenus(prevState => ({
      ...prevState,
      [menu]: !prevState[menu]
    }));
  };

  return (
    <SidebarContainer collapsed={collapsed}>
      <CollapseButton onClick={toggleCollapse}>
        {collapsed ? <FaChevronRight /> : <FaChevronLeft />}
      </CollapseButton>
      <Menu>
        <ul>
          <li>
            <a onClick={() => toggleMenu('dashboards')}>
              <FaChartPie />
              {!collapsed && 'Dashboards'}
              {!collapsed && (openMenus['dashboards'] ? <FaChevronDown /> : <FaChevronRight />)}
            </a>
            <SubMenuList isOpen={openMenus['dashboards']}>
              <li className="submenu">
                <Link to="/dashboard">Overview</Link>
              </li>
              <li className="submenu">
                <Link to="/dashboard/analytics">Analytics</Link>
              </li>
            </SubMenuList>
          </li>
          <li>
            <a onClick={() => toggleMenu('management')}>
              <FaTh />
              {!collapsed && 'Management'}
              {!collapsed && (openMenus['management'] ? <FaChevronDown /> : <FaChevronRight />)}
            </a>
            <SubMenuList isOpen={openMenus['management']}>
              <li className="submenu">
                <Link to="/dashboard/parkowners">Parkowners</Link>
              </li>
              <li className="submenu">
                <Link to="/dashboard/users">Users</Link>
              </li>
              <li className="submenu">
                <Link to="/dashboard/zones">Zones</Link>
              </li>
            </SubMenuList>
          </li>
          <li>
            <a onClick={() => toggleMenu('subscriptions')}>
              <FaFileInvoiceDollar />
              {!collapsed && 'Subscriptions'}
              {!collapsed && (openMenus['subscriptions'] ? <FaChevronDown /> : <FaChevronRight />)}
            </a>
            <SubMenuList isOpen={openMenus['subscriptions']}>
              <li className="submenu">
                <Link to="/dashboard/subscriptions">View Subscriptions</Link>
              </li>
              <li className="submenu">
                <Link to="/dashboard/manage-plans">Manage Plans</Link>
              </li>
            </SubMenuList>
          </li>
          <li>
            <Link to="/dashboard/bookings">
              <FaCalendarAlt />
              {!collapsed && 'Bookings'}
            </Link>
          </li>
          <li>
            <Link to="/dashboard/parking-zones">
              <FaMapMarkedAlt />
              {!collapsed && 'Parking Zones'}
            </Link>
          </li>
          <li>
            <Link to="/dashboard/support-tickets">
              <FaTicketAlt />
              {!collapsed && 'Support Tickets'}
            </Link>
          </li>
          <li>
            <Link to="/dashboard/admin-management">
              <FaUserShield />
              {!collapsed && 'Admin Management'}
            </Link>
          </li>
        </ul>
      </Menu>
    </SidebarContainer>
  );
};

export default Sidebar;
// original
