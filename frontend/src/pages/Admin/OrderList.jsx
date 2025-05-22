import React from "react";
import { Link } from "react-router-dom";
import { Table, Button } from "react-bootstrap";
import { useGetOrdersQuery } from "../../redux/ordersApiSlice";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { toast } from "react-toastify";
import { FaTimes, FaCheck } from "react-icons/fa";

const OrderList = () => {
  const { data: orders, isLoading, error } = useGetOrdersQuery();

  return (
    <>
      <h1>Orders</h1>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <Table striped hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>USER</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>PAID ON</th>
              <th>DELIVERED</th>
              <th>DELIVERED ON</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user && order.user.name}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>{order.totalPrice}</td>
                <td>
                  {order.isPaid ? (
                    <FaCheck color="green" />
                  ) : (
                    <FaTimes color="red" />
                  )}
                </td>
                <td>
                  {order.isPaid ? (
                    order.paidAt.substring(0, 10)
                  ) : (
                    <FaTimes color="red" />
                  )}
                </td>
                <td>
                  {order.isDelivered ? (
                    <FaCheck color="green" />
                  ) : (
                    <FaTimes color="red" />
                  )}
                </td>
                <td>
                  {order.deliveredAt ? (
                    order.deliveredAt.substring(0, 10)
                  ) : (
                    <FaTimes color="red" />
                  )}
                </td>

                <td>
                  <Link to={`/order/${order._id}`}>
                    <Button variant="light" className="btn-sm">
                      Details
                    </Button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default OrderList;
