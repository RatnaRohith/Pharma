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
const MedicalInfoModal = (props) => {

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name"
    },
    {
      title: "Store",
      dataIndex: "store",
      key: "store"
    },
    {
      title: "Quantity Left",
      dataIndex: "quantity",
      key: "quantity"
    },
  ];

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <Styles>
      <Tooltip placement='top' title={`Medicine`}>
        <span style={{ color: '#1890FF' }} onClick={showModal}>View Medicine</span>
      </Tooltip>
      <Modal
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}

        wrapClassName="modal-forgot-password"
        width={700}
      >
        {loading
          ? (<Skeleton active />)
          : (
            <>
              {props.medicine && props.medicine.length > 0
                ? <Table columns={columns} dataSource={props.medicine} />
                : <>
                  <p>There is No Medicine History
                  </p>
                </>}
            </>
          )}
      </Modal>
    </Styles>
  );
};

export default MedicalInfoModal;
