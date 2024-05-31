import React, { useState } from "react"
import { Table, Button, Modal, Descriptions, Tag } from "antd"
import styled from "styled-components"

const SubscriptionsContainer = styled.div`
  background-color: #fff;
  min-height: 100vh;
`

const mockData = [
  {
    key: "1",
    name: "John Doe",
    email: "morshed.@yahoo.com",
    plan: "Basic",
    status: "Active",
    startDate: "2023-01-01",
    endDate: "2024-01-01",
  },
  {
    key: "2",
    name: "Jane Smith",
    email: "sifat.123@gmail.com",
    plan: "Premium",
    status: "Expired",
    startDate: "2022-01-01",
    endDate: "2023-01-01",
  },
  {
    key: "2",
    name: "Jane Smith",
    email: "habib.mim@gmail.com",
    plan: "Premium",
    status: "Expired",
    startDate: "2022-01-01",
    endDate: "2023-01-01",
  },
]

const ViewSubscriptions = () => {
  const [selectedSubscription, setSelectedSubscription] = useState(null)
  const [isModalVisible, setIsModalVisible] = useState(false)

  const columns = [
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
  ]

  const viewDetails = (record) => {
    setSelectedSubscription(record)
    setIsModalVisible(true)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
    setSelectedSubscription(null)
  }

  return (
    <SubscriptionsContainer>
      <h1>View Subscriptions</h1>
      <Table columns={columns} dataSource={mockData} />
      {selectedSubscription && (
        <Modal
          title="Subscription Details"
          visible={isModalVisible}
          onCancel={handleCancel}
          footer={[
            <Button key="back" onClick={handleCancel}>
              Close
            </Button>,
          ]}
        >
          <Descriptions style={{ width: "100%" }}>
            <Descriptions.Item label="Name">
              {selectedSubscription.name}
            </Descriptions.Item>
            <Descriptions.Item label="Email">
              {selectedSubscription.email}
            </Descriptions.Item>
            <Descriptions.Item label="Plan">
              {selectedSubscription.plan}
            </Descriptions.Item>
            <Descriptions.Item label="Status">
              <Tag
                color={
                  selectedSubscription.status === "Active" ? "green" : "volcano"
                }
              >
                {selectedSubscription.status}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Start Date">
              {selectedSubscription.startDate}
            </Descriptions.Item>
            <Descriptions.Item label="End Date">
              {selectedSubscription.endDate}
            </Descriptions.Item>
          </Descriptions>
        </Modal>
      )}
    </SubscriptionsContainer>
  )
}

export default ViewSubscriptions
