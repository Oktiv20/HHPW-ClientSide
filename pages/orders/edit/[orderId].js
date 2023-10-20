import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getSingleOrder } from '../../../api/orderData';
import OrderForm from '../../../components/forms/CreateOrderForm';

export default function EditOrder() {
  const [editOrder, setEditOrder] = useState({});
  const router = useRouter();
  const { orderId } = router.query;

  useEffect(() => {
    if (orderId) {
      getSingleOrder(orderId).then(setEditOrder);
    }
  }, [orderId]);

  return (
    <div>
      <OrderForm orderObj={editOrder} />
    </div>
  );
}
