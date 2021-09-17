import React, { useState } from "react";
import { Container, Button } from "reactstrap";
import SearchPage from "./SearchPage";
import Sidebar from "./Sidebar";
import "./app.scss";
import ImageService from "../services/ImageService";
import { BrowserRouter as Router,  Route } from "react-router-dom";
import GalleryPage from "./GalleryPage";
import TopicsPage from "./TopicsPage";
import CollectionsPage from "./CollectionsPage";
import PhotoPage from "./PhotoPage";
import { AiFillEye } from "react-icons/ai";

function App() {
  const imgService = new ImageService();
  const [showSidebar, setShowSidebar] = useState(true);
  
  return (
    <Router>
      <div className="app">
        <div className="d-flex h-100">
          <Sidebar hidden={!showSidebar} />
          <div className={`toolbar-col ${showSidebar?'':'hidden'}`}></div>
          <div className="show-sidebar-col">
            <Button
              size="lg"
              className="d-flex justify-content-center align-items-center"
              outline={showSidebar}
              onClick={() => {
                setShowSidebar(!showSidebar);
              }}
              color={showSidebar ? "secondary" : "primary"}
            >
              <AiFillEye />
            </Button>
          </div>
          <Container fluid className="p-0 pt-5">
            <Route
              exact
              path="/collections"
              render={(props) => (
                <CollectionsPage
                  getGalleryItems={imgService.getCollections}
                  {...props}
                />
              )}
            />
            <Route
              exact
              path="/topics"
              render={(props) => (
                <TopicsPage getGalleryItems={imgService.getTopics} {...props} />
              )}
            />
            <Route
              path="/search/:query?"
              render={({match}) => (
                <SearchPage searchPhotos={imgService.searchPhotos} query={match.params.query}/>
              )}
            />
              {/* const page = props.page ? `&page=${props.page}`:'&page=1';
        const per_page = props.per_page ? `&per_page=${props.per_page}`:'&per_page=16';
        const order_by = props.order_by ? `&order_by=${props.order_by}`:'';
        const collections = props.collections ? `&collections=${props.collections}`:'';
        const color=props.color?`&color=${props.color}`:'';
        return fetch(`${this._baseUrl}search/photos?query=${props.query}${page}${per_page}${order_by}${collections}${color}&client_id=${this._apiKey}`).then(res=>res.json()) */}
            <Route
              path="/topics/:id"
              render={({ match }) => (
                <GalleryPage
                  id={match.params.id}
                  getGalleryItems={imgService.getTopicPhotos}
                  getGalleryInfo={imgService.getTopic}
                  title={"Viewing a topic "}
                />
              )}
            />
            <Route
              path="/collections/:id"
              render={({ match }) => (
                <GalleryPage
                  id={match.params.id}
                  getGalleryInfo={imgService.getCollection}
                  getGalleryItems={imgService.getCollectionPhotos}
                  title={"Viewing a collection "}
                />
              )}
            />
            <Route
              path="/photos/:id"
              render={({ match }) => (
                <PhotoPage
                  id={match.params.id}
                  getPhoto={imgService.getPhoto}
                />
              )}
            />
          </Container>
        </div>
      </div>
    </Router>
  );
}

export default App;
