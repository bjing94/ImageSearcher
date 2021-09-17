import React, { useEffect, useState } from "react";
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";
import { Link } from "react-router-dom";
import {
  Col,
  Container,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Row,
  UncontrolledDropdown,
} from "reactstrap";
import {TopicProps } from "../interfaces/interfaces";
import "./galleryPage.scss";
import LoadingPlate from "./LoadingPlate";
import SuperImage from './SuperImage';

interface TopicElementProps {
  description: string;
  author: string;
  name: string;
  frontImage: string;
}
function TopicElement(props: TopicElementProps) {
  const { description, author, name, frontImage } = props;
  return (
    <div className="d-flex flex-column gallery-element" key={`topic_${name}`}>
      <div>
       <SuperImage src={frontImage}/>
      </div>
      <h5 className="mt-4">{name}</h5>
      <div className="d-flex">
        <h6>465 photos</h6>
        <h6 className="px-1">|</h6>
        <h6>By {author}</h6>
      </div>
      <h6>{description}</h6>
    </div>
  );
}
interface TopicsPageProps {
  getGalleryItems: (props:TopicProps) => Promise<Response>;
}
export default function TopicsPage(props: TopicsPageProps) {
  const { getGalleryItems } = props;
  const name = "Topics";
  const [data, setData] = useState<any>(null);
  const [sortOpen, setSortOpen] = useState(false);
  const [order, setOrder] = useState("Latest");
  const dropdownOptions = ["Latest", "Oldest", "Popular"];
  const dropdownElements = dropdownOptions.map((option) => {
    return (
      <DropdownItem
        onClick={() => {
          setOrder(`${option}`);
        }}
        key={`dropdown_${option}`}
      >
        {option}
      </DropdownItem>
    );
  });

  useEffect(() => {
    setData(null)
    getGalleryItems({order_by:order.toLowerCase()}).then((res) => {
      setData(res);
    });
  }, [order]);
  useEffect(() => {
    setData(null)
    getGalleryItems({order_by:order.toLowerCase()}).then((res) => {
      setData(res);
    });
  }, []); 
  const elements = data
    ? data.map((topic: any) => {
        return (
          <Col xs={12} md={6} lg={3} key={`topicEl_${topic.title}`}>
            <Link to={`/topics/${topic.id}`} style={{textDecoration:'none'}}>
            <TopicElement
              name={topic.title}
              description={topic.description?topic.description.replace(/{.*?}/g, "")
              .replace(/\[.*?\]/g, "")
              .replace(/<.*?>/g, "")
              .replace(/\(.*?\)/g, ""):null}
              author={topic.owners[0].username}
              frontImage={topic.cover_photo.urls.regular}
            />
            </Link>
          </Col>
        );
      })
    : <LoadingPlate size={100} color={"#fff"}/>;
  return (
    <Container fluid={true} className={"h-100 p-5 m-0"}>
      <Row>
        <Col>
          <h1 style={{ color: "white" }}>{name}</h1>
        </Col>
      </Row>
      <Row>
        <Col>
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
            <DropdownMenu>{dropdownElements}</DropdownMenu>
          </UncontrolledDropdown>
        </Col>
      </Row>
      <Row className="mt-2 g-3">{elements}</Row>
     
    </Container>
  );
}
