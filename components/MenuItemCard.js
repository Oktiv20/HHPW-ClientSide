import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import {
  Button, Card, Col, ListGroup,
} from 'react-bootstrap';
import { removeMenuItem } from '../api/menuData';

export default function MenuItemCard({ menuItems }) {
  const router = useRouter();
  const { orderId } = router.query;

  const deleteAnItemFromOrder = (menuItemId) => {
    if (window.confirm('Delete this item?')) {
      removeMenuItem(orderId, menuItemId).then(() => window.location.reload());
    }
  };

  return (
    <Col md={6}> {/* Adjust the width with 'md' column size */}
      <Card>
        <ListGroup style={{ backgroundColor: '#303030', borderColor: '#303030' }}>
          {menuItems.map((menuItem) => (
            <Card
              key={menuItem.menuItemId}
              style={{ marginBottom: '60px', backgroundColor: 'black' }}
            >
              <ListGroup.Item>
                <h4 style={{ color: '#333' }}>{menuItem.name}</h4>
                <p style={{ fontWeight: 'bold' }}>Price: {menuItem.price}</p>
                <Button
                  variant="success"
                  style={{ backgroundColor: '#28a745', border: 'none' }}
                  onClick={() => deleteAnItemFromOrder(menuItem.id)}
                >
                  Delete
                </Button>
              </ListGroup.Item>
            </Card>
          ))}
        </ListGroup>
      </Card>
    </Col>
  );
}

MenuItemCard.propTypes = {
  menuItems: PropTypes.arrayOf(
    PropTypes.shape({
      menuItemId: PropTypes.number,
      name: PropTypes.string,
      description: PropTypes.string,
      price: PropTypes.number,
    }),
  ).isRequired,
};
