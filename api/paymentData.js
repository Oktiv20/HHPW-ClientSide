import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

const getAllPaymentTypes = () => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/api/paymentType`, {
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
        console.log('Data received from API:', data);
        resolve(data);
      }
    })
    .catch(reject);
});

const addPaymentTypeToOrder = (orderId, paymentTypeId) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/api/order/${orderId}/paymentType/${paymentTypeId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({ orderId, paymentTypeId }),
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

export {
  getAllPaymentTypes,
  addPaymentTypeToOrder,
};
