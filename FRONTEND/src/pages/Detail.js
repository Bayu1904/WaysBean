import React from "react";
import Header from "../components/Header";
import { useParams, useNavigate } from "react-router-dom";
import formatPrice from "../utils/formatPrice";
import { API } from "../config/api";
import { useQuery, useMutation } from "react-query";
import {Coffee} from "../API/DummyAPI"

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function Detail() {
  let navigate = useNavigate();
  const { id } = useParams();

  // handle logic for product
  let { data: product } = useQuery("product", async () => {
    const response = await API.get("/product/" + id);
    return response.data.data;
  });

  let { data: transaction_id } = useQuery("trans", async () => {
    const response = await API.get("/transaction-status");
    return response.data.data;
  });

  // Handle for Add to cart
  const handleAddToCart = useMutation(async (e) => {
    try {
      e.preventDefault();
      if (transaction_id === undefined) {
        API.post("/transaction");
      }

      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const data = {
        product_id: product.id,
        transaction_id: transaction_id.id,
      };

      const body = JSON.stringify(data);

      API.post("/cart", body, config);
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
            <img src={Coffee[id].image} alt="" className="w-100" />
          </Col>
          <Col md={7}>
            <h1 style={{ color: "#613D2B" }}>{Coffee[id].title}</h1>
            <h5 style={{ color: "#613D2B" }}>Stock :  {Coffee[id].Stock}</h5>

            <Container className="mt-5 text-center">
              <Row style={{textAlign: "justify", height: 390, overflow:"auto"}}>
                {Coffee[id].desc}
              </Row>
              <Row className="my-3">
                <Col>
                  <h4 style={{ color: "#613D2B" }}>Total</h4>
                </Col>
                <Col>
                  <h4 className="text-start" style={{ color: "#613D2B" }}>
                    {formatPrice(Coffee[id].price)}
                  </h4>
                </Col>
              </Row>
              <button className="submit" type="submit" onClick={(e) => handleAddToCart.mutate(e)}> Add to Cart</button>
            </Container>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
