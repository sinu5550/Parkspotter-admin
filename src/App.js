import React, { useState, useEffect } from "react"
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom"
import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"

const App = () => {
  const [collapsed, setCollapsed] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false)
  const [role, setRole] = useState(null)

  useEffect(() => {
    const storedRole = localStorage.getItem("role")
    if (storedRole) {
      setRole(storedRole)
      setLoggedIn(storedRole === "admin")
    }
  }, [])

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