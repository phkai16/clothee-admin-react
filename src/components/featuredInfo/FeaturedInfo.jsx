import "./featuredInfo.css";
import {
  ArrowDownward,
  ArrowUpward,
  PaidOutlined,
  ShoppingCartOutlined,
  ReceiptLongOutlined,
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useGetOrderIncomeQuery } from "../../service/api.order";

export default function FeaturedInfo() {
  const [income, setIncome] = useState([]);
  const [perc, setPerc] = useState(0);
  const { data, isLoading, isSuccess } = useGetOrderIncomeQuery();
  console.log(data);
  useEffect(() => {
    if (isSuccess) {
      setIncome(data);
      setPerc((data[1]?.total * 100) / data[0]?.total - 100);
    }
  }, [isSuccess, isLoading]);

  return (
    <div className="featured">
      <div className="featuredItem">
        <div className="featuredTop">
          <span className="featuredTitle">Revenue</span>
          <PaidOutlined
            fontSize="medium"
            className="featuredTopIcon featuredTopIcon-Revenue"
          />
        </div>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">${income[1]?.total}</span>
          <span className="featuredMoneyRate">
            %{Math.floor(perc)}{" "}
            {perc < 0 ? (
              <ArrowDownward className="featuredIcon negative" />
            ) : (
              <ArrowUpward className="featuredIcon" />
            )}
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
      <div className="featuredItem">
        <div className="featuredTop">
          <span className="featuredTitle">Sales</span>
          <ReceiptLongOutlined
            fontSize="medium"
            className="featuredTopIcon featuredTopIcon-Sale"
          />
        </div>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">$4,415</span>
          <span className="featuredMoneyRate">
            -1.4 <ArrowDownward className="featuredIcon negative" />
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
      <div className="featuredItem">
        <div className="featuredTop">
          <span className="featuredTitle">Orders</span>
          <ShoppingCartOutlined
            fontSize="medium"
            className="featuredTopIcon featuredTopIcon-Order"
          />
        </div>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">$2,225</span>
          <span className="featuredMoneyRate">
            +2.4 <ArrowUpward className="featuredIcon" />
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
    </div>
  );
}
