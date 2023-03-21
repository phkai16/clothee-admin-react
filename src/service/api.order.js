import { baseApi } from "./baseApi";
import toast from "react-hot-toast";

const orderApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getOrderIncome: build.query({
      query: () => "orders/income",
      providesTags: ["Order"],
    }),
    getOrderIncomeByProduct: build.query({
      query: (productId) => `orders/income/?pid=${productId}`,
      providesTags: ["Order"],
    }),
    getNewOrders: build.query({
      query: () => "orders/?new=true",
      providesTags: ["Order"],
    }),
    getAllOrders: build.query({
      query: () => "orders",
      providesTags: ["Order"],
    }),
    getOrder: build.query({
      query: (id) => `orders/${id}`,
      providesTags: ["Order"],
    }),
    addOrder: build.mutation({
      query: (body) => ({
        url: "/orders",
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["Order"],
      transformResponse: (response, meta, arg) => {
        toast.success("Order created!");
        return response.data;
      },
      transformErrorResponse: (response, meta, arg) => {
        console.log(response);
        toast.error("Something went wrong...");
        return response.status;
      },
    }),
    updateOrder: build.mutation({
      query: (data) => ({
        url: `orders/${data.id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Order"],
      transformResponse: (response, meta, arg) => {
        toast.success("Order updated!");
        return response.data;
      },
      transformErrorResponse: (response, meta, arg) => {
        console.log(response);
        toast.error("Something went wrong...");
        return response.status;
      },
    }),
    deleteOrder: build.mutation({
      query: (id) => ({
        url: `orders/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Order"],
      transformResponse: (response, meta, arg) => {
        toast.success("Order has been deleted...");
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
  useGetAllOrdersQuery,
  useGetOrderQuery,
  useAddOrderMutation,
  useUpdateOrderMutation,
  useDeleteOrderMutation,
  useGetOrderIncomeQuery,
  useGetOrderIncomeByProductQuery,
  useGetNewOrdersQuery,
  endpoints,
} = orderApi;
