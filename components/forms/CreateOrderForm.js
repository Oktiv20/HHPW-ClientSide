import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createOrder, updateOrder } from '../../api/orderData';
import { addOrderTypeToOrder, getAllOrderTypes, updateOrderTypeToOrder } from '../../api/orderTypeData';
import { checkUser } from '../../utils/auth';

const initialState = {
  CustomerName: '',
  CustomerNumber: '',
  CustomerEmail: '',
};

export default function OrderForm({ orderObj }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();
  const [, setUserData] = useState([]);
  const [statusType, setStatusType] = useState([]);
  const [selectedTypeId, setSelectedTypeId] = useState('');

  const selectedOrder = orderObj;

  useEffect(() => {
    getAllOrderTypes().then((data) => {
      setStatusType(data);
    });

    checkUser(user.uid).then(setUserData);

    if (selectedOrder?.orderId) {
      const updatedFormData = {
        OrderId: selectedOrder?.orderId,
        CustomerName: selectedOrder?.customerName,
        CustomerEmail: selectedOrder?.customerEmail,
        CustomerNumber: selectedOrder?.customerNumber,
        OrderType: selectedOrder?.orderType,
      };
      setFormInput(updatedFormData);
      const matchingOrderType = statusType.find((type) => type.type === selectedOrder?.orderType);
      if (matchingOrderType) {
        setSelectedTypeId(matchingOrderType.orderTypeId);
      }
      console.log('UpdatedFormData:', updatedFormData);
    }
  }, [user.uid, orderObj, selectedOrder]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (orderObj?.orderId && selectedTypeId) {
      const payload = {
        ...formInput,
        OrderId: orderObj.orderId,
        EmployeeId: 1,
        OrderPlaced: new Date(),
      };
      console.log('Updating order with payload:', payload);
      updateOrder(payload)
        .then((response) => updateOrderTypeToOrder(response.orderId, selectedTypeId))
        .then(() => {
          router.push('/viewOrders');
        })
        .catch((error) => {
          console.error('API Error:', error);
        });
    } else {
      const payload = {
        ...formInput,
        OrderId: orderObj.orderId,
        OrderPlaced: new Date(),
        EmployeeId: 1,
      };
      console.log('Creating new order with payload:', payload);
      createOrder(payload)
        .then((response) => {
          const createdOrderId = response.orderId;
          return addOrderTypeToOrder(createdOrderId, selectedTypeId);
        })
        .then((response) => {
          router.push(`/menuItems?orderId=${response.orderId}`);
        })
        .catch((error) => {
          console.error('API Error:', error);
        });
    }
  };

  return (

    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{orderObj?.orderId ? 'Update' : 'Create'} Order</h2>

      {/* TITLE INPUT  */}
      <FloatingLabel controlId="floatingInput1" label="Order Name" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter a Name"
          name="CustomerName"
          value={formInput.CustomerName}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput2" label="Customer Phone Number" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter a Phone Number"
          name="CustomerNumber"
          value={formInput.CustomerNumber}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput3" label="Customer Email" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter an Email Address"
          name="CustomerEmail"
          value={formInput.CustomerEmail}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <Form.Group className="mb-3" controlId="formGridLevel">
        <Form.Select
          aria-label="OrderType"
          name="selectedTypeId"
          onChange={(e) => {
            handleChange(e);
            setSelectedTypeId(e.target.value);
          }}
          className="mb-3"
          value={selectedTypeId}
        >
          <option value="">Select an order type</option>
          {statusType.map((types) => (
            <option key={types.orderTypeId} value={types.orderTypeId}>
              {types.type}
            </option>
          ))}
        </Form.Select>
      </Form.Group>

      {/* SUBMIT BUTTON  */}
      <Button type="submit">{orderObj.orderId ? 'Update' : 'Create'} Order</Button>
    </Form>
  );
}

OrderForm.propTypes = {
  orderObj: PropTypes.shape({
    orderId: PropTypes.number,
    EmployeeId: PropTypes.number,
    CustomerName: PropTypes.string,
    CustomerNumber: PropTypes.string,
    CustomerEmail: PropTypes.string,
    OrderType: PropTypes.string,
  }),
};

OrderForm.defaultProps = {
  orderObj: initialState,
};
