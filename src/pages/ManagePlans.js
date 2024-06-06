import React, { useState, useEffect } from "react";
import styled from "styled-components";
import SubscriptionModal from "./SubscriptionModal";
import { IoIosAddCircleOutline } from "react-icons/io";
import { Button, Input, Form, message } from "antd";

const Container = styled.div`
  padding: 40px 20px;
  max-width: 1200px;
  margin: 0 auto;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, sans-serif;
  color: #333;

  @media (max-width: 768px) {
    padding: 20px 10px;
  }
`;

const AddButton = styled(Button)`
  && {
    background-color: #202123;
    color: white;
    border-radius: 12px;
    padding: 12px 24px;
    font-size: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 30px auto;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #005bb5;
    }

    @media (max-width: 768px) {
      font-size: 16px;
      padding: 10px 20px;
    }
  }
`;

const FormContainer = styled.div`
  background: #ffffff;
  padding: 30px;
  border-radius: 16px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
  margin-bottom: 40px;
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: 768px) {
    padding: 20px;
    margin-bottom: 30px;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  font-size: 14px;
  color: #666;
  margin-bottom: 8px;
  font-weight: 500;
`;

const SubmitButton = styled(Button)`
  && {
    background-color: #202123;
    color: white;
    border-radius: 8px;
    padding: 14px 24px;
    font-size: 16px;
    margin-top: 20px;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #005bb5;
    }

    @media (max-width: 768px) {
      font-size: 14px;
      padding: 12px 20px;
    }
  }
`;

const ManagePlans = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formValues, setFormValues] = useState({
    name: "",
    duration_months: "",
    price: "",
    discount: "",
  });

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const response = await fetch(
          "https://parkspotter-backened.onrender.com/accounts/subscription_package/"
        );
        const data = await response.json();
        setSubscriptions(data);
      } catch (error) {
        console.error("Error fetching subscriptions:", error);
      }
    };

    fetchSubscriptions();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (values) => {
    try {
      const response = await fetch(
        "https://parkspotter-backened.onrender.com/accounts/subscription_package/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: values.name,
            duration_months: parseInt(values.duration_months, 10),
            price: parseFloat(values.price),
            discount: parseInt(values.discount, 10),
          }),
        }
      );

      if (response.ok) {
        const newSubscription = await response.json();
        setSubscriptions([...subscriptions, newSubscription]);
        setFormValues({
          name: "",
          duration_months: "",
          price: "",
          discount: "",
        });
        message.success("Subscription created successfully!");
      } else {
        console.error("Error creating subscription:", response.statusText);
        message.error("Error creating subscription.");
      }
    } catch (error) {
      console.error("Error creating subscription:", error);
      message.error("Error creating subscription.");
    }
  };

  return (
    <Container>
      <AddButton onClick={() => setIsModalOpen(true)} icon={<IoIosAddCircleOutline size="24" />}>
        View Active Plans
      </AddButton>
      <FormContainer>
        <Form
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={formValues}
        >
          <FormGroup>
            <Label htmlFor="name">Plan Name</Label>
            <Form.Item
              name="name"
              rules={[{ required: true, message: 'Please enter the plan name' }]}
            >
              <Input
                type="text"
                id="name"
                name="name"
                value={formValues.name}
                onChange={handleInputChange}
              />
            </Form.Item>
          </FormGroup>
          <FormGroup>
            <Label htmlFor="duration_months">Duration (Months)</Label>
            <Form.Item
              name="duration_months"
              rules={[{ required: true, message: 'Please enter the duration in months' }]}
            >
              <Input
                type="number"
                id="duration_months"
                name="duration_months"
                value={formValues.duration_months}
                onChange={handleInputChange}
              />
            </Form.Item>
          </FormGroup>
          <FormGroup>
            <Label htmlFor="price">Price (tk)</Label>
            <Form.Item
              name="price"
              rules={[{ required: true, message: 'Please enter the price' }]}
            >
              <Input
                type="number"
                step="0.01"
                id="price"
                name="price"
                value={formValues.price}
                onChange={handleInputChange}
              />
            </Form.Item>
          </FormGroup>
          <FormGroup>
            <Label htmlFor="discount">Discount (%)</Label>
            <Form.Item
              name="discount"
              rules={[{ required: true, message: 'Please enter the discount' }]}
            >
              <Input
                type="number"
                id="discount"
                name="discount"
                value={formValues.discount}
                onChange={handleInputChange}
              />
            </Form.Item>
          </FormGroup>
          <SubmitButton type="primary" htmlType="submit">Create Plan</SubmitButton>
        </Form>
      </FormContainer>
      <SubscriptionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        subscriptions={subscriptions}
        setSubscriptions={setSubscriptions}
      />
    </Container>
  );
};

export default ManagePlans;
