import React from "react";
import { Link } from "react-router-dom";
import { API } from "../config/api";
import { useQuery } from "react-query";
import {Coffee} from "../API/DummyAPI"

import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import formatPrice from "../utils/formatPrice";

export default function ListCard() {
  let { data: products } = useQuery("productsCache", async () => {
    const response = await API.get("/products");
    return response.data.data;
  });
  console.log(products);

  return (
    <Container className="my-5">
      <Row>
        {Coffee.map((items, index) => (
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
                to={"/detail/" + items.id}
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
                    {items.title}
                  </p>
                  <p style={{ color: "#613D2B", margin: 0 }}>
                    {formatPrice(items.price)}
                  </p>
                  <p style={{ color: "#613D2B", margin: 0 }}>
                    Stock :  {items.Stock}
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
