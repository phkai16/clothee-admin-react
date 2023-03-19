import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  Publish,
  PersonAddAltOutlined,
} from "@mui/icons-material";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Spinner from "../../components/Spinner";
import app from "../../firebase";
import { useGetUserQuery, useUpdateUserMutation } from "../../service/api.user";
import "./user.css";

export default function User() {
  const location = useLocation();
  const userId = location.pathname.split("/")[2];
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    img: "",
    fullname: "",
    birthday: "",
    gender: "",
    address: "",
    phone: "",
    isAdmin: false,
  });

  const { data, isLoading, isSuccess } = useGetUserQuery(userId, {
    skip: !userId,
  });
  const [updateUser, { isSuccess: updateSuccess, isLoading: updateLoading }] =
    useUpdateUserMutation();

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };
  console.log(data);

  const handleUpdate = (e) => {
    e.preventDefault();
    if (file !== null) {
      const fileName = new Date().getTime() + file.name;
      const storage = getStorage(app);
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log("File available at", downloadURL);
            const user = {
              ...inputs,
              id: userId,
              img: downloadURL,
            };
            updateUser(user);
          });
        }
      );
    } else {
      const user = {
        ...inputs,
        id: userId,
      };
      updateUser(user);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      setInputs({
        username: data.username,
        email: data.email,
        img: data.img || "",
        fullname: data.fullname || "",
        birthday: data.birthday || "",
        gender: data.gender || "male",
        address: data.address || "",
        phone: data.phone || "",
      });
    }

    if (updateSuccess) {
      navigate("/users");
    }
  }, [userId, isSuccess, updateSuccess]);

  return (
    <div className="user" style={{ paddingTop: "40px" }}>
      <div className="userTitleContainer">
        <h1 className="userTitle">Edit User</h1>
        <Link to="/new-user" style={{ textDecoration: "none" }}>
          <button className="userListAddButton">
            <PersonAddAltOutlined />
            Create
          </button>
        </Link>
      </div>
      {!isLoading && (
        <div className="userContainer">
          <div className="userShow">
            <div className="userShowTop">
              <img
                src={data?.img || "/blank-profile-picture.png"}
                alt=""
                className="userShowImg"
              />
              <div className="userShowTopTitle">
                <span className="userShowUsername">{data?.username}</span>
                <span className="userShowUserTitle">
                  {data?.fullname || ""}
                </span>
              </div>
            </div>
            <div className="userShowBottom">
              <span className="userShowTitle">Account Details</span>
              <div className="userShowInfo">
                <PermIdentity className="userShowIcon" />
                <span className="userShowInfoTitle">
                  {data?.fullname || ""}
                </span>
              </div>
              <div className="userShowInfo">
                <CalendarToday className="userShowIcon" />
                <span className="userShowInfoTitle">
                  {data?.birthday || ""}
                </span>
              </div>
              <span className="userShowTitle">Contact Details</span>
              <div className="userShowInfo">
                <PhoneAndroid className="userShowIcon" />
                <span className="userShowInfoTitle">{data?.phone || ""}</span>
              </div>
              <div className="userShowInfo">
                <MailOutline className="userShowIcon" />
                <span className="userShowInfoTitle">{data?.email}</span>
              </div>
              <div className="userShowInfo">
                <LocationSearching className="userShowIcon" />
                <span className="userShowInfoTitle">{data?.address || ""}</span>
              </div>
            </div>
          </div>
          <div className="userUpdate">
            <span className="userUpdateTitle">Edit Account</span>
            <form className="userUpdateForm">
              <div className="userUpdateLeft">
                <div className="userUpdateItem">
                  <label>Username</label>
                  <input
                    type="text"
                    placeholder={data?.username}
                    className="userUpdateInput"
                    name="username"
                    onChange={handleChange}
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Full Name</label>
                  <input
                    type="text"
                    placeholder={data?.fullname || "Full name..."}
                    className="userUpdateInput"
                    name="fullname"
                    onChange={handleChange}
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Email</label>
                  <input
                    type="text"
                    placeholder={data?.email}
                    className="userUpdateInput"
                    name="email"
                    onChange={handleChange}
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Phone</label>
                  <input
                    type="text"
                    placeholder={data?.phone || "Phone number..."}
                    className="userUpdateInput"
                    name="phone"
                    onChange={handleChange}
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Address</label>
                  <input
                    type="text"
                    placeholder={data?.address || "Address..."}
                    className="userUpdateInput"
                    name="address"
                    onChange={handleChange}
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Birthday</label>
                  <input
                    type="text"
                    placeholder={data?.birthday || "yyyy/MM/dd"}
                    className="userUpdateInput"
                    name="birthday"
                    onChange={handleChange}
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Gender</label>
                  <div className="userUpdateGender" onChange={handleChange}>
                    <input
                      type="radio"
                      name="gender"
                      id="male"
                      value="male"
                      defaultChecked={
                        data?.gender
                          ? data?.gender === "male"
                            ? true
                            : false
                          : true
                      }
                    />
                    <label htmlFor="male">Male</label>
                    <input
                      type="radio"
                      name="gender"
                      id="female"
                      value="female"
                      defaultChecked={data?.gender === "female" ? true : false}
                    />
                    <label htmlFor="female">Female</label>
                    <input
                      type="radio"
                      name="gender"
                      id="other"
                      value="other"
                      defaultChecked={data?.gender === "other" ? true : false}
                    />
                    <label htmlFor="other">Other</label>
                  </div>
                </div>
                <div className="userUpdateItem">
                  <label>Role Account</label>
                  <select
                    name="isAdmin"
                    className="userUpdateSelect"
                    onChange={handleChange}
                  >
                    <option
                      value="false"
                      selected={data?.isAdmin === false ? true : false}
                    >
                      Client
                    </option>
                    <option
                      value="true"
                      selected={data?.isAdmin === true ? true : false}
                    >
                      Admin
                    </option>
                  </select>
                </div>
              </div>
              <div className="userUpdateRight">
                <div className="productUpload">
                  <img
                    src={data?.img || "/blank-profile-picture.png"}
                    alt=""
                    className="productUploadImg"
                  />
                  <label htmlFor="file">
                    <Publish className="productUpdateIcon" />
                  </label>
                  <input
                    type="file"
                    id="file"
                    name="file"
                    style={{ display: "none" }}
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                  <p className="productUploadFileName">
                    {file !== null ? file.name : "No File Chosen"}
                  </p>
                </div>
                <button
                  className="userUpdateButton"
                  onClick={handleUpdate}
                  disabled={updateLoading}
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {isLoading && <Spinner />}
      {updateLoading && <Spinner />}
    </div>
  );
}
