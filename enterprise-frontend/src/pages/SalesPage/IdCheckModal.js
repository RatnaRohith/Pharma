import { ExclamationCircleFilled, InfoCircleOutlined } from '@ant-design/icons';
import { Button, Modal, Space } from 'antd';
import { useEffect } from 'react';
import { processSaleAfterIDCheck } from '../../services/saleService';

const { confirm } = Modal;

const IDCheckModal = ({ handleUnder17Sale, row }) => {

  const showPromiseConfirm = () => {
    confirm({
      title: "This customer is under 18. Are you sure the ID is checked?",
      icon: <ExclamationCircleFilled />,
      content: 'Customers who are under 18 need to verify their ID in order to purchase the medicine.',
      onOk() {
        handleUnder17Sale(row);
      },
      onCancel() { },
    });
  };

  return (
    <Space wrap>
      <Button onClick={showPromiseConfirm} icon={<InfoCircleOutlined />} danger type='dashed'>Complete Order? (under 18)</Button>
    </Space>
  )
};
export default IDCheckModal;