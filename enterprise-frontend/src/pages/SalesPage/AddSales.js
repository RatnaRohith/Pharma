import React, { useState } from 'react';
import { Modal, Button, Input, Form, message, Select, DatePicker } from 'antd';
import styled from 'styled-components';
import { createInventory } from '../../services/inventoryService'
import { createSale } from '../../services/saleService';

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
const AddSales = ({ stores, customers, medicines, added }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onFinish = async (values) => {
    if (values.quantity <= 0) {
      return;
    }
    var isTrueSet = (values.requiresIdVerification === 'true');
    values.requiresIdVerification = isTrueSet;
    values.quantity = +values.quantity;
    values.price = +values.price;
    values.processed = false;

    try {
      const { data } = await createSale(values)
      setIsModalVisible(false);
      message.success('Sale is successfully added.');
      added();
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        message.error(ex.response.data);
      }
      else if (ex.response && ex.response.status === 500) {
        message.error("Error occured while creating sale.");
      }
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };


  return (
    <Styles>
      <Button
        style={{ marginBottom: '2px' }}
        type="primary"
        onClick={showModal}
      >
        Add Sales
      </Button>
      <Modal
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
            label="Select Customer"
            name="customer"
            rules={[{ required: true, message: 'customer is required' }]}
          >
            <Select
              defaultValue=""
              style={{
                color: 'black',
                width: '466px',
                height: '44px',
              }}
              onChange={handleChange}
              options={customers}
            />
          </Form.Item>
          <Form.Item
            label="Select Medicine"
            name="medicine"
            rules={[{ required: true, message: 'medicine is required' }]}
          >
            <Select
              defaultValue=""
              style={{
                color: 'black',
                width: '466px',
                height: '44px',
              }}
              onChange={handleChange}
              options={medicines}
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
              min={1}
              placeholder="Enter Quantity"
            />
          </Form.Item>
          <Form.Item
            label="Price"
            name="price"
            rules={[{ required: true, message: 'Price is required' }]}
          >
            <Input
              type="number"
              style={{
                color: 'black',
                width: '466px',
                height: '44px',
                backgroundColor: 'rgba(196, 196, 196, 0.2)',
              }}
              placeholder="Enter Price"
              min={1}
            />
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

export default AddSales;
