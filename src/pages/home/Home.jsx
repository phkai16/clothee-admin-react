import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import "./home.css";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import WidgetLg from "../../components/widgetLg/WidgetLg";
import { useEffect, useMemo, useState } from "react";
import { useGetUserStatisticsQuery } from "../../service/api.user";
import Spinner from "../../components/Spinner";

export default function Home() {
  const [userStats, setUserStats] = useState([]);
  const { data, isLoading, isSuccess } = useGetUserStatisticsQuery();

  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );

  useEffect(() => {
    if (isSuccess) {
      data.map((item) =>
        setUserStats((prev) => [
          ...prev,
          { name: MONTHS[item._id - 1], "Active User": item.total },
        ])
      );
    }
  }, [MONTHS, isSuccess]);

  return (
    <div className="home" style={{ paddingTop: "40px", positions: "relative" }}>
      {!isLoading && (
        <>
          <FeaturedInfo />
          <Chart
            data={userStats}
            title="User Analytics"
            grid
            dataKey="Active User"
          />
          <div className="homeWidgets">
            <WidgetSm />
            <WidgetLg />
          </div>
        </>
      )}
      {isLoading && <Spinner />}
    </div>
  );
}
