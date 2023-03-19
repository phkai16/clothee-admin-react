import { baseApi } from "./baseApi";
import toast from "react-hot-toast";

const productApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllProducts: build.query({
      query: () => "products",
      providesTags: ["Product"],
    }),
    getProduct: build.query({
      query: (id) => `products/find/${id}`,
      providesTags: ["Product"],
    }),
    addProduct: build.mutation({
      query: (body) => ({
        url: "/products",
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["Product"],
      transformResponse: (response, meta, arg) => {
        toast.success("Product created!");
        return response.data;
      },
      transformErrorResponse: (response, meta, arg) => {
        console.log(response);
        toast.error("Something went wrong...");
        return response.status;
      },
    }),
    updateProduct: build.mutation({
      query: (data) => ({
        url: `products/${data.id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Product"],
      transformResponse: (response, meta, arg) => {
        toast.success("Product updated!");
        return response.data;
      },
      transformErrorResponse: (response, meta, arg) => {
        console.log(response);
        toast.error("Something went wrong...");
        return response.status;
      },
    }),
    deleteProduct: build.mutation({
      query: (id) => ({
        url: `products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
      transformResponse: (response, meta, arg) => {
        toast.success("Product has been deleted...");
        return response.data;
      },
      transformErrorResponse: (response, meta, arg) => {
        console.log(response);
        toast.error("Something went wrong...");
        return response.status;
      },
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetAllProductsQuery,
  useGetProductQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  endpoints,
} = productApi;
