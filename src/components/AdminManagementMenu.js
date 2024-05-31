import React, { useState } from "react"
import styled from "styled-components"
import {
  FaChevronDown,
  FaChevronRight,
  FaUserShield,
  FaUsers,
  FaFileAlt,
  FaCogs,
} from "react-icons/fa"
import { Link } from "react-router-dom"
import { FaChevronLeft } from "react-icons/fa"

const SidebarContainer = styled.div`
  width: ${(props) => (props.collapsed ? "80px" : "250px")};
  background-color: #405189;
  color: #ecf0f1;
  display: flex;
  flex-direction: column;
  padding: 20px;
  transition: width 0.3s;
`

const CollapseButton = styled.div`
  cursor: pointer;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
`

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
`

const SubMenuList = styled.ul`
  display: ${(props) => (props.isOpen ? "block" : "none")};
`

const AdminManagementMenu = ({ collapsed, toggleCollapse }) => {
  const [openMenus, setOpenMenus] = useState({})

  const toggleMenu = (menu) => {
    setOpenMenus((prevState) => ({
      ...prevState,
      [menu]: !prevState[menu],
    }))
  }

  return (
    <SidebarContainer collapsed={collapsed}>
      <CollapseButton onClick={toggleCollapse}>
        {collapsed ? <FaChevronRight /> : <FaChevronLeft />}
      </CollapseButton>
      <Menu>
        <ul>
          <li>
            <button onClick={() => toggleMenu("adminManagement")}>
              <FaUserShield />
              {!collapsed && "Admin Management"}
              {!collapsed &&
                (openMenus["adminManagement"] ? (
                  <FaChevronDown />
                ) : (
                  <FaChevronRight />
                ))}
            </button>
            <SubMenuList isOpen={openMenus["adminManagement"]}>
              <li className="submenu">
                <Link to="/dashboard/admin-management/users">
                  <FaUsers /> Users
                </Link>
              </li>
              <li className="submenu">
                <Link to="/dashboard/admin-management/roles">
                  <FaUserShield /> Roles
                </Link>
              </li>
              <li className="submenu">
                <Link to="/dashboard/admin-management/permissions">
                  <FaFileAlt /> Permissions
                </Link>
              </li>
              <li className="submenu">
                <Link to="/dashboard/admin-management/settings">
                  <FaCogs /> Settings
                </Link>
              </li>
            </SubMenuList>
          </li>
        </ul>
      </Menu>
    </SidebarContainer>
  )
}

export default AdminManagementMenu
