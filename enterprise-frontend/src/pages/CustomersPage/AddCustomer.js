import React, { useState, useEffect } from "react";
import { Modal, Button, Input, Form, message, Select } from "antd";
import styled from "styled-components";
import { addCustomer } from "../../services/customerService";

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
const AddCustomer = ({ added, allergies, medicalConditions }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
  }, [isModalVisible]);


  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onFinish = async (values) => {
    try {
      const { data } = await addCustomer(values)
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
        Add Customer
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
            label="Enter Address"
            name="address"
            rules={[{ required: true, message: "Address is required" }]}
          >
            <Input
              type="text"
              style={{
                color: "black",
                width: "466px",
                height: "44px",
                backgroundColor: "rgba(196, 196, 196, 0.2)",
              }}
              placeholder="Enter Address..."
            />
          </Form.Item>
          <Form.Item
            label="Enter Age"
            name="age"
            rules={[{ required: true, message: "Age is required" }]}
          >
            <Input
              style={{
                color: "black",
                width: "466px",
                height: "44px",
                backgroundColor: "rgba(196, 196, 196, 0.2)",
              }}
              placeholder="Age..."
              type="text"
            />
          </Form.Item>

          <Form.Item
            label="Enter Date of Birth"
            name="dob"
            rules={[{ required: true, message: "DOB is required" }]}
          >
            <Input
              style={{
                color: "black",
                width: "466px",
                height: "44px",
                backgroundColor: "rgba(196, 196, 196, 0.2)",
              }}
              placeholder="Date of Birth..."
              type="date"
            />
          </Form.Item>

          {allergies && allergies.length > 0 && (
            <Form.Item
              label="Enter Allergies"
              name="allergies"
              rules={[{ required: true, message: "Allergies is required" }]}
            >
              <Select
                mode="multiple"
                placeholder="Select allergies"
                value={[allergies[0]]}
                // onChange={setSelectedAllergyItems}
                style={{
                  width: '100%',
                }}
                options={allergies.map((item) => ({
                  value: item,
                  label: item,
                }))}
              />
            </Form.Item>
          )}

          {medicalConditions && medicalConditions.length > 0 && (
            <Form.Item
              label="Enter Medical Conditions"
              name="medicalConditions"
              rules={[{ required: true, message: "medicalConditions is required" }]}
            >
              <Select
                mode="multiple"
                placeholder="Select medicalConditions"
                value={[medicalConditions[0]]}
                // onChange={setSelectedAllergyItems}
                style={{
                  width: '100%',
                }}
                options={medicalConditions.map((item) => ({
                  value: item,
                  label: item,
                }))}
              />
            </Form.Item>
          )}

          <Form.Item>
            <Button type="primary" key="submit" htmlType="submit">
              Create
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </Styles>
  );
};

export default AddCustomer;