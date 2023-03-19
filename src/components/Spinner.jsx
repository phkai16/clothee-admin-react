import { CircularProgress } from "@mui/material";
import React from "react";

const Spinner = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        // backgroundColor: "rgb(51 51 51 / 20%)",
      }}
    >
      <CircularProgress />
    </div>
  );
};

export default Spinner;
