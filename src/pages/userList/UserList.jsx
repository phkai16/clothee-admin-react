import "./userList.css";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import {
  useDeleteUserMutation,
  useGetAllUsersQuery,
} from "../../service/api.user";
import * as React from "react";
import Spinner from "../../components/Spinner";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";

export default function UserList() {
  const { data, isLoading } = useGetAllUsersQuery();
  const [deleteUser, { isLoading: deleteLoading }] = useDeleteUserMutation();

  const handleDelete = (id) => {
    deleteUser(id);
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
      field: "user",
      headerName: "User",
      width: 250,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            <img
              className="userListImg"
              src={params.row.img || "/blank-profile-picture.png"}
              alt=""
            />
            {params.row.username}
          </div>
        );
      },
    },
    { field: "email", headerName: "Email", width: 250 },
    {
      field: "isAdmin",
      headerName: "Role",
      width: 100,
      renderCell: (params) => {
        return (
          <span className={params.value === true ? "userAdmin" : "userClient"}>
            {params.value === true ? "Admin" : "Client"}
          </span>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/user/" + params.row._id}>
              <button className="userListEdit">Edit</button>
            </Link>
            <button
              className="userListDelete"
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
    <div className="userList" style={{ position: "relative" }}>
      <div className="userListTitleContainer">
        <h1 className="userListTitle">User List</h1>
        <Link to="/new-user" style={{ textDecoration: "none" }}>
          <button className="userListAddButton">
            <PersonAddAltOutlinedIcon />
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
