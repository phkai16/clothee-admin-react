import "./widgetSm.css";
import { Visibility } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useGetNewUsersQuery } from "../../service/api.user";
import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Skeleton from "@mui/material/Skeleton";

export default function WidgetSm() {
  const [users, setUsers] = useState([]);
  const { data, isLoading, isSuccess } = useGetNewUsersQuery();
  useEffect(() => {
    if (isSuccess) {
      setUsers(data);
    }
  }, [isSuccess, isLoading]);
  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">New Join Members</span>
      <ul className="widgetSmList">
        {!isLoading &&
          users.map((user) => (
            <li className="widgetSmListItem" key={user._id}>
              <img
                src={user.img || "/blank-profile-picture.png"}
                alt=""
                className="widgetSmImg"
              />
              <div className="widgetSmUser">
                <span className="widgetSmUsername">{user.username}</span>
              </div>
              <button className="widgetSmButton">
                <Visibility className="widgetSmIcon" />
                Display
              </button>
            </li>
          ))}
        {isLoading && (
          <div>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Box sx={{ margin: 1 }}>
                <Skeleton variant="circular">
                  <Avatar />
                </Skeleton>
              </Box>
              <Box sx={{ width: "100%" }}>
                <Skeleton width="100%">
                  <Typography>.</Typography>
                </Skeleton>
              </Box>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Box sx={{ margin: 1 }}>
                <Skeleton variant="circular">
                  <Avatar />
                </Skeleton>
              </Box>
              <Box sx={{ width: "100%" }}>
                <Skeleton width="100%">
                  <Typography>.</Typography>
                </Skeleton>
              </Box>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Box sx={{ margin: 1 }}>
                <Skeleton variant="circular">
                  <Avatar />
                </Skeleton>
              </Box>
              <Box sx={{ width: "100%" }}>
                <Skeleton width="100%">
                  <Typography>.</Typography>
                </Skeleton>
              </Box>
            </Box>
          </div>
        )}
      </ul>
    </div>
  );
}
