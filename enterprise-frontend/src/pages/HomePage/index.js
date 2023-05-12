import { React, useEffect, useState } from "react";
import { Divider, Card, Skeleton, Typography } from "antd";


import { useHistory } from 'react-router-dom'

import { getCurrentUser } from "./../../services/auth";
import { getTotalNumberOfSales } from "../../services/saleService";
import { getTotalNumberOfMedicines } from "../../services/inventoryService";
import { getTotalNumberOfCustomers } from "../../services/customerService";

const HomePage = (props) => {
  const [sales, setSales] = useState(0)
  const [medicines, setMedicines] = useState(0)
  const [customers, setCustomers] = useState(0)
  const [loading, setLoading] = useState(false)

  const history = useHistory();
  const { Paragraph, Text } = Typography;


  useEffect(() => {
    if (!getCurrentUser()) { return window.location = '/' }
    getAllData();
  }, []);

  const getAllData = async () => {
    setLoading(true)
    const { data: totalNoOfSales } = await getTotalNumberOfSales();
    const { data: totalMedicines } = await getTotalNumberOfMedicines();
    const { data: totalCustomers } = await getTotalNumberOfCustomers();

    setSales(totalNoOfSales.data);
    setMedicines(totalMedicines.data)
    setCustomers(totalCustomers.data)

    setLoading(false)
  }

  const handleSalesClicked = () => { history.push('/dashboard/sales') };
  const handleInventoryClicked = () => { history.push('/dashboard/medicines') };
  const handleCustomersClicked = () => { history.push('/dashboard/customers') };


  const gridStyle = {
    width: '25%',
    textAlign: 'center',
    backgroundColor: '#fafafa',
    cursor: 'pointer'
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ fontSize: "20px", margin: "0 0 25px 0" }}>Home</h1>
      <Paragraph style={{ lineHeight: 1.6 }}>
        <Text>
          PharmaZeal is a software company that specialises in providing innovative solutions to streamline operations for pharmacies and medical stores
          in the United Kingdom. It provides following features.
        </Text>
      </Paragraph>
      <div style={{ marginTop: '20px' }}>
        <h1>How Risk Management is Implemented</h1>
        <Paragraph style={{ lineHeight: 1.6 }}>
          <Text>
            <ul style={{ padding: '20px' }}>
              <li>
                when a customer requests a Medicine product that requires a date of birth check,
                the application must flag the request and alert the counter staff.
                This is done via Clicking <strong>Complete Order</strong> button on Sales page. It will ask if the ID Verification is
                done for this customer, if YES, the Sale is processed and completed.
                If the customer's age is less than 18, after clicking <strong>Complete Order</strong> button, and ID Verification prompt, you will
                be asked again that <strong>This customer is under 18. Are you sure it's ID is checked?</strong>, and If Admin is sure, then that
                medicine is handed over to the customer.
              </li>
              <li>
                Additionally, if the stock of a particular medicine falls below 10 units, there will be an alert showing on <strong>Inventory</strong> and <strong>Sales</strong>
                Page incidicating that the Stock is lower for that specific medicine and will show a dialog box to show the details.
              </li>
            </ul>
          </Text>
        </Paragraph>
      </div>
      {loading
        ? (<Skeleton active />)
        : (
          <>
            <div
              style={{
                width: "100%",
                marginBottom: 24,
                display: "flex",
                justifyContent: "space-around",
              }}
            >

            </div>
            <Divider />
            <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
              <Card.Grid style={gridStyle} onClick={handleSalesClicked}
              >
                Sales Management <br></br> <br></br>
                <em style={{ fontSize: '12px' }}>Total Sales</em> <strong>{sales}</strong>
              </Card.Grid>
              <Card.Grid style={gridStyle} onClick={handleInventoryClicked}
              >
                Inventory Management <br></br> <br></br>
                <em style={{ fontSize: '12px' }}>Total Inventory</em>  <strong>{medicines}</strong>
              </Card.Grid>
              <Card.Grid style={gridStyle} onClick={handleCustomersClicked}
              >
                Customer Management <br></br> <br></br>
                <em style={{ fontSize: '12px' }}>Total Customers</em>   <strong>{customers}</strong>
              </Card.Grid>
            </div>
          </>
        )}
    </div>
  );
};

export default HomePage;
