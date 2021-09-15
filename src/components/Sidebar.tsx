import React from "react";
import { Button, Col, ListGroup, ListGroupItem, Row } from "reactstrap";
import {
  AiFillFire,
  AiFillHome,
  AiOutlineCopy,
  AiOutlineDotChart,
  AiOutlineFile,
  AiOutlineMore,
  AiOutlineSearch,
  AiOutlineSlack,
} from "react-icons/ai";
import "./sidebar.scss";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div
      className={"d-flex flex-column align-items-center h-100 w-100 p-4 "}
      style={{ backgroundColor: "#1a1d2e" }}
    >
      

      <div
        className="d-flex flex-column align-items-center"
        style={{ marginTop: "100px" }}
      >
        <Link to="/">
        <Button
          outline
          color="secondary"
          className="d-flex justify-content-center align-items-center "
          size="lg"
        >
          <AiFillHome />
        </Button>
      </Link>
        <Link to="/collections" style={{ textDecoration: "none" }}>
          <Button
            outline
            color="secondary"
            className="d-flex justify-content-center align-items-center mt-2"
            size="lg"
          >
            <AiOutlineCopy />
          </Button>{" "}
        </Link>
        <Link to="/topics" style={{ textDecoration: "none" }}>
          <Button
            outline
            color="secondary"
            className="d-flex justify-content-center align-items-center mt-2"
            size="lg"
          >
            <AiOutlineSlack />
          </Button>
        </Link>
      </div>
    </div>
  );
}
