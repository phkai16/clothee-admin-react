import "./sidebar.css";
import {
  LineStyle,
  PermIdentity,
  Storefront,
  BarChart,
  LogoutRounded,
  AccountCircleRounded,
} from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { clearAccount } from "../../redux/user.slice";

export default function Sidebar() {
  const [selected, setSelected] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = (linkNum) => () => {
    setSelected(linkNum);
  };
  const handleLogOut = () => {
    handleClick(5);
    dispatch(clearAccount());
    navigate("/login");
  };
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <Link to="/" className="link">
              <li
                className={
                  selected === 0 ? "sidebarListItem active" : "sidebarListItem"
                }
                onClick={handleClick(0)}
              >
                <LineStyle className="sidebarIcon" />
                Home
              </li>
            </Link>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Quick Menu</h3>
          <ul className="sidebarList">
            <Link to="/users" className="link">
              <li
                className={
                  selected === 1 ? "sidebarListItem active" : "sidebarListItem"
                }
                onClick={handleClick(1)}
              >
                <PermIdentity className="sidebarIcon" />
                Users
              </li>
            </Link>
            <Link to="/products" className="link">
              <li
                className={
                  selected === 2 ? "sidebarListItem active" : "sidebarListItem"
                }
                onClick={handleClick(2)}
              >
                <Storefront className="sidebarIcon" />
                Products
              </li>
            </Link>
            <Link to="/orders" className="link">
              <li
                className={
                  selected === 3 ? "sidebarListItem active" : "sidebarListItem"
                }
                onClick={handleClick(3)}
              >
                <BarChart className="sidebarIcon" />
                Orders
              </li>
            </Link>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Account</h3>
          <ul className="sidebarList">
            <Link to="/profile" className="link">
              <li
                className={
                  selected === 4 ? "sidebarListItem active" : "sidebarListItem"
                }
                onClick={handleClick(4)}
              >
                <AccountCircleRounded className="sidebarIcon" />
                Profile
              </li>
            </Link>
            <li
              className={
                selected === 5 ? "sidebarListItem active" : "sidebarListItem"
              }
              onClick={() => handleLogOut()}
            >
              <LogoutRounded className="sidebarIcon" />
              Log out
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
