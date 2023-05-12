import http from './httpService';

export function getAllCustomers() {
    return http.get(
      process.env.REACT_APP_API_URL + '/api/customers',
    );
}


export function addCustomer(customer) {
  return http.post(
    process.env.REACT_APP_API_URL + `/api/customers`, customer
  );
}

export function getCustomer(id) {
  return http.get(
    process.env.REACT_APP_API_URL + `/api/customers/${id}`,
  );
}

export function updateCustomer(id, customer) {
  console.log("customer: ", customer)
  console.log("id: ", id)
  return http.put(
    process.env.REACT_APP_API_URL + `/api/customers/${id}`, customer
  );
}


export function deleteCustomer(id) {
  return http.delete(
    process.env.REACT_APP_API_URL + `/api/customers/${id}`,
  );
}


export function getTotalNumberOfCustomers() {
    return http.get(
      process.env.REACT_APP_API_URL + '/api/customers/get/total-number-of-customers',
    );
}
