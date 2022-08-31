import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";

// components
import InputText from "../../components/inputForm/InputText";
import ButtonSubmit from "../../components/inputForm/Button";
import Header from "../../components/Header";

// reactBootstrap
import { Container, Row, Col, Form } from "react-bootstrap";

import { API } from "../../config/api";
// import { UserContext } from "../../utils/CreateContext";

export default function AddProduct() {
  const navigate = useNavigate();
  const [preview, setPreview] = useState(null);
  const [nameUrl, setNameUrl] = useState();
  const [addProduct, setAddProduct] = useState({
    name: "",
    price: "",
    image: "",
    desc: "",
    stock: "",
  });

  const { name, price, image, desc, stock } = addProduct;

  const handleChange = (e) => {
    setAddProduct({
      ...addProduct,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });

    if (e.target.type === "file") {
      let url = URL.createObjectURL(e.target.files[0]);
      setPreview(url);
      setNameUrl(e.target.name[0]);
    }
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();
      const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

      // Store data with FormData as object
      const formData = new FormData();
      formData.set("image", addProduct.image[0], addProduct.image[0].name);
      formData.set("name", addProduct.name);
      formData.set("price", addProduct.price);
      formData.set("stock", addProduct.stock);
      formData.set("desc", addProduct.desc);

      console.log(formData);
      // Configuration
      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };

      // Insert product data
      await API.post("/product", formData, config);
      // console.log(response);
      alert("berhasil menambahkan product");
      await delay(500);
      // regClose();
      navigate("/income");
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <>
      <Header className="mb-5" />
      <Container fluid className="w-75 mt-5">
        <Row>
          <Col sm={7} className="px-5">
              <h1 className="mb-5" style={{color: "#613D2B"}}>Add Product</h1>
            <Form onSubmit={(e) => handleSubmit.mutate(e)} className="text-center">
              <Form.Control
                  type="text"
                  placeholder="Product Name"
                  value={name}
                  name="name"
                  onChange={handleChange}
                  className="px-3 py-2 mt-3"
                  style={{border: "2px solid #613D2B"}}
                  />
              <Form.Control
                  type="text"
                  placeholder="Stock"
                  value={stock}
                  name="stock"
                  onChange={handleChange}
                  className="px-3 py-2 mt-3"
                  style={{border: "2px solid #613D2B"}}
                />
              <Form.Control
                  type="text"
                  placeholder="Price"
                  value={price}
                  name="price"
                  onChange={handleChange}
                  className="px-3 py-2 mt-3"
                  style={{border: "2px solid #613D2B"}}
                />
              <textarea
                  placeholder="Description Product"
                  value={desc}
                  name="desc"
                  onChange={handleChange}
                  className="px-3 py-2 mt-3"
                  style={{border: "2px solid #613D2B", width: "100%", height: 200, overflow: "auto"}}
                  />
              <Form.Control
                  type="file"
                  name="image"
                  onChange={handleChange}
                  className="px-3 py-2 mt-3"
                  style={{border: "2px solid #613D2B"}}
                />
              <button className="submit mt-4" type="submit"> Add Product</button>
            </Form>
          </Col>
          <Col sm={5} className="text-center">
            {preview && (
              <div>
                <img
                  src={preview}
                  style={{
                    maxWidth: "300px",
                    maxHeight: "400px",
                    objectFit: "cover",
                  }}
                  alt={preview}
                />
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
}
