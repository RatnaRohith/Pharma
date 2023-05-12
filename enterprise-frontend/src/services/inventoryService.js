import http from './httpService';

export function getAllMedicines() {
  return http.get(
    process.env.REACT_APP_API_URL + '/api/medicines',
  );
}
export function getTotalNumberOfMedicines() {
  return http.get(
    process.env.REACT_APP_API_URL + '/api/medicines/get/get-total-medicines',
  );
}

export function createInventory(body) {
  return http.post(
    process.env.REACT_APP_API_URL + '/api/medicines', {
    body
  }
  );
}
export function updateInventory(id, body) {
  return http.put(
    process.env.REACT_APP_API_URL + `/api/medicines/${id}`, {
    body
  }
  );
}

export function deleteInventory(id) {
  return http.delete(
    process.env.REACT_APP_API_URL + `/api/medicines/${id}`,
  );
}

