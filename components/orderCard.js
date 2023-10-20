import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import Link from 'next/link';
import { deleteOrder } from '../api/orderData';

function OrderCard({ orderObj }) {
  const deleteAOrder = () => {
    if (window.confirm('Delete this Order?')) {
      deleteOrder(orderObj.orderId).then(() => window.location.reload());
    }
  };

  return (
    <Card
      className="hoverable-card"
      style={{ width: '18rem', margin: '10px' }}
    >
      <Card.Body>
        <Card.Title style={{ textAlign: 'center', marginBottom: '10px' }}>
          {orderObj.customerName}
        </Card.Title>
        <p className="card-text">Order Status: {orderObj.orderStatus}</p>
        <p className="card-text">Customer Phone Number: {orderObj.customerNumber}</p>
        <p className="card-text">Customer Email Address: {orderObj.customerEmail}</p>
        <p className="card-text">Order Type: {orderObj.orderType}</p>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Link passHref href={`/orders/${orderObj.orderId}`}>
            <Button variant="none" style={{ color: 'blue' }}>Details</Button>
          </Link>
          <Link passHref href={`/orders/edit/${orderObj.orderId}`}>
            <Button variant="none" style={{ color: 'purple' }}>Edit</Button>
          </Link>
          <Button variant="none" style={{ color: 'red' }} onClick={deleteAOrder}>
            DELETE
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

OrderCard.propTypes = {
  orderObj: PropTypes.shape({
    orderId: PropTypes.number,
    customerName: PropTypes.string,
    customerNumber: PropTypes.string,
    customerEmail: PropTypes.string,
    orderStatus: PropTypes.string,
    orderType: PropTypes.string,
  }).isRequired,
};

export default OrderCard;
