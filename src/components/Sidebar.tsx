import React from "react";
import { Button} from "reactstrap";
import {
  AiFillHome,
  AiOutlineCopy,
  AiOutlineSlack,
} from "react-icons/ai";
import "./sidebar.scss";
import { Link } from "react-router-dom";

interface SidebarProps{
  hidden:boolean;
}
export default function Sidebar(props:SidebarProps) {
  const {hidden}=props;
  return (
    <div
      className={`sidebar-root ${hidden?'hidden':''}`}
      style={{ backgroundColor: "#1a1d2e" }}
    >
      <div
        className="sidebar-root-group"
      >
        <Link to="/search">
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
            className="d-flex justify-content-center align-items-center"
            size="lg"
          >
            <AiOutlineCopy />
          </Button>{" "}
        </Link>
        <Link to="/topics" style={{ textDecoration: "none" }}>
          <Button
            outline
            color="secondary"
            className="d-flex justify-content-center align-items-center "
            size="lg"
          >
            <AiOutlineSlack />
          </Button>
        </Link>
      </div>
    </div>
  );
}
