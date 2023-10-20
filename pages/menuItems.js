import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Button, Card, ListGroup } from 'react-bootstrap';
import Link from 'next/link';
import { addItemToOrder, getAllItems } from '../api/menuData';

export default function MenuItems() {
  const [menuItems, setMenuItems] = useState([]);
  const router = useRouter();
  const { orderId } = router.query;

  const getAllTheMenuItems = () => {
    getAllItems().then((data) => {
      setMenuItems(data);
    });
  };

  useEffect(() => {
    getAllTheMenuItems();
  }, []);

  const handleAddToOrder = (menuItemId) => {
    if (window.confirm('Add this item to the order?')) {
      addItemToOrder(orderId, menuItemId).then(() => window.location.reload());
    }
  };

  // console.log('OrderId:', orderId);

  return (
    <>
      <Card className="max-width-card">
        <Card.Body>
          <h1>Select Menu Items to Add</h1>
          <ListGroup>
            {menuItems.map((menuItem) => (
              <Card key={menuItem.menuItemId}>
                <ListGroup.Item>
                  <h4>{menuItem.name}</h4>
                  <p>Price: {menuItem.price}</p>
                  <Button
                    variant="success"
                    onClick={() => handleAddToOrder(menuItem.menuItemId)}
                  >
                    Add to Order
                  </Button>
                </ListGroup.Item>
              </Card>
            ))}
          </ListGroup>
        </Card.Body>
      </Card>
      <Link passHref href={`/orders/${orderId}`}>
        <Button>Done</Button>
      </Link>
    </>
  );
}
