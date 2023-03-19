import { Link, useLocation, useNavigate } from "react-router-dom";
import "./product.css";
import Chart from "../../components/chart/Chart";
import { Publish, AddCircleOutlineOutlined } from "@mui/icons-material";
import { useEffect, useMemo, useState } from "react";
import {
  useGetProductQuery,
  useUpdateProductMutation,
} from "../../service/api.product";
import { Card, CardHeader, Skeleton } from "@mui/material";
import { useGetOrderIncomeByProductQuery } from "../../service/api.order";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import app from "../../firebase";
import Spinner from "../../components/Spinner";

export default function Product() {
  const location = useLocation();
  const productId = location.pathname.split("/")[2];
  const navigate = useNavigate();
  const [pStats, setPStats] = useState([]);
  const [sale, setSale] = useState(0);
  const [category, setCategory] = useState([]);
  const [color, setColor] = useState([]);
  const [size, setSize] = useState([]);
  const [file, setFile] = useState(null);
  const [inputs, setInputs] = useState({
    title: "",
    desc: "",
    price: "",
    inStock: "",
    img: "",
    categories: [],
    color: [],
    size: [],
  });

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

  const { data, isLoading, isSuccess } = useGetProductQuery(productId, {
    skip: !productId,
  });
  const {
    data: orderIncome,
    isSuccess: orderSuccess,
    isLoading: orderLoading,
  } = useGetOrderIncomeByProductQuery(productId, {
    skip: !productId,
  });
  const [
    updateProduct,
    { isSuccess: updateSuccess, isLoading: updateLoading },
  ] = useUpdateProductMutation();

  const handleCategory = (e) => {
    setCategory(e.target.value.split(","));
  };
  const handleColor = (e) => {
    setColor(e.target.value.split(","));
  };
  const handleSize = (e) => {
    setSize(e.target.value.split(","));
  };
  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    if (file !== null) {
      const fileName = new Date().getTime() + file.name;
      const storage = getStorage(app);
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log("File available at", downloadURL);
            const product = {
              ...inputs,
              id: productId,
              img: downloadURL,
              categories: category,
              color: color,
              size: size,
            };
            updateProduct(product);
          });
        }
      );
    } else {
      const product = {
        ...inputs,
        id: productId,
        categories: category,
        color: color,
        size: size,
      };
      updateProduct(product);
    }
  };

  useEffect(() => {
    if (orderSuccess) {
      const list = orderIncome.sort((a, b) => {
        return a._id - b._id;
      });

      list.map((item) =>
        setPStats((prev) => [
          ...prev,
          { name: MONTHS[item._id - 1], Sales: item.total },
        ])
      );

      let saleList = [0];
      for (const i of orderIncome) {
        saleList.push(i.total);
      }
      const totalSale = saleList.reduce((total, currentValue) => {
        return total + currentValue;
      });
      setSale((totalSale / data.price).toFixed());

      setCategory(data.categories);
      setColor(data.color);
      setSize(data.size);
      setInputs({
        title: data.title,
        desc: data.desc,
        price: data.price,
        inStock: data.inStock,
        img: data.img,
        categories: category,
        color: color,
        size: size,
      });
    }

    if (updateSuccess) {
      navigate("/products");
    }
  }, [productId, MONTHS, orderSuccess, updateSuccess]);

  return (
    <div className="product" style={{ paddingTop: "40px" }}>
      <div className="productTitleContainer">
        <h1 className="productTitle">Product</h1>
        <Link to="/new-product" style={{ textDecoration: "none" }}>
          <button className="productAddButton">
            <AddCircleOutlineOutlined />
            Create
          </button>
        </Link>
      </div>
      {!isLoading && (
        <>
          <div className="productTop">
            <div className="productTopLeft">
              {orderLoading && (
                <Card sx={{ maxWidth: 345, m: 2 }}>
                  <CardHeader
                    title={
                      <Skeleton
                        animation="wave"
                        height={10}
                        width="60%"
                        style={{ marginBottom: 10 }}
                      />
                    }
                    subheader={
                      <>
                        <Skeleton
                          animation="wave"
                          height={10}
                          width="100%"
                          style={{ marginBottom: 6 }}
                        />
                        <Skeleton
                          animation="wave"
                          height={10}
                          width="100%"
                          style={{ marginBottom: 6 }}
                        />
                      </>
                    }
                  />
                </Card>
              )}
              {!orderLoading && (
                <>
                  <div
                    className="productTopLeftImg"
                    style={{ display: pStats.length === 0 ? "flex" : "none" }}
                  >
                    <img src="/empty-box.png" alt="" />
                    <p>Oop, There are no products for sale yet...</p>
                  </div>
                  <div
                    style={{ display: pStats.length > 0 ? "block" : "none" }}
                  >
                    <Chart
                      data={pStats}
                      dataKey="Sales"
                      title="Sales Performance"
                    />
                  </div>
                </>
              )}
            </div>
            <div className="productTopRight">
              <div className="productInfoTop">
                <img src={data?.img} alt="" className="productInfoImg" />
                <span className="productName">{data?.title}</span>
              </div>
              <div className="productInfoBottom">
                <div className="productInfoItem">
                  <span className="productInfoKey">ID:</span>
                  <span className="productInfoValue">{data?._id}</span>
                </div>
                <div className="productInfoItem">
                  <span className="productInfoKey">Colors:</span>
                  <span className="productInfoValue">
                    {data?.color.map((c, i) => (
                      <span key={i} className={"color color-" + c}></span>
                    ))}
                  </span>
                </div>
                <div className="productInfoItem">
                  <span className="productInfoKey">Sales:</span>
                  <span className="productInfoValue">{sale}</span>
                </div>
                <div className="productInfoItem">
                  <span className="productInfoKey">In stock:</span>
                  <span className="productInfoValue">
                    {data?.inStock ? "Stocking" : "Out Stock"}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="productBottom">
            <form className="productForm">
              <div className="productFormLeft">
                <label>Product Name</label>
                <input
                  name="title"
                  type="text"
                  placeholder={data?.title}
                  onChange={handleChange}
                />
                <label>Product Description</label>
                <input
                  name="desc"
                  type="text"
                  placeholder={data?.desc}
                  onChange={handleChange}
                />
                <label>Price</label>
                <input
                  name="price"
                  type="text"
                  placeholder={data?.price}
                  onChange={handleChange}
                />
                <label>Categories</label>
                <input
                  name="categories"
                  type="text"
                  placeholder={data?.categories.join(", ")}
                  onChange={handleCategory}
                />
                <label>Colors</label>
                <input
                  name="color"
                  type="text"
                  placeholder={data?.color.join(", ")}
                  onChange={handleColor}
                />
                <label>Size</label>
                <input
                  name="size"
                  type="text"
                  placeholder={data?.size.join(", ")}
                  onChange={handleSize}
                />
                <label>In Stock</label>
                <select
                  className="productSelect"
                  name="inStock"
                  id="inStock"
                  onChange={handleChange}
                >
                  <option
                    selected={data?.inStock === true && "selected"}
                    value="true"
                  >
                    Yes
                  </option>
                  <option
                    selected={data?.inStock === false && "selected"}
                    value="false"
                  >
                    No
                  </option>
                </select>
              </div>
              <div className="productFormRight">
                <div className="productUpload">
                  <img src={data?.img} alt="" className="productUploadImg" />
                  <label htmlFor="file">
                    <Publish className="productUpdateIcon" />
                  </label>
                  <input
                    type="file"
                    id="file"
                    name="file"
                    style={{ display: "none" }}
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                  <p className="productUploadFileName">
                    {file !== null ? file.name : ""}
                  </p>
                </div>
                <button
                  onClick={handleUpdate}
                  disabled={updateLoading}
                  className="productButton"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </>
      )}
      {isLoading && <Spinner />}
    </div>
  );
}
