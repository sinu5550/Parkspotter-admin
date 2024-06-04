import React, { useState, useEffect } from "react"
import {
  Table,
  Button,
  Modal,
  Descriptions,
  Tag,
  Spin,
  Input,
  Alert,
  Pagination,
} from "antd"
import styled from "styled-components"

const SubscriptionsContainer = styled.div`
  background-color: #f0f2f5;
  min-height: 100vh;
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const FullWidthContainer = styled.div`
  width: 100%;
  max-width: 1200px;
`

const StyledTable = styled(Table)`
  .ant-table {
    background-color: #ffffff;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
  .ant-table-thead > tr > th {
    background-color: #fafafa;
    font-weight: bold;
    text-align: center;
  }
  .ant-table-tbody > tr > td {
    text-align: center;
  }
`

const StyledModal = styled(Modal)`
  .ant-modal-content {
    border-radius: 12px;
    padding: 20px;
  }
`

const { Search } = Input

const ViewSubscriptions = () => {
  const [subscriptions, setSubscriptions] = useState([])
  const [parkOwners, setParkOwners] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedSubscription, setSelectedSubscription] = useState(null)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize] = useState(10)

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const response = await fetch(
          "https://parkspotter-backened.onrender.com/accounts/subscription_package/"
        )
        if (!response.ok) throw new Error("Failed to fetch subscriptions")
        const data = await response.json()
        setSubscriptions(data)
        setFilteredData(data)
      } catch (error) {
        setError(error.message)
      }
    }

    const fetchParkOwners = async () => {
      try {
        const response = await fetch(
          "https://parkspotter-backened.onrender.com/accounts/parkowner-list/"
        )
        if (!response.ok) throw new Error("Failed to fetch park owners")
        const data = await response.json()
        setParkOwners(data)
      } catch (error) {
        setError(error.message)
      }
    }

    Promise.all([fetchSubscriptions(), fetchParkOwners()]).then(() => {
      setLoading(false)
    })
  }, [])

  const getStatus = (endDate) => {
    const currentDate = new Date()
    const subscriptionEndDate = new Date(endDate)
    return subscriptionEndDate >= currentDate ? "Active" : "Expired"
  }

  const getParkOwnerDetails = (subscriptionId) => {
    const owner = parkOwners.find(
      (owner) => owner.subscription_id === subscriptionId
    )
    return owner
      ? {
          name: `${owner.park_owner_id.first_name} ${owner.park_owner_id.last_name}`,
          email: owner.park_owner_id.email,
        }
      : { name: "Unknown", email: "Unknown" }
  }

  const handleSearch = (value) => {
    const filtered = subscriptions.filter((sub) => {
      const ownerDetails = getParkOwnerDetails(sub.id)
      return (
        ownerDetails.name.toLowerCase().includes(value.toLowerCase()) ||
        ownerDetails.email.toLowerCase().includes(value.toLowerCase()) ||
        sub.start_date.includes(value) ||
        sub.end_date.includes(value)
      )
    })
    setFilteredData(filtered)
  }

  const viewDetails = (record) => {
    setSelectedSubscription(record)
    setIsModalVisible(true)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
    setSelectedSubscription(null)
  }

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  const dataSource = filteredData.map((subscription) => {
    const ownerDetails = getParkOwnerDetails(subscription.id)
    return {
      key: subscription.id,
      name: ownerDetails.name,
      email: ownerDetails.email,
      plan: subscription.package === 1 ? "Basic" : "Premium",
      status: getStatus(subscription.end_date),
      startDate: subscription.start_date,
      endDate: subscription.end_date,
      ...subscription,
    }
  })

  const paginatedData = dataSource.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  )

  return (
    <SubscriptionsContainer>
      <FullWidthContainer>
        {loading ? (
          <Spin size="large" />
        ) : error ? (
          <Alert message="Error" description={error} type="error" showIcon />
        ) : (
          <>
            <Search
              placeholder="Search by name, email, start date, end date"
              onSearch={handleSearch}
              style={{ marginBottom: 20 }}
              enterButton
            />
            <StyledTable
              columns={[
                {
                  title: "Name",
                  dataIndex: "name",
                  key: "name",
                },
                {
                  title: "Email",
                  dataIndex: "email",
                  key: "email",
                },
                {
                  title: "Plan",
                  dataIndex: "plan",
                  key: "plan",
                },
                {
                  title: "Status",
                  dataIndex: "status",
                  key: "status",
                  render: (status) => (
                    <Tag color={status === "Active" ? "green" : "volcano"}>
                      {status.toUpperCase()}
                    </Tag>
                  ),
                },
                {
                  title: "Start Date",
                  dataIndex: "startDate",
                  key: "startDate",
                },
                {
                  title: "End Date",
                  dataIndex: "endDate",
                  key: "endDate",
                },
                {
                  title: "Action",
                  key: "action",
                  render: (_, record) => (
                    <Button type="link" onClick={() => viewDetails(record)}>
                      View Details
                    </Button>
                  ),
                },
              ]}
              dataSource={paginatedData}
              pagination={false}
            />
            <Pagination
              current={currentPage}
              pageSize={pageSize}
              total={filteredData.length}
              onChange={handlePageChange}
              style={{ marginTop: 20, textAlign: "center" }}
            />
          </>
        )}
      </FullWidthContainer>
      {selectedSubscription && (
        <StyledModal
          title="Subscription Details"
          visible={isModalVisible}
          onCancel={handleCancel}
          footer={[
            <Button key="back" onClick={handleCancel}>
              Close
            </Button>,
          ]}
        >
          <Descriptions bordered layout="vertical">
            <Descriptions.Item label="Name">
              {getParkOwnerDetails(selectedSubscription.id).name}
            </Descriptions.Item>
            <Descriptions.Item label="Email">
              {getParkOwnerDetails(selectedSubscription.id).email}
            </Descriptions.Item>
            <Descriptions.Item label="Plan">
              {selectedSubscription.package === 1 ? "Basic" : "Premium"}
            </Descriptions.Item>
            <Descriptions.Item label="Status">
              <Tag
                color={
                  getStatus(selectedSubscription.end_date) === "Active"
                    ? "green"
                    : "volcano"
                }
              >
                {getStatus(selectedSubscription.end_date)}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Start Date">
              {selectedSubscription.start_date}
            </Descriptions.Item>
            <Descriptions.Item label="End Date">
              {selectedSubscription.end_date}
            </Descriptions.Item>
            <Descriptions.Item label="Amount">
              {selectedSubscription.amount}
            </Descriptions.Item>
          </Descriptions>
        </StyledModal>
      )}
    </SubscriptionsContainer>
  )
}

export default ViewSubscriptions
// original