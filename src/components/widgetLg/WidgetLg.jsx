import { useEffect, useState } from "react";
import "./widgetLg.css";
import { format } from "timeago.js";
import { useGetAllOrdersQuery } from "../../service/api.order";
import { useGetAllUsersQuery } from "../../service/api.user";

export default function WidgetLg() {
  const { data, isSuccess } = useGetAllOrdersQuery();
  const { data: userList, isSuccess: usersSuccess } = useGetAllUsersQuery();
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);

  const Button = ({ type }) => {
    return <button className={"widgetLgButton " + type}>{type}</button>;
  };

  useEffect(() => {
    if (isSuccess) {
      setOrders(data);
    }
    if (usersSuccess) {
      setUsers(userList);
    }
  }, [isSuccess, usersSuccess]);
  return (
    <div className="widgetLg">
      <h3 className="widgetLgTitle">Latest Transactions</h3>
      <table className="widgetLgTable">
        <thead className="widgetLgTr">
          <th className="widgetLgTh">Customer</th>
          <th className="widgetLgTh">Date</th>
          <th className="widgetLgTh">Amount</th>
          <th className="widgetLgTh">Status</th>
        </thead>
        <tbody>
          {orders?.map((order) => (
            <tr className="widgetLgTr" key={order._id}>
              <td className="widgetLgUser">
                {users?.map((user) => {
                  if (user._id === order.userId) {
                    return (
                      <span key={order.userId} className="widgetLgName">
                        {user.username}
                      </span>
                    );
                  } else {
                    <span key={order.userId} className="widgetLgName">
                      Customer
                    </span>;
                  }
                })}
              </td>
              <td className="widgetLgDate">{format(order.createdAt)}</td>
              <td className="widgetLgAmount">${order.amount}</td>
              <td className="widgetLgStatus">
                <Button type={order.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
