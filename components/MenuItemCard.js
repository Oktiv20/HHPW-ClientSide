import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';

export default function MenuItemCard({ menuItemObj }) {
  const router = useRouter();

  const deleteAnItem = () => {
    if (window.confirm('Delete this item?')) {
      deleteAnItem(menuItemObj.menuItemId).then(() => router.push('/orders'));
    }
  };

  console.log('menu item:', menuItemObj);
  return (
    <Card
      className="hoverable-card"
      style={{ width: '18rem', margin: '10px' }}
    >
      <Card.Body>
        <p className="card-text">Item Name: {menuItemObj.menuItemName}</p>
        <p className="card-text">Description: {menuItemObj.description}</p>
        <p className="card-text">Item Price: {menuItemObj.price}</p>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Button variant="dark" onClick={deleteAnItem}>
            DELETE
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

MenuItemCard.propTypes = {
  menuItemObj: PropTypes.shape({
    menuItemId: PropTypes.number,
    menuItemName: PropTypes.string,
    description: PropTypes.string,
    price: PropTypes.string,
  }).isRequired,
};
