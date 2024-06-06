import React, { useEffect, useState } from "react"
import {
  Card,
  Col,
  Row,
  Spin,
  Select,
  Input,
  Modal,
  Button,
  Pagination,
} from "antd"
import axios from "axios"
import styled from "styled-components"

const { Option } = Select
const { Search } = Input

const Container = styled.div`
  padding: 20px;
  background-color: #f0f2f5;
  min-height: 100vh;
`

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`

const BookingCard = styled(Card)`
  width: 100%;
  margin-bottom: 16px;
  border-radius: 8px;
  transition: transform 0.3s ease;
  cursor: pointer;
  background-color: #fff;
  border: 1px solid #e0e0e0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }
`

const InfoBox = styled.div`
  padding: 10px;
  background-color: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  margin-bottom: 20px;
  text-align: center;
  display: flex;
  justify-content: space-around;
  align-items: center;
`

const CustomerInfo = styled.div`
  background-color: #faeafa;
  padding: 8px;
  border-radius: 8px;
  margin-top: 8px;
  color: #333;
`

const EmployeeInfo = styled.div`
  background-color: #e6f7ff;
  padding: 8px;
  border-radius: 8px;
  margin-top: 8px;
  color: #333;
`

const ModalContent = styled.div`
  p {
    margin-bottom: 8px;
  }
  strong {
    color: #202123;
  }
