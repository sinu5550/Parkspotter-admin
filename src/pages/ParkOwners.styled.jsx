import styled from "styled-components";
import Modal from "react-modal";

export const ParkownersContainer = styled.div`
  background-color: #f8f9fa;
  color: #333;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

export const Title = styled.h1`
  font-size: 28px;
  color: #405189;
  margin: 0;
`;

export const SearchBar = styled.div`
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
`;

export const Filters = styled.div`
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
`;

export const ParkownersList = styled.ul`
  list-style: none;
  padding: 0;
`;

export const ParkownerItem = styled.li`
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
`;

export const StyledModal = styled(Modal)`
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  margin: 50px auto;

  h2 {
    margin-top: 0;
  }

  .ant-form-item {
    margin-bottom: 16px;
  }

  .ant-btn-primary {
    background-color: #3498db;
    border-color: #3498db;

    &:hover {
      background-color: #2980b9;
      border-color: #2980b9;
    }
  }

  .ant-btn {
    margin-right: 10px;
  }
`;
