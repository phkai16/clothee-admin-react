import { useLocation, useNavigate } from "react-router-dom";
import "./order.css";
import {
  HighlightOffOutlined,
  CheckCircleOutlineOutlined,
} from "@mui/icons-material";
import { useEffect } from "react";
import {
  useGetOrderQuery,
  useUpdateOrderMutation,
} from "../../service/api.order";
import Spinner from "../../components/Spinner";
import { useGetAllUsersQuery } from "../../service/api.user";
import { format } from "timeago.js";
import { useGetAllProductsQuery } from "../../service/api.product";
export default function Order() {
  const location = useLocation();
  const orderId = location.pathname.split("/")[2];
  const navigate = useNavigate();

  const { data: orderData, isLoading } = useGetOrderQuery(orderId, {
    skip: !orderId,
  });

  const { data: userList, isLoading: userLoading } = useGetAllUsersQuery();

  const { data: productList, isLoading: productLoading } =
    useGetAllProductsQuery();

  const [updateOrder, { isSuccess: updateSuccess, isLoading: updateLoading }] =
    useUpdateOrderMutation();

  const handleUpdate = (status) => {
    updateOrder({ status: status, id: orderId });
    // console.log({ status: status, id: orderId });
  };

  useEffect(() => {
    if (updateSuccess) {
      navigate("/orders");
    }
  }, [orderId, userLoading, isLoading, productLoading, updateSuccess]);

  return (
    <div className="order" style={{ paddingTop: "40px" }}>
      <div className="orderTitleContainer">
        <h1 className="orderTitle">Order Detail</h1>
      </div>
      {!isLoading && (
        <>
          <div className="orderTop">
            <div className="orderTopLeft">
              {!userLoading &&
                userList
                  .filter((user) => {
                    return user._id === orderData.userId;
                  })
                  .map((item) => (
                    <>
                      <div key={item._id}>
                        <div className="orderInfoTop">
                          <img
                            src={item.img || "/blank-profile-picture.png"}
                            alt=""
                            className="orderInfoImg"
                          />
                          <span className="orderName">{item.username}</span>
                        </div>
                        <div className="orderInfoBottom">
                          <div className="orderDetail">
                            <span className="orderInfoKey">Full Name:</span>
                            <span className="orderInfoValue">
                              {item.fullname}
                            </span>
                          </div>
                          <div className="orderDetail">
                            <span className="orderInfoKey">Email:</span>
                            <span className="orderInfoValue">{item.email}</span>
                          </div>
                          <div className="orderDetail">
                            <span className="orderInfoKey">Address:</span>
                            <span className="orderInfoValue">
                              {item.address}
                            </span>
                          </div>
                          <div className="orderDetail">
                            <span className="orderInfoKey">Phone:</span>
                            <span className="orderInfoValue">{item.phone}</span>
                          </div>
                        </div>
                      </div>
                    </>
                  ))}
              {!userLoading && <></>}
            </div>
            <div className="orderTopRight">
              <div className="orderDetail">
                <span className="orderInfoKey">Order ID:</span>
                <span className="orderInfoValue">{orderData._id}</span>
              </div>

              <div className="orderDetail">
                <span className="orderInfoKey">Created:</span>
                <span className="orderInfoValue">
                  {format(orderData.createdAt)}
                </span>
              </div>
              <div className="orderDetail">
                <span className="orderInfoKey">Amount:</span>
                <span className="orderInfoValue">${orderData.amount}</span>
              </div>
              <div className="orderDetail">
                <span className="orderInfoKey">Status:</span>
                <span className={"orderInfoValue-" + orderData.status}>
                  {orderData.status}
                </span>
              </div>

              <div className="orderAction">
                <button
                  className="orderStatusBtn btnDeclined"
                  onClick={() => handleUpdate("declined")}
                  disabled={updateLoading}
                >
                  Declined
                  <HighlightOffOutlined />
                </button>
                <button
                  className="orderStatusBtn btnApproved"
                  onClick={() => handleUpdate("approved")}
                  disabled={updateLoading}
                >
                  Approved
                  <CheckCircleOutlineOutlined />
                </button>
              </div>
            </div>
          </div>
          <div className="orderBottom">
            <div className="orderInfoTop">
              <div className="orderInfoItem">
                <p className="orderProductsTitle">Product List:</p>
              </div>
            </div>
            <div className="orderInfoBottom">
              {orderData.products.map((item) => {
                return (
                  <div className="orderProducts">
                    {!productLoading &&
                      productList.map((product) => {
                        if (product._id === item.productId) {
                          return (
                            <div className="orderProduct" key={item.productId}>
                              <img
                                src={product.img}
                                alt="product-img"
                                className="orderProductImg"
                              />
                              <div className="orderProductInfo">
                                <div className="orderProductField">
                                  <span className="orderProductKey">
                                    Title:
                                  </span>
                                  <span className="orderProductValue">
                                    {product.title}
                                  </span>
                                </div>
                                <div className="orderProductField">
                                  <span className="orderProductKey">
                                    Color:
                                  </span>
                                  <span className="orderProductValue">
                                    {item.color}
                                  </span>
                                </div>
                                <div className="orderProductField">
                                  <span className="orderProductKey">
                                    Price:
                                  </span>
                                  <span className="orderProductValue">
                                    ${product.price}
                                  </span>
                                </div>
                                <div className="orderProductField">
                                  <span className="orderProductKey">
                                    Quantity:
                                  </span>
                                  <span className="orderProductValue">
                                    {item.quantity}
                                  </span>
                                </div>
                              </div>
                            </div>
                          );
                        } else {
                          <div
                            key={item.productId}
                            className="orderInfoItem"
                          ></div>;
                        }
                      })}
                    {productLoading && <></>}
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
      {isLoading && <Spinner />}
      {/* {userLoading && <Spinner />} */}
    </div>
  );
}
