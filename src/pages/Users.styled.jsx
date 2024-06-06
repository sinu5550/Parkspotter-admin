import styled from "styled-components"

export const UsersContainer = styled.div`
  background-color: #f7f8fa;
  font-family: Arial, sans-serif;
  padding: 20px;
`

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  h1 {
    font-size: 24px;
    color: #333;
  }
`

export const SearchBar = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
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

export const Filters = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;

  button {
    display: flex;
    align-items: center;
    background-color: #3498db;
    color: #fff;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
      background-color: #2980b9;
    }

    svg {
      margin-right: 5px;
    }
  }
`

export const Stats = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
`

export const StatBox = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
  flex: 1;
  margin: 0 10px;

  h2 {
    margin-bottom: 10px;
    font-size: 18px;
    color: #333;
  }

  p {
    font-size: 24px;
    color: #3498db;

    &.increase {
      color: #2ecc71;
    }

    &.decrease {
      color: #e74c3c;
    }
  }
`

export const UserTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;

  th,
  td {
    padding: 10px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }

  th {
    background-color: #f2f2f2;
  }

  td {
    background-color: #fff;
  }

  tr:hover td {
    background-color: #f9f9f9;
  }
`

export const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`

export const PaginationButton = styled.button`
  background-color: #3498db;
  color: #fff;
  border: none;
  border-radius: 5px;
  margin: 0 5px;
  padding: 10px 20px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #2980b9;
  }
`

export const Charts = styled.div`
  display: flex;
  justify-content: space-around;
  //   flex-wrap: wrap;
`

export const ChartBox = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin: 10px;
  width: ${({ type }) => {
    if (type === "1st") {
      return "70%"
    } else if (type === "2nd") {
      return "30%"
    } else {
      return "100%"
    }
  }};
`
