import { React, useEffect, useState } from 'react';
import { Table, Divider, Button, Tooltip, Skeleton } from 'antd';
// import { Res } from "@ant-design/icons";

import SearchInput from './SearchInput';
import DisplayMedicationHistoryModal from './DisplayMedicationHistoryModal';
import AddCustomer from './AddCustomer';
import EditCustomer from './EditCustomer';
import DeleteCustomer from './DeleteCustomer';

import { getAllCustomers } from '../../services/customerService';
import { getAllergies, getMedicalConditions } from '../../services/saleService';
import { getCurrentUser } from '../../services/auth';
import { SyncOutlined } from '@ant-design/icons';

const CustomersPage = (props) => {
  const [customers, setCustomers] = useState([]);
  const [allergies, setAllergies] = useState([]);
  const [medicalConditions, setMedicalConditions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAllCustomer();
    fetchAllergies();
    fetchMedicalConditions();
  }, []);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Date of Birth',
      dataIndex: 'dob',
      key: 'dob',
      render: (text) => <>{new Date(text.toString()).toUTCString()}</>,
    },
    {
      title: 'Allergies',
      dataIndex: 'allergies',
      key: 'allergies',
      render: (text) => showList(text)
    },

    {
      title: 'Medical Conditions',
      dataIndex: 'medicalConditions',
      key: 'medicalConditions',
      render: (text) => showList(text)
    },
    {
      title: 'Medication History',
      dataIndex: 'medicationHistory',
      key: 'medicationHistory',
      render: (text) => <DisplayMedicationHistoryModal>{text}</DisplayMedicationHistoryModal>
    },
    {
      title: 'Action',
      dataIndex: '_id',
      key: 'action',
      render: (text) =>
        <div style={{ display: 'flex', columnGap: '5px' }}>
          <EditCustomer id={text} dballergies={allergies} dbmedicalConditions={medicalConditions} updated={fetchAllCustomer} >{text}</EditCustomer>
          <DeleteCustomer id={text} deleted={filterUserAfterDeletion}>{text}</DeleteCustomer>
        </div>
    },
  ];

  const filterUserAfterDeletion = (id) => {
    const updatedUser = customers.filter(user => user._id !== id)
    setCustomers(updatedUser)
  }

  const showList = (array) => {
    if (array.length > 0) {
      return (
        <>
          <ul>
            {array.map(a => (
              <li key={a}>{a}</li>
            ))}
          </ul>
        </>
      )
    }
    else {
      return (<p>N/A</p>)
    }
  };

  const fetchAllergies = async () => {
    const { data } = await getAllergies();
    setAllergies(data[0].name);
  }

  const fetchMedicalConditions = async () => {
    const { data } = await getMedicalConditions();
    setMedicalConditions(data[0].name);
  }

  const fetchAllCustomer = async () => {
    setLoading(true);
    const { data } = await getAllCustomers();
    setCustomers(data);
    setLoading(false);
  };

  return (
    <div style={{ padding: '10px 80px' }}>
      <h1
        style={{ fontSize: '25px', margin: '0 0 25px 0', cursor: 'pointer' }}
        onClick={fetchAllCustomer}
      >
        <Tooltip placement="right" title="Refresh Customers List">
          <SyncOutlined /> Customers
        </Tooltip>
      </h1>

      {(allergies && allergies.length > 0) && (medicalConditions && medicalConditions.length > 0) && (

        <AddCustomer allergies={allergies} medicalConditions={medicalConditions} added={fetchAllCustomer} />
      )}

      <Divider />
      {loading ? (
        <Skeleton active />
      ) : (
        <>
          <div
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'flex-start',
            }}
          >
            {customers.length > 0 ? (
              <Table columns={columns} dataSource={customers} />
            ) : (
              <>
                <p>There is No Customer</p>
              </>
            )}
          </div>
        </>
      )}
      <Divider />
      {/* {getCurrentUser().role === 'admin' &&
        <FileUpload flight={true} />} */}
    </div>
  );
};

export default CustomersPage;
