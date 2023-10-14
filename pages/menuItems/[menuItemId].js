import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { getSingleMenuItem } from '../../api/menuData';

export default function ViewMenuItem() {
  const [itemDetails, setItemDetails] = useState({});
  const router = useRouter();
  const { menuItemId } = router.query;

  useEffect(() => {
    getSingleMenuItem(menuItemId).then(setItemDetails);
  }, [menuItemId]);

  return (
    <>
      <div style={{
        display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh',
      }}
      >
        <Card className="hoverable-card" style={{ width: '18rem', margin: '10px' }}>
          <Card.Body>
            <div className="text-center">
              <div className="text-black mt-5 details">
                <h2 className="card-title bold">{itemDetails.name}</h2>
                <p className="card-text bold">{itemDetails.description}</p>
                <p className="card-text bold">{itemDetails.price}</p>
              </div>
            </div>
          </Card.Body>
        </Card>
      </div>
    </>
  );
}
