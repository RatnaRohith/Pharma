import React, { useState, useEffect } from "react";
import { Modal, Button, Input, Form, message } from "antd";
import styled from "styled-components";
import { updateUser, getUser } from '../../services/userService'
import { getCurrentUser } from '../../services/auth';

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
const EditAccount = ({ id, updated }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = React.useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    getTheUser(id);
  });

  const getTheUser = async (id) => {
    const { data: user } = await getUser(id);
    setName(user.name);
    setEmail(user.email);
    setPassword(user.password);
  }

  const onFinish = async (values) => {
    try {
      const { data } = await updateUser(id, values);
      setIsModalVisible(false);
      message.success('User is successfully updated.')
      updated();
    }
    catch (ex) {
      if (ex.response && ex.response.status === 400) {
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
        Edit Account
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
          initialValues={{ remember: false }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Enter name"
            name="name"
            initialValue={name}
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
            initialValue={email}
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
            initialValue={password}
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
              Update
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </Styles>
  );
};

export default EditAccount;