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
    background-color: #9a9afa;
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
        setFilteredData(data)  // Setting initial filtered data to all park owners
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

  const getSubscriptionDetails = (subscriptionId) => {
    const subscription = subscriptions.find(sub => sub.id === subscriptionId)
    return subscription
      ? {
          name: subscription?.name,
          amount: subscription?.amount,
          price: subscription?.price,
          discount: subscription?.discount,
          total_amount: subscription?.total_amount,
        }
      : { name: "Unknown", amount: "Unknown", price: "Unknown", discount: "Unknown", total_amount: "Unknown" }
  }

  const handleSearch = (value) => {
    const filtered = parkOwners.filter((owner) => {
      const ownerDetails = owner?.park_owner_id
      const subscriptionDetails = getSubscriptionDetails(owner?.subscription_id)
      return (
        `${ownerDetails?.first_name} ${ownerDetails?.last_name}`.toLowerCase().includes(value.toLowerCase()) ||
        ownerDetails?.email.toLowerCase().includes(value.toLowerCase()) ||
        owner?.subscription_start_date.includes(value) ||
        owner?.subscription_end_date.includes(value) ||
        subscriptionDetails?.name.toLowerCase().includes(value.toLowerCase())
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

  const dataSource = filteredData.map((owner) => {
    const ownerDetails = owner?.park_owner_id
    const subscriptionDetails = getSubscriptionDetails(owner?.subscription_id)
    return {
      key: owner?.id,
      name: `${ownerDetails?.first_name} ${ownerDetails?.last_name}`,
      email: ownerDetails?.email,
      plan: subscriptionDetails?.name,
      status: getStatus(owner?.subscription_end_date),
      startDate: owner?.subscription_start_date,
      endDate: owner?.subscription_end_date,
      amount: subscriptionDetails?.total_amount,
      ...owner,
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
              placeholder="Search by name, email, start date, end date, plan name"
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
                      {status?.toUpperCase()}
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
              {selectedSubscription?.name}
            </Descriptions.Item>
            <Descriptions.Item label="Email">
              {selectedSubscription?.email}
            </Descriptions.Item>
            <Descriptions.Item label="Plan">
              {selectedSubscription?.plan}
            </Descriptions.Item>
            <Descriptions.Item label="Status">
              <Tag
                color={
                  getStatus(selectedSubscription?.endDate) === "Active"
                    ? "green"
                    : "volcano"
                }
              >
                {getStatus(selectedSubscription?.endDate)}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Start Date">
              {selectedSubscription?.startDate}
            </Descriptions.Item>
            <Descriptions.Item label="End Date">
              {selectedSubscription?.endDate}
            </Descriptions.Item>
            <Descriptions.Item label="Amount">
              {selectedSubscription?.amount}
            </Descriptions.Item>
          </Descriptions>
        </StyledModal>
      )}
    </SubscriptionsContainer>
  )
}

export default ViewSubscriptions
