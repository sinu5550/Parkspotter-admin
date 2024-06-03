// ModalComponent.jsx
import React from "react";
import Modal from "react-modal";
import { Button, Form, Input } from "antd";

Modal.setAppElement('#root'); 

const ParkOwnerModal = ({
  isVisible,
  onClose,
  onSubmit,
  title,
  initialValues,
}) => {
  const [form] = Form.useForm();

  const handleFinish = (values) => {
    onSubmit(values);
    form.resetFields();
  };

  return (
    <Modal isOpen={isVisible} onRequestClose={onClose} contentLabel={title}>
      <h2>{title}</h2>
      <Form
        layout="vertical"
        form={form}
        initialValues={initialValues}
        onFinish={handleFinish}
      >
        <Form.Item label="Name" name="name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Contact" name="contact" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Parks Owned" name="parksOwned" rules={[{ required: true }]}>
          <Input type="number" />
        </Form.Item>
        <Form.Item label="Revenue" name="revenue" rules={[{ required: true }]}>
          <Input type="number" />
        </Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
        <Button onClick={onClose}>Cancel</Button>
      </Form>
    </Modal>
  );
};

export default ParkOwnerModal;
