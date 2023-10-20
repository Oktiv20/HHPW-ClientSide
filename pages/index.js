import { Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { signOut } from '../utils/auth';
import { useAuth } from '../utils/context/authContext';

function Home() {
  const { user } = useAuth();
  const router = useRouter();

  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center"
      style={{
        height: '90vh',
        padding: '10px',
        maxWidth: '400px',
        margin: '0 auto',
      }}
    >
      <h1 style={{ color: 'white' }}> Welcome, {user.fbUser.displayName}! </h1>
      <br />
      <Button style={{ marginTop: '10px' }} variant="success" type="button" size="lg" className="copy-btn" onClick={() => router.push('/viewOrders')}>
        View Orders
      </Button>
      <br />
      <Button style={{ marginTop: '10px' }} variant="info" type="button" size="lg" className="copy-btn" onClick={() => router.push('/orders/newOrder')}>
        Create an Order
      </Button>
      <br />
      <Button style={{ marginTop: '10px' }} variant="warning" type="button" size="lg" className="copy-btn" onClick={signOut}>
        View Revenue
      </Button>
    </div>
  );
}

export default Home;
