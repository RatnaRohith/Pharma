import React, { useState } from "react";
import { Modal, Button, Input, Form, message } from "antd";
import styled from "styled-components";
import { register } from '../../services/userService'

export const Styles = styled.div`
  span {
    font-weight: 500;
    font-size: 12px;
    float: right;
    &:hover {
      cursor: pointer;
      opacity: 0.7;
    }
  }
`;
const AddAccount = ({ added }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [passwordVisible, setPasswordVisible] = React.useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onFinish = async (values) => {
    console.log("Success:", values);
    try {
      const { data } = await register(values)
      setIsModalVisible(false);
      message.success('User is successfully created.')
      added();
    }
    catch (ex) {
      if (ex.response && ex.response.status === 400) {
        // toast.error(ex.response.data);
        message.error(ex.response.data);
      }
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Styles>
      <Button
        style={{ marginBottom: "30px" }}
        type="primary"
        onClick={showModal}
      >
        Create Account
      </Button>
      <Modal
        destroyOnClose={true}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        wrapClassName="modal-forgot-password"
      >
        <Form
          name="basic"
          // form={form}
          // initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Enter name"
            name="name"
            rules={[{ required: true, message: "Name is required" }]}
          >
            <Input
              style={{
                color: "black",
                width: "466px",
                height: "44px",
                backgroundColor: "rgba(196, 196, 196, 0.2)",
              }}
              placeholder="Enter name..."

            />
          </Form.Item>

          <Form.Item
            label="Enter email"
            name="email"
            rules={[{ required: true, message: "Email is required" }]}
          >
            <Input
              type="email"
              style={{
                color: "black",
                width: "466px",
                height: "44px",
                backgroundColor: "rgba(196, 196, 196, 0.2)",
              }}
              placeholder="Enter email..."
            />
          </Form.Item>
          <Form.Item
            label="Enter Password"
            name="password"
            rules={[{ required: true, message: "Password is required" }]}
          >
            <Input.Password
              style={{
                color: "black",
                width: "466px",
                height: "44px",
                backgroundColor: "rgba(196, 196, 196, 0.2)",
              }}
              placeholder="Password..."
              type="password"
              visibilityToggle={{ visible: passwordVisible, onVisibleChange: setPasswordVisible }}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" key="submit" htmlType="submit">
              Add
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </Styles>
  );
};

export default AddAccount;