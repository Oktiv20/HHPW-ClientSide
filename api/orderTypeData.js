import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

const getAllOrderTypes = () => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/api/orderTypes`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
    .then(async (res) => {
      let data;
      if (res.ok) {
        data = await res.json();
        resolve(data);
      }
    })
    .catch(reject);
});

const addOrderTypeToOrder = (orderId, orderTypeId) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/api/order/${orderId}/orderType/${orderTypeId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({ orderId, orderTypeId }),
  })
    .then(async (res) => {
      if (res.ok) {
        const data = await res.json();
        resolve(data);
      } else {
        reject(new Error('Failed to add item to order.'));
      }
    })
    .catch((error) => {
      reject(error);
    });
});

const updateOrderTypeToOrder = (orderId, orderTypeId) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/api/order/${orderId}/ordertype/${orderTypeId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ orderId, orderTypeId }),
  })
    .then(async (res) => {
      if (res.ok) {
        const data = await res.json();
        resolve(data);
      } else {
        reject(new Error('Failed to add item to order.'));
      }
    })
    .catch((error) => {
      reject(error);
    });
});

export {
  getAllOrderTypes,
  addOrderTypeToOrder,
  updateOrderTypeToOrder,
};
