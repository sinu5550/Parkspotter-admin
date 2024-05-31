import React, { useState } from "react"
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom"
// import Analytics from "./components/Analytics"
// import ParkingZones from "./pages/ParkingZones"
// import SupportTickets from "./pages/SupportTickets"
// import AdminManagement from "./pages/AdminManagement"
import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"
// import Parkowners from "./pages/Parkowners"

const App = () => {
  const [collapsed, setCollapsed] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false)
  const toggleCollapse = () => {
    setCollapsed(!collapsed)
  }

  return (
    <Router>
      <Routes>
        {!loggedIn ? (
          <>
            <Route
              path="/login"
              element={<Login setLoggedIn={setLoggedIn} />}
            />
            <Route path="*" element={<Navigate to="/login" />} />
          </>
        ) : (
          <>
            <Route
              path="/dashboard/*"
              element={
                <Dashboard
                  collapsed={collapsed}
                  toggleCollapse={toggleCollapse}
                />
              }
            />
            <Route path="*" element={<Navigate to="/dashboard" />} />
          </>
        )}
      </Routes>
    </Router>
  )
}

export default App
// original
