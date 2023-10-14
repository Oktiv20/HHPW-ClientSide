import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createOrder, updateOrder } from '../../api/orderData';

const initialState = {
  orderName: '',
  customerNumber: '',
  customerEmail: '',
};

export default function OrderForm({ orderObj }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter;
  const { user } = useAuth();

  useEffect(() => {
    if (orderObj.orderId) setFormInput(orderObj);
  }, [orderObj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (orderObj?.orderId) {
      updateOrder(formInput)
        .then(() => router.push(`/orders/${orderObj.orderId}`));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createOrder(payload).then(({ name }) => {
        const patchPayload = { id: name };
        updateOrder(patchPayload).then(() => {
          router.push('/orders');
        });
      });
    }
  };

  return (

    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{orderObj.orderId ? 'Update' : 'Create'} Order</h2>

      {/* TITLE INPUT  */}
      <FloatingLabel controlId="floatingInput1" label="Order Name" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter a Name"
          name="orderName"
          value={formInput.orderName}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput2" label="Customer Phone Number" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter a Phone Number"
          name="customerNumber"
          value={formInput.customerNumber}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput3" label="Customer Email" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter an Email Address"
          name="customerEmail"
          value={formInput.customerEmail}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* SUBMIT BUTTON  */}
      <Button type="submit">{orderObj.orderId ? 'Update' : 'Create'} Order</Button>
    </Form>
  );
}

OrderForm.propTypes = {
  orderObj: PropTypes.shape({
    orderId: PropTypes.number,
    orderName: PropTypes.string,
    customerNumber: PropTypes.string,
    customerEmail: PropTypes.string,
  }),
};

OrderForm.defaultProps = {
  orderObj: initialState,
};
