import React, { useState } from "react"
import styled from "styled-components"
import Modal from "react-modal"

const AdminManagementContainer = styled.div`
  background-color: #f7f8fa;
  color: #333;
  font-family: Arial, sans-serif;
`

const Greeting = styled.div`
  margin-bottom: 20px;

  h1 {
    font-size: 24px;
    color: #405189;
  }

  p {
    color: #555;
  }
`

const ManagementSection = styled.div`
  margin-bottom: 20px;
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  h2 {
    margin: 0 0 20px 0;
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
    align-items: center;
    padding: 10px;
    border-bottom: 1px solid #eee;
  }

  button {
    padding: 5px 10px;
    background-color: #3498db;
    color: white;
    border: none;
    border-radius: 3px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #2980b9;
    }
  }
`

const AddButton = styled.button`
  margin-top: 10px;
  background-color: #2ecc71;
  &:hover {
    background-color: #27ae60;
  }
`

const DeleteButton = styled.button`
  background-color: #e74c3c;
  &:hover {
    background-color: #c0392b;
  }
`

const SearchInput = styled.input`
  padding: 10px;
  margin-bottom: 20px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 90%;
`

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  input {
    padding: 8px;
    font-size: 14px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  button {
    padding: 8px;
    font-size: 14px;
    background-color: #3498db;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
      background-color: #2980b9;
    }
  }
`

const AdminManagement = () => {
  const [roles, setRoles] = useState(["Admin", "User", "Guest"])
  const [permissions, setPermissions] = useState([
    "View Dashboard",
    "Edit Profile",
    "Delete User",
  ])
  const [settings, setSettings] = useState([
    "Notification Settings",
    "Privacy Settings",
    "Account Settings",
  ])
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [modalType, setModalType] = useState("")
  const [modalValue, setModalValue] = useState("")
  const [modalIndex, setModalIndex] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")

  const openModal = (type, value = "", index = null) => {
    setModalType(type)
    setModalValue(value)
    setModalIndex(index)
    setModalIsOpen(true)
  }

  const closeModal = () => {
    setModalIsOpen(false)
    setModalValue("")
    setModalIndex(null)
  }

  const handleSave = () => {
    if (modalValue.trim() === "") return

    if (modalType === "Role") {
      if (modalIndex !== null) {
        setRoles(roles.map((role, i) => (i === modalIndex ? modalValue : role)))
      } else {
        setRoles([...roles, modalValue])
      }
    } else if (modalType === "Permission") {
      if (modalIndex !== null) {
        setPermissions(
          permissions.map((permission, i) =>
            i === modalIndex ? modalValue : permission
          )
        )
      } else {
        setPermissions([...permissions, modalValue])
      }
    } else if (modalType === "Setting") {
      if (modalIndex !== null) {
        setSettings(
          settings.map((setting, i) =>
            i === modalIndex ? modalValue : setting
          )
        )
      } else {
        setSettings([...settings, modalValue])
      }
    }

    closeModal()
  }

  const handleDelete = (type, index) => {
    if (type === "Role") {
      setRoles(roles.filter((_, i) => i !== index))
    } else if (type === "Permission") {
      setPermissions(permissions.filter((_, i) => i !== index))
    } else if (type === "Setting") {
      setSettings(settings.filter((_, i) => i !== index))
    }
  }

  const filteredItems = (items) => {
    return items.filter((item) =>
      item.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }

  return (
    <AdminManagementContainer>
      <Greeting>
        <h1>Welcome, Admin!</h1>
        <p>Manage roles, permissions, and settings efficiently.</p>
      </Greeting>

      <SearchInput
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <ManagementSection>
        <h2>Roles Management</h2>
        <ul>
          {filteredItems(roles).map((role, index) => (
            <li key={index}>
              <span>{role}</span>
              <div>
                <button style={{ marginRight: "5px" }} onClick={() => openModal("Role", role, index)}>
                  Edit
                </button>
                <DeleteButton onClick={() => handleDelete("Role", index)}>
                  Delete
                </DeleteButton>
              </div>
            </li>
          ))}
        </ul>
        <AddButton onClick={() => openModal("Role")}>Add Role</AddButton>
      </ManagementSection>

      <ManagementSection>
        <h2>Permissions Management</h2>
        <ul>
          {filteredItems(permissions).map((permission, index) => (
            <li key={index}>
              <span>{permission}</span>
              <div>
                <button
                  style={{ marginRight: "5px" }}
                  onClick={() => openModal("Permission", permission, index)}
                >
                  Edit
                </button>
                <DeleteButton onClick={() => handleDelete("Permission", index)}>
                  Delete
                </DeleteButton>
              </div>
            </li>
          ))}
        </ul>
        <AddButton onClick={() => openModal("Permission")}>
          Add Permission
        </AddButton>
      </ManagementSection>

      <ManagementSection>
        <h2>Settings Management</h2>
        <ul>
          {filteredItems(settings).map((setting, index) => (
            <li key={index}>
              <span>{setting}</span>
              <div>
                <button style={{ marginRight: "5px" }} onClick={() => openModal("Setting", setting, index)}>
                  Edit
                </button>
                <DeleteButton onClick={() => handleDelete("Setting", index)}>
                  Delete
                </DeleteButton>
              </div>
            </li>
          ))}
        </ul>
        <AddButton onClick={() => openModal("Setting")}>Add Setting</AddButton>
      </ManagementSection>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Edit Item"
        ariaHideApp={false}
        style={{
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            padding: "20px",
            borderRadius: "10px",
            width: "300px",
          },
        }}
      >
        <ModalContent>
          <h2>
            {modalIndex !== null ? "Edit" : "Add"} {modalType}
          </h2>
          <input
            type="text"
            value={modalValue}
            onChange={(e) => setModalValue(e.target.value)}
            placeholder={`Enter ${modalType}`}
          />
          <button onClick={handleSave}>Save</button>
          <button
            onClick={closeModal}
            style={{ backgroundColor: "#e74c3c", marginTop: "10px" }}
          >
            Cancel
          </button>
        </ModalContent>
      </Modal>
    </AdminManagementContainer>
  )
}

export default AdminManagement
