import { ExclamationCircleFilled } from '@ant-design/icons';
import { Button, Modal, Space } from 'antd';

const { confirm } = Modal;

const VerifiyIdentification = ({ handleProcessSale, row }) => {

  const showPromiseConfirm = () => {
    confirm({
      title: 'Is the ID Verification done for this customer?',
      icon: <ExclamationCircleFilled />,
      content: 'Customers need to verify their ID in order to purchase the medicine.',
      onOk() {
        handleProcessSale(row);
      },
      onCancel() { },
    });
  };

  return (
    <Space wrap>
      <Button onClick={showPromiseConfirm} type='dashed'>Complete Order</Button>
    </Space>
  )
};
export default VerifiyIdentification;