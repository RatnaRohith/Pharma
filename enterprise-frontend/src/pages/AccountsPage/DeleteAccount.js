import { message, Button } from 'antd';
import { getCurrentUser } from '../../services/auth';
import { deleteUser } from '../../services/userService';

import { ExclamationCircleFilled } from '@ant-design/icons';
import { Modal, Space } from 'antd';
const { confirm } = Modal;

const DisplayDeleteConfirmation = ({ id, deleted }) => {

  const handleDelete = async () => {
    if (getCurrentUser()._id === id) {
      return message.error('User cannot be deleted because it is currently logged-in. SignIn with different account to delete this account.')
    }
    await deleteUser(id);
    deleted(id);
    message.success('User is deleted')
  }

  const showDeleteConfirm = () => {
    confirm({
      title: 'Are you sure delete this Account?',
      icon: <ExclamationCircleFilled />,
      content: 'The customer will be deleted account and will no longer be able to signin.',
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