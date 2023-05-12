import { message, Button } from 'antd';
import { deleteInventory } from '../../services/inventoryService';

import { ExclamationCircleFilled } from '@ant-design/icons';
import { Modal, Space } from 'antd';
const { confirm } = Modal;

const DeleteInventoryModal = ({ id, deleted }) => {

  const handleDelete = async () => {
    await deleteInventory(id);
    deleted(id);
    message.success('Inventory is deleted')
  }

  const showDeleteConfirm = () => {
    confirm({
      title: 'Are you sure delete this Inventory?',
      icon: <ExclamationCircleFilled />,
      content: 'The inventory will be deleted permanently.',
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
export default DeleteInventoryModal;