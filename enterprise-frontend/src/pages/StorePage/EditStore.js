import React, { useState } from 'react';
import { Modal, Button, Input, Form, message, Select, DatePicker } from 'antd';
import styled from 'styled-components';
import { createStore, updateStore } from '../../services/saleService';

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
const EditStore = ({ id, added, selectedStore }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onFinish = async (values) => {

    try {
      const { data } = await updateStore(id, values)
      setIsModalVisible(false);
      message.success('Store is successfully added.');
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
        Edit Store
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
            label="Name"
            name="name"
            initialValue={selectedStore.name}
            rules={[{ required: true, message: 'name is required' }]}
          >
            <Input
              type="text"
              style={{
                color: 'black',
                width: '466px',
                height: '44px',
                backgroundColor: 'rgba(196, 196, 196, 0.2)',
              }}
              placeholder="Enter Name..."
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

export default EditStore;
