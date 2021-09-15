import React, { useEffect, useRef } from "react";
import {
  Badge,
  Button,
  Col,
  Container,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupButtonDropdown,
  InputGroupText,
  Label,
  Row,
  Media,
  Card,
  CardHeader,
  Collapse,
  CardBody,
  ListGroup,
  ListGroupItem,
  ButtonGroup,
  UncontrolledDropdown,
} from "reactstrap";
import Sidebar from "./Sidebar";
import { ChromePicker } from "react-color";
import "./searchPage.scss";
import { useState } from "react";
import {
  AiOutlineArrowDown,
  AiOutlineArrowUp,
  AiOutlineEllipsis,
  AiOutlineLoading,
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineReload,
  AiOutlineSearch,
} from "react-icons/ai";
import { SearchProps } from "../interfaces/interfaces";
import { CircleLoader } from "react-spinners";
import NumberOfPages from "./NumberOfPages";
import LoadingPlate from "./LoadingPlate";
import { Link } from "react-router-dom";

interface superDropdownProps {
  title: string;
  items: string[];
  selectedItem: string;
  onSelect: (a: string) => void;
}

interface CustomCollapseProps {
  name: string;
  child: React.ReactNode;
}
function CustomCollapse(props: CustomCollapseProps) {
  const [collapsed, setCollapsed] = useState(false);
  const { child, name } = props;
  return (
    <Card
      className="custom-collapse"
      color="utility"
      style={{ color: "white" }}
    >
      <CardHeader>
        <div
          onClick={() => {
            setCollapsed(!collapsed);
          }}
          className="d-flex justify-content-between align-items-center"
        >
          {name}
          {collapsed ? <AiOutlinePlus /> : <AiOutlineMinus />}
        </div>
        <div className="pt-2"></div>
        <Collapse isOpen={!collapsed}>{child}</Collapse>
      </CardHeader>
    </Card>
  );
}
interface SuperImageProps {
  src: string;
}
function SuperImage(props: SuperImageProps) {
  const { src } = props;
  return (
    <div className="super-img">
      <img className="rounded" src={src} />
    </div>
  );
}
interface ColorCollectionProps {
  colors: string[];
  activeColor: string;
  onClickColor: (a: string) => void;
}
function ColorCollection(props: ColorCollectionProps) {
  const { colors, activeColor, onClickColor } = props;
  const elements = colors.map((color) => {
    const activeClass = color === activeColor ? "active" : "";
    if (color === "black_and_white") {
      return (
        <div
          className={`color-collection-item ${activeClass}`}
          onClick={() => {
            onClickColor(color);
          }}
        >
          <div style={{ backgroundColor: `black` }}></div>
          <div style={{ backgroundColor: `white` }}></div>
        </div>
      );
    }
    return (
      <div
        className={`color-collection-item ${activeClass}`}
        onClick={() => {
          onClickColor(color);
        }}
      >
        <div style={{ backgroundColor: `${color}` }}></div>
      </div>
    );
  });
  return <div className="color-collection">{elements}</div>;
}

interface SearchPageProps {
  searchPhotos: (props: SearchProps) => Promise<Response>;
}
export default function SearchPage(props: SearchPageProps) {
  const { searchPhotos } = props;
  const [sortOpen, setSortOpen] = useState(false);
  const [order, setOrder] = useState("Latest");
  const [searchResult, setSearchResult] = useState<any>(null);
  const [searchInput, setSearchInput] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [activeColor, setActiveColor] = useState("black");
  const validColors = [
    "black",
    "white",
    "yellow",
    "orange",
    "red",
    "purple",
    "magenta",
    "green",
    "teal",
    "blue",
    "black_and_white",
  ];
  function handleApplyFilter() {
    setSearchResult(null);
    searchPhotos({
      query: searchInput,
      order_by: order.toLowerCase(),
      color: activeColor,
      page: currentPage,
    }).then((res) => setSearchResult(res));
  }
  function handleChangeInput(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchInput(e.target.value);
  }
  useEffect(() => {
    handleApplyFilter();
  }, [currentPage]);

  const elements = searchResult ? (
    searchResult.results.map((item: any) => {
      return (
        <Col xs={12} lg={6} xl={3}>
          <Link to={`/photos/${item.id}`} style={{ textDecoration: "none" }}>
            <SuperImage src={item.urls.regular} />
          </Link>
        </Col>
      );
    })
  ) : (
    <LoadingPlate size={100} color={"#fff"} />
  );
  const totalPages = searchResult ? searchResult.total_pages : 0;
  const filters = (
    <React.Fragment>
      <div className="d-flex flex-column filter-col">
        <h1 style={{ color: "white" }}>Filters</h1>
        <Button
          color="primary"
          style={{ color: "white" }}
          onClick={handleApplyFilter}
        >
          Apply
        </Button>
        <div className="mt-2"></div>
        <CustomCollapse
          child={
            <ColorCollection
              colors={validColors}
              activeColor={activeColor}
              onClickColor={(a: string) => {
                if (activeColor === a) {
                  setActiveColor("");
                } else {
                  setActiveColor(a);
                }
              }}
            />
          }
          name="Color"
        />
      </div>
    </React.Fragment>
  );
  const searchElements = (
    <React.Fragment>
      <Container fluid className="p-0">
        <Row>
          <Col>
            <div style={{ maxWidth: "600px" }}>
              <InputGroup className="search-bar">
                <Input value={searchInput} onChange={handleChangeInput} />
                <InputGroupAddon addonType="append">
                  <Button
                    color="primary"
                    className="d-flex justify-content-center align-items-center h-100"
                    onClick={handleApplyFilter}
                  >
                    <AiOutlineSearch />
                  </Button>
                </InputGroupAddon>
              </InputGroup>
            </div>
          </Col>
        </Row>

        <Row className="mt-3">
          <Col>
            <div style={{ width: "9rem" }}>
              <UncontrolledDropdown isOpen={sortOpen}>
                <DropdownToggle
                  color="utility"
                  onClick={() => {
                    setSortOpen(!sortOpen);
                  }}
                >
                  <div className="d-flex align-items-center justify-content-between">
                    <text>{order}</text>
                    {sortOpen ? (
                      <AiOutlineArrowUp className="ms-2" />
                    ) : (
                      <AiOutlineArrowDown className="ms-2" />
                    )}
                  </div>
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem
                    onClick={() => {
                      setOrder("Relevant");
                    }}
                  >
                    Relevant
                  </DropdownItem>
                  <DropdownItem
                    onClick={() => {
                      setOrder("Latest");
                    }}
                  >
                    Latest
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </div>
          </Col>
        </Row>
        <Row className="mt-1 g-2 ">{elements}</Row>
        <Row className="mt-1">
          {searchResult ? (
            <NumberOfPages
              count={totalPages}
              currentPage={currentPage}
              onClickPage={(page: number) => {
                setCurrentPage(page);
              }}
            />
          ) : null}
        </Row>
      </Container>
    </React.Fragment>
  );
  return (
    <Container fluid={true} className={"h-100 p-5 root-container m-0"}>
      <div className="d-flex h-100">
        <Row className="w-100">
          <Col xs={12} md="auto" className="mb-3">
            {filters}
          </Col>
          <Col xs={12} md={true} >
            {searchElements}
          </Col>
        </Row>
      </div>
    </Container>
  );
}
