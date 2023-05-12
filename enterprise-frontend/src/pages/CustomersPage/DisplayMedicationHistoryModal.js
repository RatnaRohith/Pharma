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
const DisplayMedicationHistory = (props) => {

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log(props)
  }, []);


  const columns = [
    {
      title: "Dosage",
      dataIndex: "dosage",
      key: "dosage"
    },
    {
      title: "Medicine",
      dataIndex: "medicine",
      key: "medicine"
    },
    {
      title: "Start date",
      dataIndex: "start_date",
      key: "start_date",
      render: (txt) => <>{new Date(txt.toString()).toUTCString()}</>
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
      <Tooltip placement='top' title={`Medication History`}>
        <span style={{ color: '#1890FF' }} onClick={showModal}>View Medication History</span>
      </Tooltip>
      <Modal
        destroyOnClose={true}
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
                  <p>There is No Medication History
                  </p>
                </>}
            </>
          )}
      </Modal>
    </Styles>
  );
};

export default DisplayMedicationHistory;
