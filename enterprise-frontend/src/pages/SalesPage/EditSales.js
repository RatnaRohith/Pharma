import React, { useState } from 'react';
import { Modal, Button, Input, Form, message, Select, DatePicker } from 'antd';
import styled from 'styled-components';
import { createInventory } from '../../services/inventoryService'
import { createSale, updateSale } from '../../services/saleService';

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
const EditSales = ({ stores, customers, medicines, added, id, selectedSale }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onFinish = async (values) => {
    var isTrueSet = (values.processed === 'true');
    values.processed = isTrueSet;
    values.quantity = +values.quantity;
    values.price = +values.price;


    try {
      await updateSale(id, values)
      setIsModalVisible(false);
      message.success('Sale is successfully added.');
      added();
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        // toast.error(ex.response.data);
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
        style={{ marginBottom: '30px' }}
        type="primary"
        onClick={showModal}
      >
        Edit Sales
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
            initialValue={(selectedSale && selectedSale.customer && selectedSale.customer._id) ? selectedSale.customer._id : ""}
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
            initialValue={(selectedSale && selectedSale.medicine && selectedSale.medicine._id) ? selectedSale.medicine._id : ""}
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
            initialValue={selectedSale.quantity}
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
            label="Price"
            name="price"
            initialValue={selectedSale.price}
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
            initialValue={(selectedSale && selectedSale.medicine && selectedSale.medicine.store) ? selectedSale.medicine.store : ""}
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
            label="Process Sale"
            name="processed"
            initialValue={selectedSale.processed.toString()}
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
              Update
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </Styles>
  );
};

export default EditSales;
