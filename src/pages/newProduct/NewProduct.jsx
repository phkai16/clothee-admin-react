import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./newProduct.css";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";
import { useAddProductMutation } from "../../service/api.product";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import Spinner from "../../components/Spinner";

export default function NewProduct() {
  const [inputs, setInputs] = useState({});
  const [file, setFile] = useState(null);
  const [category, setCategory] = useState([]);
  const [size, setsize] = useState([]);
  const [color, setColor] = useState([]);
  const navigate = useNavigate();

  const [addProduct, { isLoading, isSuccess }] = useAddProductMutation();

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleCategory = (e) => {
    setCategory(e.target.value.split(","));
  };
  const handleColor = (e) => {
    setColor(e.target.value.split(","));
  };
  const handleSize = (e) => {
    setsize(e.target.value.split(","));
  };

  const handleClick = (e) => {
    e.preventDefault();
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
            img: downloadURL,
            categories: category,
            color: color,
            size: size,
          };
          addProduct(product);
        });
      }
    );
  };
  console.log(file);

  useEffect(() => {
    if (isSuccess) {
      navigate("/products");
    }
  }, [isSuccess]);

  return (
    <div className="newProduct" style={{ paddingTop: "40px" }}>
      {isLoading && <Spinner />}
      <h1 className="addProductTitle">New Product</h1>
      <form className="addProductForm">
        <div className="addProductItem">
          <label>Image</label>
          <label htmlFor="file" className="uploadImgLabel">
            Choose Image
            <FileUploadOutlinedIcon fontSize="small" />
          </label>
          <input
            type="file"
            id="file"
            name="file"
            style={{ display: "none" }}
            onChange={(e) => setFile(e.target.files[0])}
          />
          <p className="uploadImgFileName">
            {file !== null ? file.name : "No Image Chosen"}
          </p>
        </div>
        <div className="addProductItem">
          <label>Title</label>
          <input
            name="title"
            type="text"
            placeholder="Cartoon T-Shirt"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Description</label>
          <input
            name="description"
            type="text"
            placeholder="Description..."
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Price</label>
          <input
            name="price"
            type="number"
            placeholder="100"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Categories</label>
          <input
            type="text"
            placeholder="jeans,skirts"
            onChange={handleCategory}
          />
        </div>
        <div className="addProductItem">
          <label>Size</label>
          <input type="text" placeholder="S,M,L" onChange={handleSize} />
        </div>
        <div className="addProductItem">
          <label>Colors</label>
          <input type="text" placeholder="black,white" onChange={handleColor} />
        </div>
        <div className="addProductItem">
          <label>Stock</label>
          <select name="inStock" onChange={handleChange}>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
        <div className="addProductItem">
          <label></label>
          <button
            onClick={handleClick}
            className="addProductButton"
            disabled={isLoading}
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
}
