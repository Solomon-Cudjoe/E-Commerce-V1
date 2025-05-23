import React from "react";
import { Link } from "react-router-dom";
import { Table, Button } from "react-bootstrap";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { toast } from "react-toastify";
import { FaTimes, FaCheck, FaEdit, FaTrash } from "react-icons/fa";
import {
  useGetUsersQuery,
  useDeleteUsersMutation,
} from "../../redux/usersApiSlice";

const UsersList = () => {
  const { data: users, isLoading, error, refetch } = useGetUsersQuery();
  const [deleteUser, { isLoading: loadingDelete }] = useDeleteUsersMutation();

  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await deleteUser(id);
        toast.success("User deleted successfully");
        refetch();
      } catch (error) {
        toast.error(error?.data?.message || error.error);
      }
    }
  };

  return (
    <>
      <h1>Users</h1>
      {loadingDelete && <Loader />}

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
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>

              <th></th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>
                  <a href={`mailto: ${user.email}`}> {user.email}</a>
                </td>
                <td>
                  {user.isAdmin ? (
                    <FaCheck color="green" />
                  ) : (
                    <FaTimes color="red" />
                  )}
                </td>

                <td>
                  <Link to={`/admin/user/${user._id}/edit`}>
                    <Button className="btn-sm bg-transparent border-0">
                      <FaEdit color="blue" />
                    </Button>
                  </Link>
                  <Button
                    className="btn-sm bg-transparent border-0"
                    onClick={() => deleteHandler(user._id)}
                  >
                    <FaTrash color="red" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default UsersList;
