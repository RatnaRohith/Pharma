import React, { useState } from 'react';
import { Modal, Button, Input, Form, message, Select, DatePicker } from 'antd';
import styled from 'styled-components';
import { createInventory } from '../../services/inventoryService'

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
const AddInventory = ({ stores }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [date, setDate] = useState();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onFinish = async (values) => {
    var isTrueSet = (values.requiresIdVerification === 'true');
    values.requiresIdVerification = isTrueSet;

    const payload = {
      "name": values.name,
      "quantity": values.quantity,
      "expiry_date": date,
      "store": values.store,
      "requiresIdVerification": values.requiresIdVerification
    };
    try {
      const { data } = await createInventory(payload)
      console.log('data: ', data);
      setIsModalVisible(false);
      message.success('Inventory is successfully added.');
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        // toast.error(ex.response.data);
        message.error(ex.response.data);
      }
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  const onChange = (date, dateString) => {
    console.log(date, dateString);
    setDate(dateString);
  };

  return (
    <Styles>
      <Button
        style={{ marginBottom: '30px' }}
        type="primary"
        onClick={showModal}
      >
        Add Inventory
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
            label="Medicine name"
            name="name"
            rules={[{ required: true, message: 'Enter Medicine name' }]}
          >
            <Input
              style={{
                color: 'black',
                width: '466px',
                height: '44px',
                backgroundColor: 'rgba(196, 196, 196, 0.2)',
              }}
              placeholder="Enter Medicine name"
            />
          </Form.Item>

          <Form.Item
            label="Quantity"
            name="quantity"
            rules={[{ required: true, message: 'Quantity is required' }]}
          >
            <Input
              type="number"
              style={{
                color: 'black',
                width: '466px',
                height: '44px',
                backgroundColor: 'rgba(196, 196, 196, 0.2)',
              }}
              placeholder="Enter Quantity"
              min={1}
            />
          </Form.Item>
          <Form.Item
            label="Expiry Date"
            name="expiry_date"
            rules={[{ required: true, message: 'Expiry Date is required' }]}
          >
            <DatePicker onChange={onChange} />
          </Form.Item>
          <Form.Item
            label="Select Store"
            name="store"
            rules={[{ required: true, message: 'store is required' }]}
          >
            <Select
              defaultValue=""
              style={{
                color: 'black',
                width: '466px',
                height: '44px',
              }}
              onChange={handleChange}
              options={stores}
            />
          </Form.Item>

          <Form.Item
            label="ID Verification"
            name="requiresIdVerification"
            rules={[{ required: true, message: 'ID Verification is required' }]}
          >
            <Select
              defaultValue=""
              style={{
                color: 'black',
                width: '466px',
                height: '44px',
              }}
              onChange={() => { console.log("OK") }}
              options={[
                { value: '', label: '', disabled: true },
                { value: 'true', label: 'Yes' },
                { value: 'false', label: 'No' },
              ]}
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" key="submit" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </Styles>
  );
};

export default AddInventory;
