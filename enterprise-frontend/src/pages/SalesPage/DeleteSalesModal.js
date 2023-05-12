import { Popconfirm, message, Button } from 'antd';
import { deleteSale } from '../../services/saleService';

import { ExclamationCircleFilled } from '@ant-design/icons';
import { Modal, Space } from 'antd';
const { confirm } = Modal;

const DisplayDeleteConfirmation = ({ id, deleted }) => {

  const handleDelete = async () => {
    await deleteSale(id);
    deleted();
    message.success('Sale is deleted')
  }

  const showDeleteConfirm = () => {
    confirm({
      title: 'Are you sure delete this Sale?',
      icon: <ExclamationCircleFilled />,
      content: 'The Sale will be deleted.',
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
export default DisplayDeleteConfirmation;