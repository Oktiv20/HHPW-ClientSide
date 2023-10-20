import { useRouter } from 'next/router';
import PaymentTypeForm from '../components/forms/PaymentTypeForm';

export default function PaymentPage() {
  const router = useRouter();
  const { orderId } = router.query;

  return <PaymentTypeForm orderId={orderId} />;
}
