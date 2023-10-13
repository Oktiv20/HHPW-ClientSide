import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import { deleteOrder } from '../api/orderData';

function OrderCard({ orderObj }) {
  const router = useRouter();

  const deleteAOrder = () => {
    if (window.confirm('Delete this Order?')) {
      deleteOrder(orderObj.orderId).then(() => router.push('/orders'));
    }
  };

  return (
    <Card
      className="hoverable-card"
      style={{ width: '18rem', margin: '10px' }}
    >
      <Card.Body>
        <Card.Title style={{ textAlign: 'center', marginBottom: '10px' }}>
          {orderObj.orderName}
        </Card.Title>
        <p className="card-text">Order Status: {orderObj.orderStatus}</p>
        <p className="card-text">Customer Phone Number: {orderObj.customerNumber}</p>
        <p className="card-text">Customer Email Address: {orderObj.customerEmail}</p>
        <p className="card-text">Order Type: {orderObj.orderType}</p>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Button variant="dark" onClick={deleteAOrder}>
            DELETE
          </Button>
          {/* <Button onClick={addToOrder}>Add to Order</Button> */}
        </div>
      </Card.Body>
    </Card>
  );
}

OrderCard.propTypes = {
  orderObj: PropTypes.shape({
    orderId: PropTypes.number,
    orderName: PropTypes.string,
    customerNumber: PropTypes.string,
    customerEmail: PropTypes.string,
    orderStatus: PropTypes.string,
    orderType: PropTypes.string,
  }).isRequired,
};

export default OrderCard;
