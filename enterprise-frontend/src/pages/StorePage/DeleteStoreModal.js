import {
  Button
} from 'antd';
import { deleteStore } from '../../services/saleService';

import { Popconfirm, message, } from 'antd';

import { ExclamationCircleFilled } from '@ant-design/icons';
import { Modal, Space } from 'antd';
const { confirm } = Modal;

const DeleteStoreModal = ({ id, deleted }) => {

  const handleDelete = async () => {
    await deleteStore(id);
    deleted();
    message.success('Store is deleted')
  }

  const showDeleteConfirm = () => {
    confirm({
      title: 'Are you sure delete this Store?',
      icon: <ExclamationCircleFilled />,
      content: 'The Store will be deleted & all Inventory related to this store will also be deleted.',
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
export default DeleteStoreModal;