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
  processSaleAfterIDCheck,
} from '../../services/saleService';
import { SyncOutlined } from '@ant-design/icons';
import CustomerInfoModal from './CustomerInfoModal';
import MedicineInfoModal from './MedicineInfoModal';

import { getStores } from '../../services/saleService'

import SearchInput from '../InventoryPage/SearchInput';
import AddSales from './AddSales';
import { getAllMedicines } from '../../services/inventoryService';
import { getAllCustomers } from '../../services/customerService';
import EditSales from './EditSales';
import DeleteSalesModal from './DeleteSalesModal';
import VerifiyIdentification from './VerifyIdentification';
import IDCheckModal from './IdCheckModal';

const SalesPage = (props) => {
  const [sales, setSales] = useState([]);
  const [stores, setStores] = useState([]);
  const [medicines, setMedicines] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [lowquantity, setLowQuantity] = useState();
  const [filteredSales, setFilteredSales] = useState([]);
  const [idCheckModal, setIdCheckModal] = useState(false);

  useEffect(() => {
    fetchSales();
  }, []);

  useEffect(() => {
    checkQuantity();
  }, []);

  const checkQuantity = async () => {
    const { data } = await checkLowQuantity();
    setLowQuantity(data);
  };

  const fetchSales = async () => {
    setLoading(true);
    const { data } = await getAllSales();
    const { data: stores } = await getStores();
    const { data: medicines } = await getAllMedicines();
    const { data: customers } = await getAllCustomers();
    setCustomers(customers);
    setSales(data);

    setMedicines([
      { value: '', label: '', disabled: true },
      ...medicines.map((item) => ({ value: item._id, label: item.name })),
    ])

    setCustomers([
      { value: '', label: '', disabled: true },
      ...customers.map((item) => ({ value: item._id, label: item.name })),
    ])

    setStores(stores.map((obj) => obj.name));
    setFilteredSales(data)
    setLoading(false);
    checkQuantity();
  };

  const columns = [
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
      // render: (text) => <a>{text}</a>,
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Store',
      dataIndex: 'medicine',
      key: 'store',
      render: (text) => <> {(text && text.store) ? <>{text.store}</> : "No Store Information"} </>,
    },
    {
      title: 'Customer',
      dataIndex: 'customer',
      key: 'customer',
      render: (text) => <CustomerInfoModal> {text} </CustomerInfoModal>,
    },
    {
      title: 'Medicine',
      dataIndex: 'medicine',
      key: 'medicine',
      render: (text) => <> {text && (<MedicineInfoModal medicine={[text]} />)} </>,
    },
    {
      title: 'Order Status',
      dataIndex: 'processed',
      key: 'processed',
      render: (text, row, index) => renderProcess(text, row, index),
    },
    {
      title: 'Action',
      dataIndex: '_id',
      key: '_id',
      render: (text) => <div style={{ display: 'flex', columnGap: '5px' }}>
        <EditSales
          id={text}
          selectedSale={sales.find((inv) => inv._id == text)}
          stores={[{ value: '', label: '', disabled: true },
          ...stores.map((item) => ({ value: item, label: item })),
          ]}
          customers={customers}
          medicines={medicines}
          added={fetchSales}
        />
        <DeleteSalesModal id={text} deleted={fetchSales} />
      </div>,
    },
  ];

  const renderProcess = (text, row, index) => {
    if (row.processed) {
      return <Alert message="Order Processed" type="success" showIcon />
    } else {
      return (
        <>
          {(idCheckModal && (row && row.customer && row.customer.age < 18)) ? (
            <IDCheckModal row={row} handleUnder17Sale={handleUnder17Sale} />
          ) : (
            <VerifiyIdentification handleProcessSale={handleProcessSale} row={row} />
          )}
        </>
      );
    }
  };

  const handleUnder17Sale = async (row) => {
    messageApi.open({
      key: 'OK',
      type: 'loading',
      content: 'Loading...',
      duration: 3,
    });

    const { data, status } = await processSaleAfterIDCheck({
      customerId: row.customer._id,
      medicineId: row.medicine._id,
    });
    if (status == 201) {
      setTimeout(async () => {
        messageApi.open({
          key: 'OK',
          type: 'success',
          content: 'Sale processed successfully.',
          duration: 3,
        });

        await fetchSales()
      }, 2000);
    } else if (status == 500) {
      setTimeout(() => {
        messageApi.open({
          key: 'OK',
          type: 'error',
          content: data.message,
          duration: 3,
        });
      }, 2000);
    }

    const { data: sales } = await getAllSales();
    setFilteredSales(sales);
    setIdCheckModal(false);
  };

  const handleProcessSale = async (row) => {

    messageApi.open({
      key: 'OK',
      type: 'loading',
      content: 'Loading...',
      duration: 2,
    });

    const { data, status } = await processSale({
      customerId: row.customer._id,
      medicineId: row.medicine._id,
    });
    if (status == 201) {
      setTimeout(async () => {
        messageApi.open({
          key: 'OK',
          type: 'success',
          content: 'Sale processed successfully.',
          duration: 1,
        });

        await fetchSales()
      }, 500);
    } else if (status == 200) {
      setTimeout(() => {
        messageApi.open({
          key: 'OK',
          type: 'error',
          content: data.message,
          duration: 3,
        });

        setIdCheckModal(true);
      }, 2000);
    }

    const { data: sales } = await getAllSales();
    setFilteredSales(sales);
  };

  const filterByStore = (storename) => {
    setLoading(true);
    if (storename == 'All') {
      setFilteredSales(sales);
    } else {
      const updatedInventory = sales.filter(
        (p) => {
          if (p.medicine != null) {
            return p.medicine.store.toLowerCase() === storename.toLowerCase()
          }
        }
      );
      setFilteredSales(updatedInventory);
    }
    setLoading(false);
  };

  const filterByName = (name) => {
    setLoading(true);
    const updatedInventory = sales.filter(
      (p) => {
        if (p.medicine != null) {
          return p.medicine.name.toLowerCase() === name.toLowerCase()
        }
      }
    );
    setFilteredSales(updatedInventory);
    setLoading(false);
    return updatedInventory;
  };

  return (
    <div style={{ padding: '40px 80px' }}>
      {contextHolder}
      <>
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
      </>

      <h1
        style={{
          fontSize: '25px',
          margin: '0 0 25px 0',
          cursor: 'pointer',
          marginTop: '20px',
        }}
        onClick={fetchSales}
      >
        <Tooltip placement="right" title="Refresh Sales List">
          <SyncOutlined /> Sales
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

      {(stores && stores.length > 0) && (customers && customers.length > 0) && (medicines && medicines.length > 0) && (
        <AddSales
          stores={[{ value: '', label: '', disabled: true },
          ...stores.map((item) => ({ value: item, label: item })),
          ]}
          customers={customers}
          medicines={medicines}
          added={fetchSales}
        />
      )}

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
            {filteredSales.length > 0 ? (
              <Table columns={columns} dataSource={filteredSales} />
            ) : (
              <>
                <p>There are No Sales</p>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default SalesPage;
