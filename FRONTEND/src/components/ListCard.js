import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { API } from "../config/api";
import { UserContext } from "../utils/CreateContext";

import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import formatPrice from "../utils/formatPrice";

export default function ListCard() {
  const [products, SetProducts] = useState([]);
  const [state] = useContext(UserContext);

  const findProducts = async () => {
    try {
      let response = await API.get("/products");
      SetProducts(response.data.data);
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    findProducts();
  }, []);

  return (
    <Container className="my-5">
      <Row>
        {products.map((items, index) => (
          <Col className="mt-4">
            <Card
              key={index}
              className="pe-auto"
              style={{
                width: "15.063rem",
                border: 0,
                borderRadius: 10,
                backgroundColor: "#F6DADA",
              }}
            >
              <Link
                to={state.isLogin ? "/detail/" + items.id : "/"}
                className=" text-decoration-none"
              >
                <Card.Img
                  variant="top"
                  src={items.image}
                  className="rounded"
                  style={{ height: "19.5rem" }}
                />
                <Card.Body>
                  <p
                    className="fw-bold"
                    style={{ fontSize: "18px", margin: 0, color: "#613D2B" }}
                  >
                    {items.name}
                  </p>
                  <p style={{ color: "#613D2B", margin: 0 }}>
                    {formatPrice(items.price)}
                  </p>
                  <p style={{ color: "#613D2B", margin: 0 }}>
                    Stock : {items.stock}
                  </p>
                </Card.Body>
              </Link>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
