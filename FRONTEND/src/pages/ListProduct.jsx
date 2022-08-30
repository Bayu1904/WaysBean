import React from "react";
import Header from "../components/Header";
import { Container, Table } from "react-bootstrap";
import { Coffee } from "../API/DummyAPI";

export default function ListProduct() {
  return (
    <div>
      <Header />
      <Container className="mt-4">
        <h3>List Product</h3>
        <Table
          bordered
          className="text-center"
          style={{ borderColor: "#828282" }}
        >
          <thead style={{ backgroundColor: "#E5E5E5" }}>
            <tr>
              <th>No</th>
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th colspan="2">Edit</th>
            </tr>
          </thead>
          <tbody>
            {Coffee.map((item, index) => (
              <tr
                // onClick={() => handleShow(item?.id)}
                key={index}
                // style={{ display: "none" }}
                className={item.length === 0 ? "fd" : ""}
              >
                <td>{index + 1}</td>
                <td>{item.image}</td>
                <td>{item.title}</td>
                <td>{item.price}</td>
                <td>
                  <button className="submit" type="submit">
                    {" "}
                    EDIT
                  </button>
                </td>
                <td>
                  <button className="btn btn-danger" type="submit">
                    {" "}
                    delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </div>
  );
}