`

const Bookings = () => {
  const [bookings, setBookings] = useState([])
  const [customers, setCustomers] = useState([])
  const [employees, setEmployees] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [sortOrder, setSortOrder] = useState("asc")
  const [selectedBooking, setSelectedBooking] = useState(null)
  const [modalVisible, setModalVisible] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize] = useState(10)
  const [totalEmployeeBookings, setTotalEmployeeBookings] = useState(0)
  const [totalCustomerBookings, setTotalCustomerBookings] = useState(0)

  useEffect(() => {
    fetchData()
  }, [currentPage, searchTerm, sortOrder, fetchData])

  const fetchData = async () => {
    try {
      setLoading(true)
      const bookingResponse = await axios.get(
        `https://parkspotter-backened.onrender.com/accounts/bookings/?page=${currentPage}`
      )
      const customerResponse = await axios.get(
        `https://parkspotter-backened.onrender.com/customer/customer-list/`
      )
      const employeeResponse = await axios.get(
        `https://parkspotter-backened.onrender.com/accounts/employee-list/`
      )

      let filteredBookings = bookingResponse.data.filter((booking) =>
        booking.vehicle.plate_number.includes(searchTerm)
      )

      if (sortOrder === "asc") {
        filteredBookings = filteredBookings.sort(
          (a, b) => new Date(a.booking_time) - new Date(b.booking_time)
        )
      } else {
        filteredBookings = filteredBookings.sort(
          (a, b) => new Date(b.booking_time) - new Date(a.booking_time)
        )
      }

      const customerBookingsCount = filteredBookings.filter(
        (booking) => booking.customer
      ).length
      const employeeBookingsCount = filteredBookings.filter(
        (booking) => booking.employee
      ).length

      setBookings(filteredBookings)
      setCustomers(customerResponse.data)
      setEmployees(employeeResponse.data)
      setTotalCustomerBookings(customerBookingsCount)
      setTotalEmployeeBookings(employeeBookingsCount)
      setLoading(false)
    } catch (error) {
      console.error("Error fetching data:", error)
      setLoading(false)
    }
  }

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value)
    setCurrentPage(1) // Reset to the first page when search term changes
  }

  const handleSortOrderChange = (value) => {
    setSortOrder(value)
    setCurrentPage(1) // Reset to the first page when sort order changes
  }

  const getCustomerData = (customerId) => {
    return customers.find((customer) => customer.customer_id.id === customerId)
  }

  const getEmployeeData = (employeeId) => {
    return employees.find((employee) => employee.id === employeeId)
  }

  const showModal = (booking) => {
    setSelectedBooking(booking)
    setModalVisible(true)
  }

  const handleModalClose = () => {
    setSelectedBooking(null)
    setModalVisible(false)
  }

  return (
    <Container>
      <FilterContainer>
        <Search
          placeholder="Search by plate number"
          onChange={handleSearchChange}
          style={{ width: 400 }}
        />
        <Select
          defaultValue="asc"
          style={{ width: 200 }}
          onChange={handleSortOrderChange}
        >
          <Option value="asc">Sort by Date Ascending</Option>
          <Option value="desc">Sort by Date Descending</Option>
        </Select>
      </FilterContainer>
      <InfoBox>
        <p>Total Employee Bookings: {totalEmployeeBookings}</p>
        <p>Total Customer Bookings: {totalCustomerBookings}</p>
      </InfoBox>
      {loading ? (
        <Spin />
      ) : (
        <>
          <Row gutter={[16, 16]}>
            {bookings.map((booking) => {
              const customerData = getCustomerData(booking.customer)
              const employeeData = getEmployeeData(booking.employee)
              return (
                <Col key={booking.id} span={8}>
                  <BookingCard
                    title={`Ticket No: ${booking.ticket_no}`}
                    onClick={() => showModal(booking)}
                  >
                    <p>
                      <strong>Vehicle Plate:</strong>{" "}
                      {booking.vehicle.plate_number}
                    </p>
                    <p>
                      <strong>Booking Time:</strong>{" "}
                      {new Date(booking.booking_time).toLocaleString()}
                    </p>
                    <p>
                      <strong>Paid:</strong> {booking.is_paid ? "Yes" : "No"}
                    </p>
                    {customerData ? (
                      <CustomerInfo>
                        <p>
                          <strong>Customer Name:</strong>{" "}
                          {customerData.customer_id.first_name}{" "}
                          {customerData.customer_id.last_name}
                        </p>
                        <p>
                          <strong>Email:</strong>{" "}
                          {customerData.customer_id.email}
                        </p>
                      </CustomerInfo>
                    ) : (
                      employeeData && (
                        <EmployeeInfo>
                          <p>
                            <strong>Employee Name:</strong>{" "}
                            {employeeData.employee.first_name}{" "}
                            {employeeData.employee.last_name}
                          </p>
                          <p>
                            <strong>Park Owner ID:</strong>{" "}
                            {employeeData.park_owner_id}
                          </p>
                        </EmployeeInfo>
                      )
                    )}
                  </BookingCard>
                </Col>
              )
            })}
          </Row>
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            onChange={(page) => setCurrentPage(page)}
            total={bookings.length}
            showSizeChanger={false}
          />
        </>
      )}
      {selectedBooking && (
        <Modal
          title={`Booking Details - Ticket No: ${selectedBooking.ticket_no}`}
          visible={modalVisible}
          onCancel={handleModalClose}
          footer={[
            <Button key="close" onClick={handleModalClose}>
              Close
            </Button>,
          ]}
        >
          <ModalContent>
            <p>
              <strong>Vehicle Plate:</strong>{" "}
              {selectedBooking.vehicle.plate_number}
            </p>
            <p>
              <strong>Mobile No:</strong> {selectedBooking.vehicle.mobile_no}
            </p>
            <p>
              <strong>Booking Time:</strong>{" "}
              {new Date(selectedBooking.booking_time).toLocaleString()}
            </p>
            <p>
              <strong>Approximate Check Out Time:</strong>{" "}
              {new Date(
                selectedBooking.appoximate_check_out_time
              ).toLocaleString()}
            </p>
            <p>
              <strong>Rate Per Minute:</strong>{" "}
              {selectedBooking.rate_per_minute}
            </p>
            <p>
              <strong>Total Amount:</strong> {selectedBooking.total_amount}
            </p>
            <p>
              <strong>Paid:</strong> {selectedBooking.is_paid ? "Yes" : "No"}
            </p>
            {selectedBooking.customer ? (
              <CustomerInfo>
                <p>
                  <strong>Customer ID:</strong> {selectedBooking.customer}
                </p>
                <p>
                  <strong>First Name:</strong>{" "}
                  {
                    getCustomerData(selectedBooking.customer).customer_id
                      .first_name
                  }
                </p>
                <p>
                  <strong>Last Name:</strong>{" "}
                  {
                    getCustomerData(selectedBooking.customer).customer_id
                      .last_name
                  }
                </p>
                <p>
                  <strong>Email:</strong>{" "}
                  {getCustomerData(selectedBooking.customer).customer_id.email}
                </p>
                <p>
                  <strong>Mobile No:</strong>{" "}
                  {getCustomerData(selectedBooking.customer).mobile_no}
                </p>
              </CustomerInfo>
            ) : (
              selectedBooking.employee && (
                <EmployeeInfo>
                  <p>
                    <strong>Employee ID:</strong> {selectedBooking.employee}
                  </p>
                  <p>
                    <strong>First Name:</strong>{" "}
                    {
                      getEmployeeData(selectedBooking.employee).employee
                        .first_name
                    }
                  </p>
                  <p>
                    <strong>Last Name:</strong>{" "}
                    {
                      getEmployeeData(selectedBooking.employee).employee
                        .last_name
                    }
                  </p>
                  <p>
                    <strong>Qualification:</strong>{" "}
                    {getEmployeeData(selectedBooking.employee).qualification}
                  </p>
                  <p>
                    <strong>Address:</strong>{" "}
                    {getEmployeeData(selectedBooking.employee).address}
                  </p>
                  <p>
                    <strong>Park Owner ID:</strong>{" "}
                    {getEmployeeData(selectedBooking.employee).park_owner_id}
                  </p>
                </EmployeeInfo>
              )
            )}
          </ModalContent>
        </Modal>
      )}
    </Container>
  )
}

export default Bookings
