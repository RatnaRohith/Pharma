import { deleteCustomer } from '../../services/customerService';

import { message, Button } from 'antd';

import { ExclamationCircleFilled } from '@ant-design/icons';
import { Modal, Space } from 'antd';
const { confirm } = Modal;

const DeleteCustomer = ({ id, deleted }) => {

  const handleDelete = async () => {
    await deleteCustomer(id);
    deleted(id);
    message.success('Customer is deleted')
  }

  const showDeleteConfirm = () => {
    confirm({
      title: 'Are you sure delete this Customer?',
      icon: <ExclamationCircleFilled />,
      content: 'The customer will be deleted permanently.',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        handleDelete();
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };
  return (

    <Space wrap style={{ alignItems: 'unset' }} >
      <Button onClick={showDeleteConfirm} type="danger">
        Delete
      </Button>
    </Space>
  )
};
export default DeleteCustomer;