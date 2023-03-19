import "./productList.css";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import {
  useDeleteProductMutation,
  useGetAllProductsQuery,
} from "../../service/api.product";
import Spinner from "../../components/Spinner";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";

export default function ProductList() {
  const { data, isLoading } = useGetAllProductsQuery();
  const [deleteProduct, { isLoading: deleteLoading }] =
    useDeleteProductMutation();

  const handleDelete = (id) => {
    deleteProduct(id);
  };

  const columns = [
    {
      field: "_id",
      headerName: "ID",
      width: 100,
      renderCell: (params) => {
        return <span>{data.indexOf(params.row) + 1}</span>;
      },
    },
    {
      field: "product",
      headerName: "Product",
      width: 220,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img className="productListImg" src={params.row.img} alt="" />
            {params.row.title}
          </div>
        );
      },
    },
    {
      field: "inStock",
      headerName: "Stock",
      width: 200,
      renderCell: (params) => {
        return (
          <span
            className={
              params.value === true
                ? "productListStocking"
                : "productListOutStock"
            }
          >
            {params.value === true ? "Stocking" : "Out Stock"}
          </span>
        );
      },
    },

    {
      field: "price",
      headerName: "Price",
      width: 160,
      renderCell: (params) => {
        return <span>{"$" + params.value}</span>;
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/product/" + params.row._id}>
              <button className="productListEdit">Edit</button>
            </Link>
            <button
              className="productListDelete"
              disabled={deleteLoading}
              onClick={() => handleDelete(params.row._id)}
            >
              Delete
            </button>
          </>
        );
      },
    },
  ];

  return (
    <div className="productList" style={{ position: "relative" }}>
      <div className="productListTitleContainer">
        <h1 className="productListTitle">Product List</h1>
        <Link to="/new-product" style={{ textDecoration: "none" }}>
          <button className="productListAddButton">
            <AddCircleOutlineOutlinedIcon />
            Create
          </button>
        </Link>
      </div>
      {!isLoading && (
        <DataGrid
          rows={data}
          getRowId={(row) => row._id}
          disableSelectionOnClick
          columns={columns}
          pageSize={8}
          checkboxSelection
        />
      )}
      {isLoading && <Spinner />}
      {deleteLoading && <Spinner />}
    </div>
  );
}
