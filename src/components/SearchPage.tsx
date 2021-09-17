import React, { useEffect, useRef } from "react";
import {
  Button,
  Col,
  Container,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Input,
  InputGroup,
  InputGroupAddon,
  Row,
  Card,
  CardHeader,
  Collapse,
  UncontrolledDropdown,
  Form,
} from "reactstrap";
import "./searchPage.scss";
import { useState } from "react";
import {
  AiOutlineArrowDown,
  AiOutlineArrowUp,
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineSearch,
} from "react-icons/ai";
import { SearchProps } from "../interfaces/interfaces";
import NumberOfPages from "./NumberOfPages";
import LoadingPlate from "./LoadingPlate";
import { Link, useHistory } from "react-router-dom";

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
  alt: string;
}
function SuperImage(props: SuperImageProps) {
  const { src, alt } = props;
  return (
    <div className="super-img">
      <img className="rounded" src={src} alt={alt} />
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
          key={`color_${color}`}
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
        key={`color_${color}`}
      >
        <div style={{ backgroundColor: `${color}` }}></div>
      </div>
    );
  });
  return <div className="color-collection">{elements}</div>;
}

interface SearchPageGalleryProps {
  query: string | undefined;
  searchPhotos: (props: SearchProps) => Promise<Response>;
}
function SearchPageGallery({ query, searchPhotos }: SearchPageGalleryProps) {
  const [searchResult, setSearchResult] = useState<any>(null);
  useEffect(() => {
    setSearchResult(null);
    if (query) {
      let items = query.split("&");
      items = items.map((item) => {
        return item.split("=")[1];
      });
      console.log(items);
      const searchParams: (string | undefined)[] = [
        undefined,
        undefined,
        undefined,
        undefined,
      ];
      for (let i = 0; i < items.length; i++) {
        searchParams[i] = items[i];
      }
      searchPhotos({
        query: searchParams[0]!,
        order_by: searchParams[1]?.toLowerCase(),
        color: searchParams[2],
        page: searchParams[3],
      }).then((res) => setSearchResult(res));
    }
  }, []);

  return <Row className="mt-1 g-2"></Row>;
}
interface SearchPageProps {
  searchPhotos: (props: SearchProps) => Promise<Response>;
  query: string | undefined;
}
export default function SearchPage(props: SearchPageProps) {
  const { searchPhotos, query } = props;

  //First we process given query
  const queryProps = getInfoFromQuery(query);
  let activeColor = queryProps.color ? queryProps.color : "none";
  let order = queryProps.order_by
    ? queryProps.order_by.charAt(0).toUpperCase() + queryProps.order_by.slice(1)
    : "Latest";
  let currentPage = queryProps.page ? +queryProps.page : 1;
  //then we process states
  const [sortOpen, setSortOpen] = useState(false);
  const [searchResult, setSearchResult] = useState<any>(null);
  const [searchInput, setSearchInput] = useState<string>(queryProps.query);
  const [loadingState,setLoadingState]=useState(0);
  const history = useHistory();

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

  function getInfoFromQuery(str: string | undefined) {
    if (str) {
      let items = str.split("&");
      items = items.map((item) => {
        return item.split("=")[1];
      });

      const searchParams: SearchProps = {
        query: items[0],
        order_by: items[1] ? items[1].toLowerCase() : undefined,
        color: items[2] ? items[2] : undefined,
        page: items[3] ? items[3] : undefined,
      };
      return searchParams;
    } else {
      return {
        query: "",
        order_by: undefined,
        color: undefined,
        page: undefined,
      };
    }
  }
  function setSearchQuery(new_query: SearchProps) {
    let old_query = getInfoFromQuery(query);
    const newInput = new_query.query;
    const newPage = new_query.page ? new_query.page : old_query.page;

    const newOrder = new_query.order_by
      ? new_query.order_by
      : old_query.order_by;
    const newColor = new_query.color ? new_query.color : old_query.color;

    const newPageText = newPage ? `&page=${newPage}` : `&page=${1}`;
    const newOrderText = newOrder
      ? `&order_by=${newOrder}`
      : `&order_by=Latest`;
    const newColorText = newColor ? `&color=${newColor}` : `&color=none`;

    history.push(
      `/search/query=${newInput}${newOrderText}${newColorText}${newPageText}`
    );
  }
  function getPhotos() {
    setSearchResult(null);
    if (query) {
      const searchParams = getInfoFromQuery(query);
      searchPhotos({
        query: searchParams.query,
        order_by: searchParams.order_by,
        color: searchParams.color,
        page: searchParams.page,
      }).then((res) => setSearchResult(res));
    }
  }
  //when we change parameter we change query and update page!
  function handleSubmit(e: any) {
    e.preventDefault();
    let new_query: SearchProps = {
      query: searchInput,
    };
    setSearchQuery(new_query);
  }
  function setActiveColor(new_color: string) {
    let new_query: SearchProps = {
      query: searchInput,
      color: new_color,
    };

    setSearchQuery(new_query);
  }
  function setOrder(new_order: string) {
    if (new_order != order) {
      let new_query: SearchProps = {
        query: searchInput,
        order_by: new_order,
      };
      setSearchQuery(new_query);
    }
  }
  function setCurrentPage(new_page: string) {
    if (+new_page != currentPage) {
      let new_query: SearchProps = {
        query: searchInput,
        page: new_page,
      };
      setSearchQuery(new_query);
    }
  }

  function handleChangeInput(e: any) {
    setSearchInput(e.target.value);
  }

  useEffect(() => {
    let cur_query = getInfoFromQuery(query);
    activeColor = cur_query.color ? cur_query.color : "none";
    order = cur_query.order_by
      ? cur_query.order_by.charAt(0).toUpperCase() + cur_query.order_by.slice(1)
      : "Latest";
    currentPage = cur_query.page ? +cur_query.page : 1;
    setSearchInput(cur_query.query);

    getPhotos();
  }, [query]);

  const elements = searchResult ? (
    searchResult.results.map((item: any) => {
      return (
        <Col xs={12} lg={6} xl={3} key={`img_${item.id}`}>
          <Link to={`/photos/${item.id}`} style={{ textDecoration: "none" }}>
            <SuperImage src={item.urls.regular} alt={`img_${item.id}`} />
          </Link>
        </Col>
      );
    })
  ) : (
    <LoadingPlate size={100} color={"#fff"} />
  );
  switch(loadingState){
    case 0:
      <div>Type something!</div>
      break;
      case 1:
        <div>Loading</div>
     break;
     case 1:
      <div>Loading</div>
   break;
  }
  const totalPages = searchResult ? searchResult.total_pages : 0;
  const filters = (
    <React.Fragment>
      <div className="d-flex flex-column filter-col">
        <h1 style={{ color: "white" }}>Filters</h1>
        <Button
          color="primary"
          style={{ color: "white" }}
          // onClick={handleApplyFilter}
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
                  setActiveColor("none");
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
              <Form onSubmit={handleSubmit}>
                <InputGroup className="search-bar">
                  <Input value={searchInput} onChange={handleChangeInput} />
                  <InputGroupAddon addonType="append">
                    <Button
                      color="primary"
                      className="d-flex justify-content-center align-items-center h-100"
                      onClick={handleSubmit}
                    >
                      <AiOutlineSearch />
                    </Button>
                  </InputGroupAddon>
                </InputGroup>
              </Form>
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
                    {order}
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
                setCurrentPage(page.toString());
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
          <Col xs={12} md="auto" className="mb-3 ps-0">
            {filters}
          </Col>
          <Col xs={12} md={true} className="ps-0">
            {searchElements}
          </Col>
        </Row>
      </div>
    </Container>
  );
}
