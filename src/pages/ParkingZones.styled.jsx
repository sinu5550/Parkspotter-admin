import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  height: 100vh;
  font-family: 'San Francisco', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
`;

export const MapContainer = styled.div`
  width: 70%;
  height: 100vh;
`;

export const SidePanel = styled.div`
  width: 30%;
  padding: 20px;
  background-color: transparent;
  overflow-y: auto;
`;

export const SearchBox = styled.input`
  width: 100%;
  padding: 12px;
  margin-bottom: 20px;
  border: none;
  border-radius: 12px;
  box-sizing: border-box;
  font-size: 16px;
  background-color: #e6e6e6;
  color: #333;
  outline: none;

  &:focus {
    background-color: #fff;
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.7);
  }
`;

export const ParkOwner = styled.div`
  margin-bottom: 15px;
  padding: 20px;
  border: none;
  border-radius: 12px;
  background-color: #ffffff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
  }

  h3 {
    margin: 0 0 10px;
    font-size: 18px;
    color: #202123;
  }

  p {
    margin: 0;
    font-size: 14px;
    color: #666;
  }
`;