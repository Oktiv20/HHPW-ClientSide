import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getSingleOrder } from '../../api/orderData';
import MenuItemCard from '../../components/MenuItemCard';

export default function OrderDetails() {
  const router = useRouter();
  const { orderId } = router.query;
  const [orderDetails, setOrderDetails] = useState([]);

  useEffect(() => {
    getSingleOrder(orderId).then((data) => {
      setOrderDetails(data);
    });
  }, [orderId]);

  return (
    <>
      <div style={{
        display: 'flex', justifyContent: 'center', alignItems: 'center',
      }}
      >
        <div className="text-center" />
      </div>
      {orderDetails?.menuItems?.map((menuItem) => <MenuItemCard key={menuItem.menuItemId} menuItemObj={menuItem} />)}
    </>
  );
}
