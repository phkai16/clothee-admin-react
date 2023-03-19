import { createSlice } from "@reduxjs/toolkit";
import { endpoints } from "../service/api.user";
// import { endpoints } from "../service/api.user";

const userSlice = createSlice({
  name: "user",
  initialState: {
    id: "",
    username: "",
    email: "",
    img: "",
    fullname: "",
    birthday: "",
    gender: "",
    address: "",
    phone: "",
    isAdmin: false,
    token: "",
  },
  reducers: {
    setAccount: (state, action) => {
      state.token = action.payload.accessToken;

      state.id = action.payload._id;
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.img = action.payload.img;
      state.fullname = action.payload.fullname;
      state.birthday = action.payload.birthday;
      state.gender = action.payload.gender;
      state.address = action.payload.address;
      state.phone = action.payload.phone;
      state.isAdmin = action.payload.isAdmin;
    },
    clearAccount: (state) => {
      state.token = null;

      state.id = null;
      state.username = null;
      state.email = null;
      state.img = null;
      state.fullname = null;
      state.birthday = null;
      state.gender = null;
      state.address = null;
      state.phone = null;
      state.isAdmin = null;
      localStorage.removeItem("token");
    },
  },
  // extraReducers: (builder) => {
  //   builder.addMatcher(endpoints.login.matchFulfilled, (state, { payload }) => {
  //     state.token = payload.accessToken;
  //     state.id = payload._id;
  //     state.username = payload.username;
  //     state.email = payload.email;
  //     state.img = payload.img;
  //     state.fullname = payload.fullname;
  //     state.birthday = payload.birthday;
  //     state.gender = payload.gender;
  //     state.address = payload.address;
  //     state.phone = payload.phone;
  //     state.isAdmin = payload.isAdmin;
  //   });
  // },
});
const userReducer = userSlice.reducer;
export const { setAccount, clearAccount } = userSlice.actions;
export default userReducer;
