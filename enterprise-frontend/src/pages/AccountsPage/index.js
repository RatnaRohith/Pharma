import { React, useEffect, useState } from "react";
import { Table, Divider, Tooltip, Skeleton } from "antd";
import { getCurrentUser } from "../../services/auth";
import { getAllUsers } from "../../services/userService";
import { SyncOutlined } from "@ant-design/icons";

import AddAccount from "./AddAccount";
import EditAccount from "./EditAccount";
import DisplayDeleteConfirmation from "./DeleteAccount";

const AccountsPage = (props) => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!getCurrentUser()) { return window.location = '/' }

    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true)
    const { data } = await getAllUsers();
    console.log('users: ', data)
    setUsers(data);
    setLoading(false)
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Action",
      dataIndex: "_id",
      key: "action",
      render: (text) => <div style={{ display: 'flex', columnGap: '5px' }}>
        <EditAccount id={text} updated={fetchUsers} />
        <DisplayDeleteConfirmation id={text} deleted={filterUserAfterDeletion} />
      </div>
    },
  ];

  const filterUserAfterDeletion = (id) => {
    const updatedUser = users.filter(user => user._id !== id)
    setUsers(updatedUser)
  }


  return (
    <div style={{ padding: "40px 80px" }}>

      <h1 style={{ fontSize: "25px", margin: "0 0 25px 0", cursor: 'pointer' }} onClick={fetchUsers}>
        <Tooltip placement="right" title="Refresh Account List">
          <SyncOutlined /> Accounts
        </Tooltip>
      </h1>

      <AddAccount added={fetchUsers} />

      {loading ? (
        <Skeleton active />
      ) : (
        <>
          {/* <SearchInput  /> */}
          <Divider />
          <div
            style={{
              width: "100%",
              marginBottom: 24,
              display: "flex",
              justifyContent: "flex-start",
            }}
          >
            {users.length > 0 && <Table columns={columns} dataSource={users} />}
          </div>
        </>
      )}

    </div>
  );
};

export default AccountsPage;
