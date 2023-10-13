import React, { useEffect, useState } from 'react';
import { getAllOrders } from '../api/orderData';
import OrderCard from '../components/orderCard';

export default function ViewOrdersPage() {
  const [orders, setOrders] = useState([]);

  const getOrders = () => {
    getAllOrders().then(setOrders);
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <>
      <div className="d-flex flex-row justify-content-center">
        {orders?.map((order) => (
          <div key={order.orderId} style={{ marginRight: '10px' }}>
            <OrderCard orderObj={order} />
          </div>
        ))}
      </div>
    </>
  );
}
