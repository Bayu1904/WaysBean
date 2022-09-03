import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { useParams, useNavigate } from "react-router-dom";
import formatPrice from "../utils/formatPrice";
import { API } from "../config/api";
import { useQuery, useMutation } from "react-query";
import { Coffee } from "../API/DummyAPI";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function Detail() {
  let navigate = useNavigate();
  const { id } = useParams();
  // Product Fetch
  const [product, SetProduct] = useState();
  const findProduct = async () => {
    try {
      let response = await API.get("/product/" + id);
      SetProduct(response.data.data);
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    findProduct();
  }, []);

  // Check Transaction
  const [transaction, setTransaction] = useState();
  const getTrans = async () => {
    try {
      let response = await API.get("/transaction-status");
      setTransaction(response.data.data);
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    getTrans();
  }, []);

  console.log(transaction);

  // Handle for Add to cart
  const handleAddToCart = useMutation(async (e) => {
    try {
      e.preventDefault();

      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      await API.post("/transaction", config);

      const data = {
        product_id: product.id,
        qty: 1,
        sub_amount: product.price,
      };

      const body = JSON.stringify(data);

      await API.post("/cart", body, config);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <div>
      <Header />
      <Container className="w-75 mt-5">
        <Row>
          <Col md={5}>
            <img src={product?.image} alt="" className="w-100" />
          </Col>
          <Col md={7}>
            <h1 style={{ color: "#613D2B" }}>{product?.name}</h1>
            <h5 style={{ color: "#613D2B" }}>Stock : {product?.stock}</h5>

            <Container className="mt-5 text-center">
              <Row
                style={{ textAlign: "justify", height: 390, overflow: "auto" }}
              >
                {product?.desc}
              </Row>
              <Row className="my-3">
                <Col>
                  <h4 style={{ color: "#613D2B" }}>Total</h4>
                </Col>
                <Col>
                  <h4 className="text-start" style={{ color: "#613D2B" }}>
                    {formatPrice(product?.price)}
                  </h4>
                </Col>
              </Row>
              <button
                className="submit"
                type="submit"
                onClick={(e) => handleAddToCart.mutate(e)}
              >
                {" "}
                Add to Cart
              </button>
            </Container>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
