import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

const getAllItems = () => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/api/menuItems`, {
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

const getSingleMenuItem = (menuItemId) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/api/menuItems/${menuItemId}`, {
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

const addItemToOrder = (orderId, menuItemId) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/api/orders/${orderId}/menuItems/${menuItemId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({ orderId, menuItemId }),
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

const editmenuItem = (payload) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/api/menuItems/${payload.menuItemId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(payload),
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

const removeMenuItem = (orderId, menuItemId) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/api/orders/${orderId}/menuItems/${menuItemId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
    .then(async (res) => {
      if (res.ok) {
        resolve();
      }
    })
    .catch(reject);
});

export {
  getAllItems,
  addItemToOrder,
  getSingleMenuItem,
  editmenuItem,
  removeMenuItem,
};
