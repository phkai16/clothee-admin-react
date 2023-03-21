import { createSlice } from "@reduxjs/toolkit";

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
});
const userReducer = userSlice.reducer;
export const { setAccount, clearAccount } = userSlice.actions;
export default userReducer;
