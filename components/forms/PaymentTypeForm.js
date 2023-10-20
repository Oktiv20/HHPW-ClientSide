import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { addPaymentTypeToOrder, getAllPaymentTypes } from '../../api/paymentData';
import { getSingleOrder, updateOrder } from '../../api/orderData';

const initialStateType = {
  paymentTypeId: null,
  Tip: 0,
};

export default function PaymentTypeForm({ orderId }) {
  const [formData, setFormData] = useState(initialStateType);
  const [paymentTypes, setPaymentTypes] = useState([]);
  const router = useRouter();

  useEffect(() => {
    getAllPaymentTypes()
      .then((data) => {
        setPaymentTypes(data);
      })
      .catch((error) => console.error('Error fetching payment types:', error));
    getSingleOrder(orderId).then(setFormData);
  }, []);

  const handlePaymentTypeChange = (e) => {
    setFormData({
      ...formData,
      paymentTypeId: e.target.value,
    });
  };

  const handleTipChange = (e) => {
    setFormData({
      ...formData,
      Tip: parseFloat(e.target.value),
    });
  };

  console.log('FormData:', formData);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (orderId && formData.paymentTypeId !== '') {
      updateOrder(formData).then(() => {
        addPaymentTypeToOrder(formData.orderId, formData.paymentTypeId)
          .then(() => {
            router.push(`/orders/${formData.orderId}`);
          })
          .catch((error) => {
            console.error('There was an error adding the payment:', error);
          });
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="PaymentMethod">
        <Form.Label style={{ color: 'white' }}>Select Payment Method</Form.Label>
        <Form.Control as="select" name="PaymentMethod" value={formData.PaymentMethod} onChange={handlePaymentTypeChange}>
          <option value="">Select a Payment Method</option>
          {paymentTypes.map((type) => (
            <option key={type.paymentTypeId} value={type.paymentTypeId}>
              {type.paymentType}
            </option>
          ))}
        </Form.Control>
      </Form.Group>

      <Form.Group className="mb-3" controlId="Tip">
        <Form.Label>Tip Amount</Form.Label>
        <Form.Control type="number" name="Tip" value={formData.Tip} onChange={handleTipChange} />
      </Form.Group>

      <Button type="submit" variant="primary">
        Confirm Payment
      </Button>
    </Form>
  );
}

PaymentTypeForm.propTypes = {
  orderId: PropTypes.number,
};

PaymentTypeForm.defaultProps = {
  orderId: null,
};
