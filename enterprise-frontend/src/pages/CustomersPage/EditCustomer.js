import React, { useState, useEffect } from "react";
import { Modal, Button, Input, Form, message, Select } from "antd";
import styled from "styled-components";
import { getCustomer, updateCustomer } from '../../services/customerService'
import { getCurrentUser } from '../../services/auth';
// import moment from "moment";

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
const EditCustomer = ({ id, updated, dballergies, dbmedicalConditions }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [age, setAge] = useState("");
  const [dob, setDOB] = useState("");
  const [allergies, setAllergies] = useState([]);
  const [medicalCondition, setMedicalCondition] = useState([]);
  const [medicalHistory, setMedicalHistory] = useState("");

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    console.log("DB: dballergies ", dballergies);
    console.log("DB: dbmedicalConditions ", dbmedicalConditions);
    getTheCustomer(id);
  }, [id, isModalVisible]);

  const getTheCustomer = async (id) => {
    const { data: user } = await getCustomer(id);
    console.log("customer data: ", user);
    setName(user.name);
    setAddress(user.address);
    setAge(user.age);
    setAllergies(user.allergies);
    setMedicalCondition(user.medicalConditions);
  }

  const onFinish = async (values) => {
    console.log("Success:", values);
    try {
      const { data } = await updateCustomer(id, values);
      console.log('data: ', data);
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
        Edit Customer
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
            label="Enter Address"
            name="address"
            initialValue={address}
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
            initialValue={age}
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

          {/* <Form.Item
            label="Enter Date of Birth"
            name="dob"
            initialValue={dob}
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
          </Form.Item> */}

          {allergies && allergies.length > 0 && (
            <Form.Item
              label="Enter Allergies"
              name="allergies"
              rules={[{ required: true, message: "Allergies is required" }]}
            >
              <Select
                mode="multiple"
                placeholder="Select allergies"
                value={allergies}
                defaultValue={allergies}
                // onChange={setSelectedAllergyItems}
                style={{
                  width: '100%',
                }}
                options={dballergies.map((item) => ({
                  value: item,
                  label: item,
                }))}
              />
            </Form.Item>
          )}

          {medicalCondition && medicalCondition.length > 0 && (
            <Form.Item
              label="Enter medicalCondition"
              name="medicalConditions"
              rules={[{ required: true, message: "medicalCondition is required" }]}
            >
              <Select
                mode="multiple"
                placeholder="Select medicalCondition"
                value={medicalCondition}
                defaultValue={medicalCondition}
                // onChange={setSelectedAllergyItems}
                style={{
                  width: '100%',
                }}
                options={dbmedicalConditions.map((item) => ({
                  value: item,
                  label: item,
                }))}
              />
            </Form.Item>
          )}

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

export default EditCustomer;