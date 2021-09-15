import React, { useState } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import SearchPage from "./SearchPage";
import Sidebar from "./Sidebar";
import "./app.scss";
import ImageService from "../services/ImageService";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import GalleryPage from "./GalleryPage";
import TopicsPage from "./TopicsPage";
import CollectionsPage from "./CollectionsPage";
import PhotoPage from "./PhotoPage";
import { AiFillEye } from "react-icons/ai";

function App() {
  const imgService = new ImageService();
  const [showSidebarSm, setShowSidebarSm] = useState(true);
  return (
    <Router>
      <div className="app">
        <div className="d-flex h-100">
          <div
            className="sidebar-col-group"
            style={{display:showSidebarSm ? "block" : "none" }}
          >
            <div className="sidebar-col">
              <Sidebar />
            </div>
            <div className="toolbar-col"></div>
          </div>
          <div className="show-sidebar-col">
            <Button
              size="lg"
              className="d-flex justify-content-center align-items-center mt-2"
              outline={showSidebarSm}
              onClick={() => {
                setShowSidebarSm(!showSidebarSm);
              }}
              color={showSidebarSm ? "secondary" : "primary"}
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
                  <TopicsPage
                    getGalleryItems={imgService.getTopics}
                    {...props}
                  />
                )}
              />
              <Route
                exact
                path="/"
                render={(props) => (
                  <SearchPage
                    searchPhotos={imgService.searchPhotos}
                    {...props}
                  />
                )}
              />
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
