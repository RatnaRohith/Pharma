import http from './httpService';

export function getAllSales() {
  return http.get(
    process.env.REACT_APP_API_URL + '/api/sales',
  );
}

export function processSale(data) {
  return http.post(
    process.env.REACT_APP_API_URL + '/api/risks/medicines/verify', { data },
  );
}

export function processSaleAfterIDCheck(data) {
  return http.post(
    process.env.REACT_APP_API_URL + '/api/risks/medicines/verify/id-provided', { data },
  );
}

export function createSale(data) {
  return http.post(
    process.env.REACT_APP_API_URL + '/api/sales', { data },
  );
}

export function updateSale(id, data) {
  return http.put(
    process.env.REACT_APP_API_URL + `/api/sales/${id}`, { data },
  );
}

export function deleteSale(id) {
  return http.delete(
    process.env.REACT_APP_API_URL + `/api/sales/${id}`
  );
}

export function getTotalNumberOfSales() {
  return http.get(
    process.env.REACT_APP_API_URL + '/api/sales/get-total-sales'
  );
}

export function checkLowQuantity() {
  return http.get(
    process.env.REACT_APP_API_URL + '/api/risks//medicines/low-stock'
  );
}

export function createStore(store) {
  return http.post(
    process.env.REACT_APP_API_URL + '/api/sales/create-store', { store }
  );
}

export function deleteStore(id) {
  return http.delete(
    process.env.REACT_APP_API_URL + `/api/sales/delete-store/${id}`
  );
}

export function updateStore(id, store) {
  return http.put(
    process.env.REACT_APP_API_URL + `/api/sales/update-store/${id}`, { store }
  );
}

export function getStores() {
  return http.get(
    process.env.REACT_APP_API_URL + '/api/sales/get-stores'
  );
}

export function getAllergies() {
  return http.get(
    process.env.REACT_APP_API_URL + '/api/sales/get-allergies'
  );
}

export function getMedicalConditions() {
  return http.get(
    process.env.REACT_APP_API_URL + '/api/sales/get-medical-conditions'
  );
}
