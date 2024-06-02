import styled from "styled-components"

export const OverviewContainer = styled.div`
  background-color: #f7f8fa;
  color: #333;
  font-family: Arial, sans-serif;
`

export const Greeting = styled.div`
  margin-bottom: 20px;

  h1 {
    font-size: 24px;
    color: #405189;
  }

  p {
    color: #555;
  }
`

export const SummaryStats = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  gap: 15px;
`

export const StatBox = styled.div`
  width: 23%;
  padding: 20px;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;

  h2 {
    margin: 0;
    font-size: 16px;
    color: #333;
  }

  p {
    font-size: 24px;
    margin: 10px 0;
    color: #333;
  }

  .increase {
    color: #27ae60;
  }

  .decrease {
    color: #c0392b;
  }

  .neutral {
    color: #f39c12;
  }

  a {
    color: #3498db;
    text-decoration: none;
    font-size: 14px;
  }
`

export const RevenueSection = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`

export const RevenueStats = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 10px;
`

export const RevenueBox = styled.div`
  width: 23%;
  padding: 20px;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;

  p {
    margin: 0;
    font-size: 16px;
    color: #333;
  }

  h3 {
    margin: 10px 0;
    font-size: 24px;
    color: #333;
  }
`

export const SalesLocations = styled.div`
  width: 100%;
  padding: 20px 40px;
  box-sizing: border-box;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;

  h2 {
    margin: 0 0 10px 0;
    font-size: 18px;
    color: #333;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 10px 0;
  }

  li {
    margin: 5px 0;
    font-size: 14px;
    color: #333;
    display: flex;
    justify-content: space-between;
  }

  button {
    padding: 5px 10px;
    background-color: #3498db;
    color: white;
    border: none;
    cursor: pointer;
  }
`