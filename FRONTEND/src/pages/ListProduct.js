import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API } from "../config/api";
import Header from "../components/Header";
import { Container, Table } from "react-bootstrap";
import { useQuery } from "react-query";

export default function ListProduct() {
  let { data: products, refetch } = useQuery("produuuct", async () => {
    const response = await API.get("/products");
    return response.data.data;
  });
  let handleDelete = async (id) => {
    let person = prompt("Input 'DELETE' for Delete Product", "DELETE");
    if (person == "DELETE") {
      await API.delete(`product/${id}`);
    }
    refetch();
  };
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
          <tbody style={{ textAlign: "center" }}>
            {products?.map((item, index) => (
              <tr
                // onClick={() => handleShow(item?.id)}
                key={index}
                // style={{ display: "none" }}
                className={item.length === 0 ? "fd" : ""}
              >
                <td>{index + 1}</td>
                <td>
                  <img src={item.image} alt="bab" style={{ width: 100 }} />
                </td>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td>
                  <Link
                    to={"/addProduct/" + item.id}
                    className=" text-decoration-none"
                  >
                    <button className="submit" type="submit">
                      {" "}
                      edit
                    </button>
                  </Link>
                </td>
                <td>
                  <button
                    className="btn btn-danger px-4"
                    type="submit"
                    onClick={() => handleDelete(item.id)}
                  >
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
