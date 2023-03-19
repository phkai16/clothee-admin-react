// import { publicRequest, userRequest } from "../requestMethods";
// import {
//   addProductFailure,
//   addProductStart,
//   addProductSuccess,
//   deleteProductFailure,
//   deleteProductStart,
//   deleteProductSuccess,
//   getProductFailure,
//   getProductStart,
//   getProductSuccess,
//   updateProductFailure,
//   updateProductStart,
//   updateProductSuccess,
// } from "./productSlice";
// import { loginFailure, loginStart, loginSuccess } from "./user.slice";

// export const login = async (dispatch, user) => {
//   dispatch(loginStart());
//   try {
//     const res = await publicRequest.post("/auth/login", user);
//     dispatch(loginSuccess(res.data));
//   } catch (err) {
//     dispatch(loginFailure());
//   }
// };

// export const getProducts = async (dispatch) => {
//   dispatch(getProductStart());
//   try {
//     const res = await publicRequest.get("/products");
//     dispatch(getProductSuccess(res.data));
//   } catch (err) {
//     dispatch(getProductFailure());
//   }
// };

// export const deleteProduct = async (dispatch, id) => {
//   dispatch(deleteProductStart());
//   try {
//     // ??????????????????????????????
//     const res = await userRequest.delete(`/products/${id}`);
//     dispatch(deleteProductSuccess(res.data));
//     // dispatch(deleteProductSuccess(id));
//   } catch (err) {
//     dispatch(deleteProductFailure());
//   }
// };

// export const updateProduct = async (id, product, dispatch) => {
//   dispatch(updateProductStart());
//   try {
//     // update
//     // dispatch(updateProductSuccess({ id, product }));
//     const res = await userRequest.put(`/products/${id}`, product);
//     dispatch(updateProductSuccess(res.data));
//   } catch (err) {
//     dispatch(updateProductFailure());
//   }
// };
// export const addProduct = async (product, dispatch) => {
//   dispatch(addProductStart());
//   try {
//     const res = await userRequest.post(`/products`, product);
//     dispatch(addProductSuccess(res.data));
//   } catch (err) {
//     dispatch(addProductFailure());
//   }
// };
