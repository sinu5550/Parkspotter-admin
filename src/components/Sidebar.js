import React, { useState } from 'react';
import styled from 'styled-components';
import { 
  FaChevronRight, 
  FaChevronLeft, 
  FaChartPie, 
  FaTh, 
  FaCalendarAlt, 
  FaMapMarkedAlt, 
  // FaTicketAlt, 
  // FaUserShield, 
  FaFileInvoiceDollar,
  FaChevronDown,
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
`;

const MenuLink = styled(Link)`
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

  svg {
    margin-right: 10px;
  }
`;

const SubMenuLink = styled(Link)`
  color: #ecf0f1;
  text-decoration: none;
  display: flex;
  align-items: center;
  padding: 5px 0;
  cursor: pointer;
  padding-left: 20px;

  &:hover {
    background-color: #34495e;
    border-radius: 4px;
    padding-left: 25px;
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
            <MenuLink as="div" onClick={() => toggleMenu('dashboards')}>
              <FaChartPie />
              {!collapsed && 'Dashboards'}
              {!collapsed && (openMenus['dashboards'] ? <FaChevronDown /> : <FaChevronRight />)}
            </MenuLink>
            <SubMenuList isOpen={openMenus['dashboards']}>
              <li>
                <SubMenuLink to="/dashboard">Overview</SubMenuLink>
              </li>
              <li>
                <SubMenuLink to="/dashboard/analytics">Analytics</SubMenuLink>
              </li>
            </SubMenuList>
          </li>
          <li>
            <MenuLink as="div" onClick={() => toggleMenu('management')}>
              <FaTh />
              {!collapsed && 'Management'}
              {!collapsed && (openMenus['management'] ? <FaChevronDown /> : <FaChevronRight />)}
            </MenuLink>
            <SubMenuList isOpen={openMenus['management']}>
              <li>
                <SubMenuLink to="/dashboard/parkowners">Parkowners</SubMenuLink>
              </li>
              <li>
                <SubMenuLink to="/dashboard/users">Users</SubMenuLink>
              </li>
              {/* <li>
                <SubMenuLink to="/dashboard/zones">Zones</SubMenuLink>
              </li> */}
            </SubMenuList>
          </li>
          <li>
            <MenuLink as="div" onClick={() => toggleMenu('subscriptions')}>
              <FaFileInvoiceDollar />
              {!collapsed && 'Subscriptions'}
              {!collapsed && (openMenus['subscriptions'] ? <FaChevronDown /> : <FaChevronRight />)}
            </MenuLink>
            <SubMenuList isOpen={openMenus['subscriptions']}>
              <li>
                <SubMenuLink to="/dashboard/subscriptions">View Subscriptions</SubMenuLink>
              </li>
              <li>
                <SubMenuLink to="/dashboard/manage-plans">Manage Plans</SubMenuLink>
              </li>
            </SubMenuList>
          </li>
          <li>
            <MenuLink to="/dashboard/bookings">
              <FaCalendarAlt />
              {!collapsed && 'Bookings'}
            </MenuLink>
          </li>
          <li>
            <MenuLink to="/dashboard/parking-zones">
              <FaMapMarkedAlt />
              {!collapsed && 'Parking Zones'}
            </MenuLink>
          </li>
          {/* <li>
            <MenuLink to="/dashboard/support-tickets">
              <FaTicketAlt />
              {!collapsed && 'Support Tickets'}
            </MenuLink>
          </li> */}
          {/* <li>
            <MenuLink to="/dashboard/admin-management">
              <FaUserShield />
              {!collapsed && 'Admin Management'}
            </MenuLink>
          </li> */}
        </ul>
      </Menu>
    </SidebarContainer>
  );
};

export default Sidebar;
