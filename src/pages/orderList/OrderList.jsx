import "./orderList.css";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";

import Spinner from "../../components/Spinner";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import {
  useDeleteOrderMutation,
  useGetAllOrdersQuery,
} from "../../service/api.order";
import { useGetAllUsersQuery } from "../../service/api.user";
import { format } from "timeago.js";
import { useState } from "react";

export default function OrderList() {
  const { data, isLoading } = useGetAllOrdersQuery();
  const { data: userList, userLoading } = useGetAllUsersQuery();
  const [deleteOrder, { isLoading: deleteLoading }] = useDeleteOrderMutation();
  const handleDelete = (id) => {
    deleteOrder(id);
  };
  console.log(data);

  const columns = [
    {
      field: "_id",
      headerName: "ID",
      width: 80,
      renderCell: (params) => {
        return <span>{data.indexOf(params.row) + 1}</span>;
      },
    },
    {
      field: "userId",
      headerName: "Customer",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="orderListItem">
            {userList?.map((user) => {
              if (user._id === params.row.userId) {
                return (
                  <span key={params.row.userId} className="widgetLgName">
                    {user.username}
                  </span>
                );
              } else {
                <span key={params.row.userId} className="widgetLgName">
                  Customer
                </span>;
              }
            })}
          </div>
        );
      },
    },
    {
      field: "amount",
      headerName: "Amount",
      width: 150,
      renderCell: (params) => {
        return <span>{"$" + params.value}</span>;
      },
    },
    {
      field: "createdAt",
      headerName: "Created",
      width: 160,
      renderCell: (params) => {
        return <span>{format(params.row.createdAt)}</span>;
      },
    },
    {
      field: "address",
      headerName: "Address",
      width: 160,
    },
    {
      field: "status",
      headerName: "Status",
      width: 150,
      renderCell: (params) => {
        if (params.value === "declined") {
          return <span className="orderListDeclined">declined</span>;
        } else if (params.value === "approved") {
          return <span className="orderListApproved">approved</span>;
        } else {
          return <span className="orderListPending">pending</span>;
        }
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/order/" + params.row._id}>
              <button className="orderListEdit">View</button>
            </Link>
            <button
              className="orderListDelete"
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
    <div className="orderList" style={{ position: "relative" }}>
      <div className="orderListTitleContainer">
        <h1 className="orderListTitle">Order List</h1>
        <Link to="/new-product" style={{ textDecoration: "none" }}>
          <button className="orderListAddButton">
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
