import { React, useEffect, useState } from 'react';
import { Table, Divider, Tooltip, Skeleton, Tag, Alert } from 'antd';
import SearchInput from './SearchInput';
import { getAllMedicines } from '../../services/inventoryService';
import { checkLowQuantity, getStores } from '../../services/saleService';
import { getCurrentUser } from '../../services/auth';
import { SyncOutlined } from '@ant-design/icons';
import AddInventory from './AddInventory';

import MedicineInfoModal from '../SalesPage/MedicineInfoModal';
import EditInventory from './EditInventory';
import DeleteInventoryModal from './DeleteInventory';

const PassangersPage = () => {
  const [invetory, setInventory] = useState([]);
  const [stores, setStores] = useState([]);
  const [filteredInventory, setFilteredInventory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [lowquantity, setLowQuantity] = useState();

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Expiry Date',
      dataIndex: 'expiry_date',
      key: 'expiry_date',
    },
    {
      title: 'Store',
      dataIndex: 'store',
      key: 'store',
    },
    {
      title: 'Requires ID Verification',
      dataIndex: 'requiresIdVerification',
      key: 'requiresIdVerification',
      render: (text) => <> {text.toString()} </>,
    },
    {
      title: 'Action',
      dataIndex: '_id',
      key: '_id',
      render: (text) => (
        <div style={{ display: 'flex', columnGap: '5px' }}>
          <EditInventory
            id={text}
            selectedInventory={invetory.find((inv) => inv._id == text)}
            stores={[
              { value: '', label: '', disabled: true },
              ...stores.map((item) => ({ value: item, label: item })),
            ]}
            updated={fetchAllInventory}
          ></EditInventory>
          <DeleteInventoryModal
            id={text}
            deleted={fetchAllInventory}
          ></DeleteInventoryModal>
        </div>
      ),
    },
  ];

  useEffect(() => {
    fetchAllInventory();
  }, []);

  const fetchAllInventory = async () => {
    setLoading(true);
    const { data } = await getAllMedicines();
    const { data: stores } = await getStores();

    setStores(stores.map((obj) => obj.name));
    setInventory(data);
    setFilteredInventory(data)
    setLoading(false);
    checkQuantity();
  };

  const checkQuantity = async () => {
    const { data } = await checkLowQuantity();
    setLowQuantity(data);
  };

  const filterByStore = (storename) => {

    setLoading(true);
    if (storename == 'All') {
      setFilteredInventory(invetory);
    } else {
      const updatedInventory = invetory.filter(
        (p) => p.store.toLowerCase() == storename.toLowerCase()
      );
      setFilteredInventory(updatedInventory);
    }
    setLoading(false);
  };

  const filterByName = (name) => {
    setLoading(true);

    const updatedInventory = invetory.filter(
      (p) => {
        if (name != '' && p.name.toLowerCase() === name.toLowerCase()) {
          return p;
        }
      }
    );
    setFilteredInventory(updatedInventory);
    setLoading(false);
    return updatedInventory;
  };

  return (
    <div style={{ padding: '30px 50px' }}>
      <div style={{ marginBottom: '20x' }}>
        {lowquantity && lowquantity.data.length > 0 && (
          <Alert
            message="Low Stock Alert"
            showIcon
            description={lowquantity.message}
            type="error"
            action={
              <MedicineInfoModal medicine={lowquantity.data}>
                {' '}
                Open{' '}
              </MedicineInfoModal>
            }
            closable
          />
        )}
      </div>
      <h1
        style={{ fontSize: '25px', margin: '25px 0px', cursor: 'pointer' }}
        onClick={fetchAllInventory}
      >
        <Tooltip placement="right" title="Refresh Inventory List">
          <SyncOutlined /> Inventory
        </Tooltip>
      </h1>
      {stores && stores.length > 0 && (
        <SearchInput
          filterByStore={filterByStore}
          filterByName={filterByName}
          stores={stores}
        />
      )}
      <Divider />

      {stores && stores.length > 0 && (
        <AddInventory
          stores={[
            { value: '', label: '', disabled: true },
            ...stores.map((item) => ({ value: item, label: item })),
          ]}
        />

      )}
      {loading ? (
        <Skeleton active />
      ) : (
        <div
          style={{
            width: '100%',
            marginBottom: 24,
            display: 'flex',
            justifyContent: 'flex-start',
          }}
        >
          {filteredInventory.length > 0 ? (
            <Table
              columns={columns}
              dataSource={filteredInventory}
              key={columns}
            />
          ) : (
            <p>There is No Inventory</p>
          )
            // : (
            //   <>
            //     {' '}
            //     {invetory.length > 0 ? (
            //       <Table columns={columns} dataSource={invetory} />
            //     ) : (
            //       <>
            //         <p>There is No Inventory</p>
            //       </>
            //     )}
            //   </>
            // )
          }
        </div>
      )}
    </div>
  );
};

export default PassangersPage;
