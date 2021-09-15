import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Col,
  Container,
  Row,
} from "reactstrap";
import "./galleryPage.scss";
import LoadingPlate from "./LoadingPlate";
import NumberOfPages from "./NumberOfPages";
import SuperImage from './SuperImage';


interface GalleryPageProps {
  getGalleryItems: (id:string,page:number) => Promise<Response>;
  getGalleryInfo:(id:string)=>Promise<Response>;
  title:string;
  id:string;
}
export default function GalleryPage(props: GalleryPageProps) {
  const { getGalleryItems,getGalleryInfo,title,id } = props;
  const [data, setData] = useState<any>(null);  
  const [galleryInfo,setGalleryInfo]=useState<any>(null);
  const [currentPage,setCurrentPage]=useState(1);
  const elements = data
    ? data.map((photo: any) => {
        return (
          <Col xs={12} lg={4} xl={3} >
            <Link to={`/photos/${photo.id}`} style={{textDecoration:'none'}}>
          <SuperImage src={photo.urls.regular} />
          </Link>
        </Col>
        );
      })
    : <LoadingPlate size={100} color={"#fff"}/>;
  const name = galleryInfo? title+''+galleryInfo.title:'Loading';
  const numberOfPhotos = galleryInfo?galleryInfo.total_photos+' photos':'';
  const pageNum =galleryInfo?Math.ceil(galleryInfo.total_photos/16):0;
  useEffect(()=>{
    getGalleryItems(id,currentPage).then(res=>setData(res));
    getGalleryInfo(id).then(res=>setGalleryInfo(res));
  },[]);
  useEffect(()=>{
    getGalleryItems(id,currentPage).then(res=>setData(res));
  },[currentPage]);
  return (
    <Container fluid={true} className={"h-100  p-5 m-0"}>
      <Row >
        <Col  xs={12}>
          
          <h1 style={{ color: "white",maxWidth:'100%' }} >{name}</h1>
         
        </Col>
        <Col  xs={12}>
          <h2 style={{ color: "white" }}>{numberOfPhotos}</h2>
        </Col>
      </Row>
      <Row className="mt-2 g-3">{elements}</Row>
      <Row className="mt-2 g-3">
      {galleryInfo?<NumberOfPages count={pageNum} currentPage={currentPage}  onClickPage={(a:number) => {setCurrentPage(a)}} />:null } 
      </Row>
     
    </Container>
  );
}
