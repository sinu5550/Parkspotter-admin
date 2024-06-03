import React from "react"
import styled from "styled-components"
import { Outlet, Route, Routes, Navigate } from "react-router-dom"
import Sidebar from "../components/Sidebar"
import Navbar from "../components/Navbar"
import ViewSubscriptions from "../components/ViewSubscriptions"
import Overview from "./Overview"
import Analytics from "../components/Analytics"
import ParkingZones from "./ParkingZones"
// import SupportTickets from "./SupportTickets"
// import AdminManagement from "./AdminManagement"
import Parkowners from "./Parkowners"
import Users from "./Users"
import Zones from "./Zones"
import Bookings from "./Bookings"


const DashboardContainer = styled.div`
  display: flex;
  font-family: Arial, sans-serif;
  height: 100vh;
`

const MainContent = styled.div`
  flex: 1;
  background-color: #f7f8fa;
  overflow-y: auto;
`

const ContentWrapper = styled.div`
  // padding: 20px;
`

const Dashboard = ({ collapsed, toggleCollapse }) => {
  return (
    <DashboardContainer>
      <Sidebar collapsed={collapsed} toggleCollapse={toggleCollapse} />
      <MainContent>
        <Navbar />
        <ContentWrapper>
          <Routes>
            <Route path="/" element={<Overview />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="parking-zones" element={<ParkingZones />} />
            {/* <Route path="support-tickets" element={<SupportTickets />} /> */}
            {/* <Route path="admin-management" element={<AdminManagement />} /> */}
            <Route path="bookings" element={<Bookings />} />
            <Route path="subscriptions" element={<ViewSubscriptions />} />
            <Route path="parkowners" element={<Parkowners />} />
            <Route path="users" element={<Users />} />
            <Route path="zones" element={<Zones />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
          <Outlet />
        </ContentWrapper>
      </MainContent>
    </DashboardContainer>
  )
}

export default Dashboard
// original
