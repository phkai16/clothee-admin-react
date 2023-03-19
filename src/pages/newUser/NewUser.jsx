import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "../../components/Spinner";
import { useRegisterMutation } from "../../service/api.user";
import "./newUser.css";

export default function NewUser() {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
    gender: "male",
  });
  const navigate = useNavigate();

  const [register, { isLoading, isSuccess }] = useRegisterMutation();

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleClick = (e) => {
    e.preventDefault();
    const user = {
      ...inputs,
    };
    register(user);
  };

  useEffect(() => {
    if (isSuccess) {
      navigate("/users");
    }
  }, [isSuccess]);

  return (
    <div className="newUser" style={{ paddingTop: "40px" }}>
      {isLoading && <Spinner />}
      <h1 className="newUserTitle">New User</h1>
      <form className="newUserForm">
        <div className="newUserItem">
          <label>Username</label>
          <input
            type="text"
            placeholder="john"
            name="username"
            onChange={handleChange}
          />
        </div>
        <div className="newUserItem">
          <label>Full Name</label>
          <input
            type="text"
            placeholder="John Smith"
            name="fullname"
            onChange={handleChange}
          />
        </div>
        <div className="newUserItem">
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="john@gmail.com"
            onChange={handleChange}
          />
        </div>
        <div className="newUserItem">
          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="password"
            onChange={handleChange}
          />
        </div>
        <div className="newUserItem">
          <label>Phone</label>
          <input
            type="text"
            name="phone"
            placeholder="+1 123 456 78"
            onChange={handleChange}
          />
        </div>
        <div className="newUserItem">
          <label>Address</label>
          <input
            type="text"
            name="address"
            placeholder="New York"
            onChange={handleChange}
          />
        </div>
        <div className="newUserItem">
          <label>Gender</label>
          <div className="newUserGender" onChange={handleChange}>
            <input
              type="radio"
              name="gender"
              id="male"
              value="male"
              defaultChecked
            />
            <label htmlFor="male">Male</label>
            <input type="radio" name="gender" id="female" value="female" />
            <label htmlFor="female">Female</label>
            <input type="radio" name="gender" id="other" value="other" />
            <label htmlFor="other">Other</label>
          </div>
        </div>
        <div className="newUserItem">
          <label>Role Account</label>
          <select
            name="isAdmin"
            className="newUserSelect"
            onChange={handleChange}
          >
            <option value="false">Client</option>
            <option value="true">Admin</option>
          </select>
        </div>
        <div className="newUserItem">
          <button
            className="newUserButton"
            onClick={handleClick}
            disabled={isLoading}
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
}
