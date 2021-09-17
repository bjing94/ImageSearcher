import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Container,
  Row,
} from "reactstrap";
import "./photoPage.scss";
import {
  AiFillEnvironment,
  AiFillFile,
} from "react-icons/ai";
import LoadingPlate from "./LoadingPlate";
interface PhotoPageProps {
  id: string;
  getPhoto: (photo_id: string) => Promise<Response>;
}
interface MainImageProps {
  src: string;
  maxWidthRem: string;
}
interface AvatarProps {
  src: string;
  width: string;
}
function Avatar(props: AvatarProps) {
  const { src, width } = props;
  return (
    <img
      className="photo-avatar"
      style={{ width: width, height: width, backgroundImage: src }}
      src={src}
    />
  );
}
function MainImage(props: MainImageProps) {
  const { src } = props;

  return (
    <div className="photo-main-img" >
      <img src={src} />
    </div>
  );
}
export default function PhotoPage(props: PhotoPageProps) {
  const { getPhoto, id } = props;
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    getPhoto(id).then((res) => setData(res));
  }, []);
  let content = <LoadingPlate size={20} color={"white"} />;
  if (data) {
    const {
      user,
      created_at,
      downloads,
      likes,
      views,
      location,
      links,
      urls,
      width,
      height,
    } = data;
    const { profile_image, first_name, last_name } = user;
    const { city, country } = location;
    const { download } = links;
    const { regular } = urls;
    //========Date==========
    const date1 = new Date(created_at);
    const date2 = new Date();
    console.log(date1);
    console.log(date2);
    const monthDiff = date2.getMonth() - date1.getMonth();
    const yearsPassed = Math.floor(monthDiff / 12);
    const monthsPassed = monthDiff - yearsPassed * 12;
    let daysPassed = -1;
    if (monthsPassed === 0 && yearsPassed === 0) {
      daysPassed = date2.getTime() - date1.getTime();
      daysPassed = Math.floor(daysPassed / (1000 * 60 * 60 * 24));
    }
    const daysPassedStr =
      daysPassed === -1
        ? ""
        : daysPassed === 0
        ? "today"
        : `${daysPassed} days`;
    const ago = daysPassed === -1 ? "ago" : "";
    const yearsPassedStr = yearsPassed === 0 ? "" : `${yearsPassed} years`;
    const monthsPassedStr = monthsPassed === 0 ? "" : `${monthsPassed} months`;
    const timePassedString = `Published ${yearsPassedStr} ${monthsPassedStr} ${daysPassedStr} ${ago}`;
    //========Date==========
    //Dimensions
    const widthRem = `${Math.floor(width / height) * 32} rem`;
    //Names
    const cityStr = city ? `${city},` : "";
    const countryStr = country ? country : "";
    const locationStr = city || country ? `${cityStr}${countryStr}` : "N/A";

    const firstNameStr = first_name ? first_name : "";
    const lastNameStr = last_name ? last_name : "";
    const nameStr = `${firstNameStr} ${lastNameStr}`;
    content = (
      <Container className="p-5" fluid>
        {" "}
        <Row className="m-2">
          <Col xs={12}>
            <div className="d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center">
                <Avatar width="3rem" src={profile_image.medium} />
                <h6 className="ps-2" style={{ color: "white" }}>
                  {nameStr}
                </h6>
              </div>
              <div style={{ width: "9rem" }}>
                <a
                  style={{ textDecoration: "none" }}
                  href={`${download}`}
                  target="_blank"
                >
                  <Button color="primary" style={{ color: "white" }}>
                    Download
                  </Button>
                </a>
              </div>
            </div>
          </Col>
        </Row>
        <Row className="m-0 mt-3 ">
          <Col xs={12} className="p-0">
            <Container fluid={"md"} className="p-0">
                <MainImage src={regular} maxWidthRem={"46rem"} />
            </Container>
          </Col>
        </Row>
        <Row className="m-2">
          <Col xs={12} md={"auto"}>
            <div className="d-flex flex-column photo-info-column">
              <div className="title">Views</div>
              <div className="value">{views}</div>
            </div>
          </Col>
          <Col xs={12} md={"auto"}>
            <div className="d-flex flex-column photo-info-column">
              <div className="title">Downloads</div>
              <div className="value">{downloads}</div>
            </div>
          </Col>
        </Row>
        <Row className="m-2">
          <Col xs={12}>
            <div
              className="d-flex align-items-center"
              style={{ color: "white" }}
            >
              <AiFillEnvironment />
              <div className="ps-2">{locationStr}</div>
            </div>
          </Col>
        </Row>
        <Row className="m-2 mt-1">
          <Col xs={12}>
            <div
              className="d-flex align-items-center"
              style={{ color: "white" }}
            >
              <AiFillFile />
              <div className="ps-2">{timePassedString}</div>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
  console.log(data);

  return (
    <Container
      fluid={true}
      className={"h-100 p-0 pt-5 m-0 "}
      
    >
      {content}
    </Container>
  );
}
