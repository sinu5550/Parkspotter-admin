import React, { useState } from 'react';
import styled from 'styled-components';
import { IoIosCloseCircleOutline } from 'react-icons/io';

const ModalBackground = styled.div`
  display: ${({ isModalOpen }) => (isModalOpen ? 'flex' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.85);
  justify-content: center;
  align-items: center;
  z-index: 1000;
  transition: opacity 0.3s ease-in-out;
`;

const ModalContent = styled.div`
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 12px 48px rgba(0, 0, 0, 0.3);
  width: 90%;
  max-width: 800px;
  max-height: 80vh;
  padding: 40px;
  position: relative;
  overflow-y: auto;
  animation: slideIn 0.4s ease-in-out;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(-30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 8px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  cursor: pointer;
  color: #aaa;
  font-size: 36px;
  transition: color 0.3s;

  &:hover {
    color: #555;
  }

  &:focus {
    outline: none;
  }
`;

const ModalHeader = styled.h2`
  font-size: 28px;
  color: #333;
  margin-bottom: 20px;
  text-align: center;
  border-bottom: 2px solid #eee;
  padding-bottom: 10px;
`;

const FilterInput = styled.input`
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #ddd;
  font-size: 16px;
  margin-bottom: 20px;
  width: 100%;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: border-color 0.2s;

  &:focus {
    border-color: #0070c9;
    outline: none;
  }
`;

const SubscriptionCardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
  justify-items: center;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const SubscriptionCard = styled.div`
  background: linear-gradient(135deg, #fafafa, #ffffff);
  border-radius: 16px;
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  width: 100%;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  }
`;

const CardTitle = styled.h3`
  font-size: 24px;
  color: #333;
  margin-bottom: 15px;
`;

const CardDetails = styled.p`
  font-size: 16px;
  color: #555;
  margin-bottom: 20px;
`;

const EditButton = styled.button`
  background-color: #202123;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 12px 24px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #005bb5;
  }

  &:focus {
    outline: none;
  }
`;

const EditForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 20px;
  width: 100%;
`;

const EditLabel = styled.label`
  font-size: 14px;
  color: #666;
  margin-bottom: 5px;
`;

const EditInput = styled.input`
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #ddd;
  font-size: 16px;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: border-color 0.2s;

  &:focus {
    border-color: #0070c9;
    outline: none;
  }
`;

const SaveButton = styled.button`
  background-color: #202123;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 12px 20px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #005bb5;
  }

  &:focus {
    outline: none;
  }
`;

const SubscriptionModal = ({ isOpen, onClose, subscriptions, setSubscriptions }) => {
  const [filter, setFilter] = useState('');
  const [editingSubscription, setEditingSubscription] = useState(null);
  const [editFormValues, setEditFormValues] = useState({
    name: '',
    duration_months: '',
    price: '',
    discount: '',
  });

  const filteredSubscriptions = subscriptions.filter(subscription =>
    subscription.name.toLowerCase().includes(filter.toLowerCase())
  );

  const handleEditClick = (subscription) => {
    setEditingSubscription(subscription.id);
    setEditFormValues({
      name: subscription.name,
      duration_months: subscription.duration_months,
      price: subscription.price,
      discount: subscription.discount,
    });
  };

  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setEditFormValues({ ...editFormValues, [name]: value });
  };

  const handleEditFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://parkspotter-backened.onrender.com/accounts/subscription_package/${editingSubscription}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editFormValues),
      });

      if (response.ok) {
        const updatedSubscription = await response.json();
        setSubscriptions(subscriptions.map(sub => (sub.id === updatedSubscription.id ? updatedSubscription : sub)));
        setEditingSubscription(null);
      } else {
        console.error('Error updating subscription:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating subscription:', error);
    }
  };

  return (
    <ModalBackground isModalOpen={isOpen}>
      <ModalContent>
        <CloseButton onClick={onClose}>
          <IoIosCloseCircleOutline />
        </CloseButton>
        <ModalHeader>Active Subscription Plans</ModalHeader>
        <FilterInput
          type="text"
          placeholder="Filter plans by name..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          aria-label="Filter plans by name"
        />
        <SubscriptionCardsContainer>
          {filteredSubscriptions.map((subscription) => (
            <SubscriptionCard key={subscription.id}>
              <CardTitle>{subscription.name}</CardTitle>
              <CardDetails>Duration: {subscription.duration_months} months</CardDetails>
              <CardDetails>Price: &nbsp;{subscription.price}tk</CardDetails>
              <CardDetails>Discount: {subscription.discount}%</CardDetails>
              <EditButton onClick={() => handleEditClick(subscription)}>Edit Plan</EditButton>
              {editingSubscription === subscription.id && (
                <EditForm onSubmit={handleEditFormSubmit}>
                  <EditLabel htmlFor="name">Plan Name</EditLabel>
                  <EditInput
                    type="text"
                    id="name"
                    name="name"
                    value={editFormValues.name}
                    onChange={handleEditFormChange}
                    required
                    aria-label="Plan Name"
                  />
                  <EditLabel htmlFor="duration_months">Duration (Months)</EditLabel>
                  <EditInput
                    type="number"
                    id="duration_months"
                    name="duration_months"
                    value={editFormValues.duration_months}
                    onChange={handleEditFormChange}
                    required
                    aria-label="Duration in Months"
                  />
                  <EditLabel htmlFor="price">Price (tk)</EditLabel>
                  <EditInput
                    type="number"
                    step="0.01"
                    id="price"
                    name="price"
                    value={editFormValues.price}
                    onChange={handleEditFormChange}
                    required
                    aria-label="Price in dollars"
                  />
                  <EditLabel htmlFor="discount">Discount (%)</EditLabel>
                  <EditInput
                    type="number"
                    id="discount"
                    name="discount"
                    value={editFormValues.discount}
                    onChange={handleEditFormChange}
                    required
                    aria-label="Discount percentage"
                  />
                  <SaveButton type="submit">Save Changes</SaveButton>
                </EditForm>
              )}
            </SubscriptionCard>
          ))}
        </SubscriptionCardsContainer>
      </ModalContent>
    </ModalBackground>
  );
};

export default SubscriptionModal;
