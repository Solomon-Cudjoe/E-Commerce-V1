import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Table, Button, Row, Col } from "react-bootstrap";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { toast } from "react-toastify";
import { FaTimes, FaEdit, FaTrash } from "react-icons/fa";
import {
  useGetProductsQuery,
  useCreateProductMutation,
  useDeleteProductMutation,
} from "../../redux/productApiSlice";
import Paginate from "../../components/Paginate";

const ProductsList = () => {
  const { pageNumber } = useParams();
  const { data, isLoading, error } = useGetProductsQuery({ pageNumber });
  const [createProduct, { isLoading: loadingCreate, refetch }] =
    useCreateProductMutation();

  const [deleteProduct, { isLoading: loadingDelete }] =
    useDeleteProductMutation();

  const editHandler = (id) => {};

  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteProduct(id);
        toast.success("Product deleted successfully");
        refetch();
      } catch (error) {
        toast.error(error?.data?.message || error.error);
      }
    }
  };

  const createProductHandler = async () => {
    if (window.confirm("Are you sure you want to create a new product?")) {
      try {
        await createProduct();
        toast.success("Product created successfully");
        refetch();
      } catch (error) {
        toast.error(error?.data?.message || error.error);
      }
    }
  };

  return (
    <>
      <Row className="align-items-center">
        <Col>Products</Col>
        <Col className="text-end">
          <Button className="btn-sm m-3" onClick={createProductHandler}>
            <FaEdit /> Create Product
          </Button>
        </Col>
      </Row>

      {loadingCreate && <Loader />}
      {loadingDelete && <Loader />}

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data.products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>

                  <td>
                    <Link to={`/admin/product/${product._id}/edit`}>
                      <Button
                        variant="transparent"
                        className="btn-sm mx-2"
                        onClick={() => editHandler(product._id)}
                      >
                        <FaEdit color="blue" />
                      </Button>
                    </Link>

                    <Button
                      variant="transparent"
                      className="btn-sm mx-2"
                      onClick={() => deleteHandler(product._id)}
                    >
                      <FaTrash color="red" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate
            pages={data.pages}
            page={data.page}
            isAdmin={true}
            isLoading={isLoading}
          />
        </>
      )}
    </>
  );
};

export default ProductsList;
