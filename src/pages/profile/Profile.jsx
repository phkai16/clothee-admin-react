import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  Publish,
} from "@mui/icons-material";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Spinner from "../../components/Spinner";
import app from "../../firebase";
import { useGetUserQuery, useUpdateUserMutation } from "../../service/api.user";
import "./profile.css";

export default function User() {
  const currentUserId = useSelector((state) => state.user.id);
  const currentUser = useSelector((state) => state.user);
  const [file, setFile] = useState(null);
  const [inputs, setInputs] = useState({
    username: currentUser.username,
    email: currentUser.email,
    img: currentUser.img || "",
    fullname: currentUser.fullname || "",
    birthday: currentUser.birthday || "",
    gender: currentUser.gender || "male",
    address: currentUser.address || "",
    phone: currentUser.phone || "",
  });

  console.log(currentUserId);
  const { data, isLoading, isSuccess } = useGetUserQuery(currentUserId, {
    skip: !currentUserId,
  });
  const [updateUser, { isSuccess: updateSuccess, isLoading: updateLoading }] =
    useUpdateUserMutation();

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

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
              id: currentUserId,
              img: downloadURL,
            };
            updateUser(user);
            console.log(user);
          });
        }
      );
    } else {
      const user = {
        ...inputs,
        id: currentUserId,
      };
      updateUser(user);
      console.log(user);
    }
  };

  useEffect(() => {
    console.log(data);
    console.log(isSuccess);
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
      setInputs({
        username: data.username,
        email: data.email,
        img: data.img,
        fullname: data.fullname,
        birthday: data.birthday,
        gender: data.gender,
        address: data.address,
        phone: data.phone,
        isAdmin: data.isAdmin,
      });
    }
  }, [currentUserId, updateSuccess, isSuccess]);

  return (
    <div className="profile" style={{ paddingTop: "40px" }}>
      {!isLoading && (
        <>
          <div className="profileTitleContainer">
            <h1 className="profileTitle">Profile</h1>
          </div>
          <div className="profileContainer">
            <div className="profileShow">
              <div className="profileShowTop">
                <img
                  src={data?.img || "/blank-profile-picture.png"}
                  alt=""
                  className="profileShowImg"
                />
                <div className="profileShowTopTitle">
                  <span className="profileShowUsername">{data?.username}</span>
                  <span className="profileShowUserTitle">{data?.fullname}</span>
                </div>
              </div>
              <div className="profileShowBottom">
                <span className="profileShowTitle">Account Details</span>
                <div className="profileShowInfo">
                  <PermIdentity className="profileShowIcon" />
                  <span className="profileShowInfoTitle">{data?.fullname}</span>
                </div>
                <div className="profileShowInfo">
                  <CalendarToday className="profileShowIcon" />
                  <span className="profileShowInfoTitle">{data?.birthday}</span>
                </div>
                <span className="profileShowTitle">Contact Details</span>
                <div className="profileShowInfo">
                  <PhoneAndroid className="profileShowIcon" />
                  <span className="profileShowInfoTitle">{data?.phone}</span>
                </div>
                <div className="profileShowInfo">
                  <MailOutline className="profileShowIcon" />
                  <span className="profileShowInfoTitle">{data?.email}</span>
                </div>
                <div className="profileShowInfo">
                  <LocationSearching className="profileShowIcon" />
                  <span className="profileShowInfoTitle">{data?.address}</span>
                </div>
              </div>
            </div>
            <div className="profileUpdate">
              <span className="profileUpdateTitle">Edit Account</span>
              <form className="profileUpdateForm">
                <div className="profileUpdateLeft">
                  <div className="profileUpdateItem">
                    <label>Username</label>
                    <input
                      type="text"
                      placeholder={data?.username}
                      className="profileUpdateInput"
                      name="username"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="profileUpdateItem">
                    <label>Full Name</label>
                    <input
                      type="text"
                      placeholder={data?.fullname || "Full name..."}
                      className="profileUpdateInput"
                      name="fullname"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="profileUpdateItem">
                    <label>Email</label>
                    <input
                      type="text"
                      placeholder={data?.email}
                      className="profileUpdateInput"
                      name="email"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="profileUpdateItem">
                    <label>Phone</label>
                    <input
                      type="text"
                      placeholder={data?.phone || "Phone number..."}
                      className="profileUpdateInput"
                      name="phone"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="profileUpdateItem">
                    <label>Address</label>
                    <input
                      type="text"
                      placeholder={data?.address || "Address..."}
                      className="profileUpdateInput"
                      name="address"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="profileUpdateItem">
                    <label>Birthday</label>
                    <input
                      type="text"
                      placeholder={data?.birthday || "yyyy/MM/dd"}
                      className="profileUpdateInput"
                      name="birthday"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="profileUpdateItem">
                    <label>Gender</label>
                    <div
                      className="profileUpdateGender"
                      onChange={handleChange}
                    >
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
                        defaultChecked={
                          data?.gender === "female" ? true : false
                        }
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
                  <div className="profileUpdateItem">
                    <label>Role Account</label>
                    <select
                      name="isAdmin"
                      className="profileUpdateSelect"
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
                <div className="profileUpdateRight">
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
                    className="profileUpdateButton"
                    onClick={handleUpdate}
                    disabled={updateLoading}
                  >
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}

      {isLoading && <Spinner />}
      {updateLoading && <Spinner />}
    </div>
  );
}
