import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import { getSingleOrder } from '../../api/orderData';
import MenuItemCard from '../../components/MenuItemCard';

export default function OrderDetails() {
  const router = useRouter();
  const { orderId } = router.query;
  const [orderDetails, setOrderDetails] = useState({ menuItems: [] });
  const [totalCost, setTotalCost] = useState(0);

  useEffect(() => {
    getSingleOrder(orderId).then((data) => {
      setOrderDetails(data);
    });
  }, [orderId]);

  useEffect(() => {
    const total = orderDetails.menuItems.reduce(
      (acc, menuItem) => acc + menuItem.price,
      0,
    );
    setTotalCost(total);
  }, [orderDetails.menuItems]);

  const totalAmount = totalCost + orderDetails.Tip;
  console.log('OrderDetails:', orderDetails);

  return (
    <>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      />
      <h1 style={{ color: 'white' }}>Order Details</h1>
      <h2 style={{ color: 'white' }}>Total Cost: ${totalAmount.toFixed(2)}</h2>
      <MenuItemCard menuItems={orderDetails.menuItems} />
      <Button variant="success" onClick={() => router.push(`/menuItems?orderId=${orderDetails.orderId}`)}>Add Item</Button>
      <Link passHref href={`/paymentType?orderId=${orderId}`}>
        <Button variant="info">Go To Payment</Button>
      </Link>
    </>
  );
}
