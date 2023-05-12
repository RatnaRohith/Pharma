import { React, useEffect, useState } from 'react';
import {
  Table,
  Divider,
  Tooltip,
  message,
  Skeleton,
  Alert,
  Button,
} from 'antd';
import {
  getAllSales,
  processSale,
  checkLowQuantity,
} from '../../services/saleService';
import { SyncOutlined } from '@ant-design/icons';

import { getStores, createStore } from '../../services/saleService';

import SearchInput from '../InventoryPage/SearchInput';
import { getAllMedicines } from '../../services/inventoryService';
import { getAllCustomers } from '../../services/customerService';
import EditStore from './EditStore';
import DeleteStoreModal from './DeleteStoreModal';
import AddStore from './AddStore';

const StorePage = (props) => {
  const [sales, setSales] = useState([]);
  const [stores, setStores] = useState([]);
  const [medicines, setMedicines] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [lowquantity, setLowQuantity] = useState();
  const [filteredSales, setFilteredSales] = useState([]);

  useEffect(() => {
    fetchStores();
  }, []);

  // useEffect(() => {
  //   checkQuantity();
  // }, []);

  // const checkQuantity = async () => {
  //   const { data } = await checkLowQuantity();
  //   setLowQuantity(data);
  //   console.log('Low quantity: ', data);
  // };

  const fetchStores = async () => {
    setLoading(true);
    const { data } = await getStores();
    console.log('====================================');
    console.log(data);
    console.log('====================================');
    setLoading(false);
    setStores(data);
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      // render: (text) => <a>{text}</a>,
    },
    {
      title: 'Location',
      dataIndex: 'name',
      key: 'name',
      // render: (text) => <a>{text}</a>,
    },
    {
      title: 'Action',
      dataIndex: '_id',
      key: '_id',
      render: (text) => (
        <div style={{ display: 'flex', columnGap: '5px' }}>
          <EditStore
            id={text}
            added={fetchStores}
            selectedStore={stores.find((s) => s._id === text)}
          />
          <DeleteStoreModal id={text} deleted={fetchStores} />
        </div>
      ),
    },
  ];

  return (
    <div style={{ padding: '40px 80px' }}>
      <h1
        style={{
          fontSize: '25px',
          margin: '0 0 25px 0',
          cursor: 'pointer',
          marginTop: '20px',
        }}
        onClick={fetchStores}
      >
        <Tooltip placement="right" title="Refresh Stores List">
          <SyncOutlined /> Stores
        </Tooltip>
      </h1>

      {/* <Divider /> */}

      <AddStore added={fetchStores} />

      {loading ? (
        <Skeleton active />
      ) : (
        <>
          {/* <SearchInput  /> */}
          <Divider />
          <div
            style={{
              width: '100%',
              marginBottom: 24,
              display: 'flex',
              justifyContent: 'flex-start',
            }}
          >
            {stores.length > 0 ? (
              <Table columns={columns} dataSource={stores} />
            ) : (
              <>
                <p>There are No Stores</p>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default StorePage;
