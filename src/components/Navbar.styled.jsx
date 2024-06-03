import styled from "styled-components"
import { Menu } from "antd"

export const NavbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 1;
`

export const SearchBar = styled.div`
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
`

export const SuggestionsList = styled.div`
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
`

export const NavIcons = styled.div`
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
`

export const Profile = styled.div`
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
`

export const ProfileMenu = styled(Menu)`
  .ant-dropdown-menu-item {
    display: flex;
    align-items: center;
    svg {
      margin-right: 10px;
    }
  }
`
