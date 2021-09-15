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
import { CollectionProps } from "../interfaces/interfaces";
import "./galleryPage.scss";
import LoadingPlate from "./LoadingPlate";
import NumberOfPages from "./NumberOfPages";
import SuperImage from "./SuperImage";

interface GalleryElementProps {
  description: string;
  author: string;
  name: string;
  frontImage: string;
  count: number;
}
function GalleryElement(props: GalleryElementProps) {
  const { description, author, name, frontImage, count } = props;
  return (
    <div className="d-flex flex-column gallery-element">
      <div>
        <SuperImage src={frontImage} />
      </div>
      <h5 className="mt-4">{name}</h5>
      <div className="d-flex">
        <h6>{count} photos</h6>
        <h6 className="px-1">|</h6>
        <h6>By {author}</h6>
      </div>
      <h6>{description}</h6>
    </div>
  );
}
interface CollectionsPageProps {
  getGalleryItems: (props: CollectionProps) => Promise<Response>;
}

export default function CollectionsPage(props: CollectionsPageProps) {
  const { getGalleryItems } = props;
  const name = "Collections";
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    setData(null);
    getGalleryItems({}).then((res) => {
      setData(res);
    });
  }, []);
  const elements = data ? (
    data.map((collection: any) => {
      return (
        <Col xs={12} md={6} lg={3}>
          <Link to={`/collections/${collection.id}`} style={{textDecoration:'none'}}>
          <GalleryElement
            name={collection.title}
            description={
              collection.description
                ? collection.description
                    .replace(/{.*?}/g, "")
                    .replace(/\[.*?\]/g, "")
                    .replace(/<.*?>/g, "")
                    .replace(/\(.*?\)/g, "")
                : null
            }
            author={collection.user.username}
            frontImage={collection.cover_photo.urls.regular}
            count={collection.total_photos}
          />
          </Link>
        </Col>
      );
    })
  ) : (
    <LoadingPlate size={100} color={"#fff"} />
  );
  console.log(data);
  return (
    <Container fluid={true} className={"h-100 p-5 m-0"}>
      <Row>
        <Col>
          <h1 style={{ color: "white" }}>{name}</h1>
        </Col>
      </Row>
      <Row className="mt-2 g-3">{elements}</Row>
    </Container>
  );
}
