import React, { useEffect, useState } from "react";
import { Modal, Skeleton, Tooltip, Table } from "antd";
import styled from "styled-components";
import { Column } from '@ant-design/charts';

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
const CustomerInfoModal = (props) => {

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name"
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address"
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age"
    },
    {
      title: "Date of Birth",
      dataIndex: "dob",
      key: "dob",
      render: (txt) => <>{(txt && new Date(txt).toUTCString())}</>
    }
  ];

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <Styles>
      <Tooltip placement='top' title={`Medication History`}>
        <span style={{ color: '#1890FF' }} onClick={showModal}>View Customer Information</span>
      </Tooltip>
      <Modal
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        wrapClassName="modal-forgot-password"
        width={props.children.length > 0 ? 700 : 400}
      >
        {loading
          ? (<Skeleton active />)
          : (
            <>
              {props.children.length > 0
                ? <Table columns={columns} dataSource={props.children} />
                : <>
                  <p>There is No Customer Information
                  </p>
                </>}
            </>
          )}
      </Modal>
    </Styles>
  );
};

export default CustomerInfoModal;
