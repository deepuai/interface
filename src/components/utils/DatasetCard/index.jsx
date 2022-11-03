import React from "react";
import { Button, Modal, Row } from "react-bootstrap";
import Gallery from "../Gallery";
import "./DatasetCard.css";

class DatasetCard extends React.Component {
  constructor({ infos }) {
    super();
    console.log(infos);
    this.id = infos.id;
    this.name = infos.name;
    this.application = infos.application;
    this.n_images = infos.n_images;
    this.n_classes = infos.n_classes;
    this.sizeMB = (infos.size / 1e6).toFixed(2);
    this.images = infos.images;
    this.classes = infos.classes;
    this.state = {
      isGalleryComponentVisible: false,
    };
  }

  async showGalleryComponent() {
    this.setState({
      ...this.state,
      isGalleryComponentVisible: true,
    });
  }

  hideDialog() {
    this.setState({
      ...this.state,
      isGalleryComponentVisible: false,
    });
  }

  render() {
    return (
      <div className="card-dataset">
        <div className="card-header">
          <h3 className="title">{this.name}</h3>
        </div>
        <div className="card-body">
          <div className="dataset-preview">
            {/* <Row>
              <img
                src={this.images[0]}
                className="w-100 shadow-1-strong rounded mb-4"
                alt="primeira imagem do conjunto de dados"
              />
              <img
                src={this.images[1]}
                className="w-100 shadow-1-strong rounded mb-4"
                alt="segunda imagem do conjunto de dados"
              />
              <img
                src={this.images[2]}
                className="w-100 shadow-1-strong rounded mb-4"
                alt="terceira imagem do conjunto de dados"
              />
            </Row> */}
          </div>
          <div className="dataset-infos">
            <div>
              <img
                src="/assets/icons/harddisk.png"
                style={{ height: "30px", width: "30px", marginRight: "5px" }}
                alt="harddisk-icon"
              />
              <span>{this.sizeMB + " MB"}</span>
            </div>
            <div>
              <img
                src="/assets/icons/gallery.png"
                style={{ height: "30px", width: "30px", marginRight: "5px" }}
                alt="gallery-icon"
              />
              <span>{this.n_images} Imagens</span>
            </div>
            <div>
              <img
                src="/assets/icons/multicast.png"
                style={{ height: "30px", width: "30px", marginRight: "5px" }}
                alt="multicast-icon"
              />
              <span>{this.n_classes} Classes</span>
            </div>
          </div>
        </div>
        <div className="buttons">
          <Button
            variant="outline-secondary"
            onClick={() => this.showGalleryComponent()}
          >
            Visualizar
          </Button>
        </div>
        <Modal
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={this.state.isGalleryComponentVisible}
          onHide={() => this.hideDialog()}
        >
          <Modal.Header closeButton>
            <Modal.Title
              id="contained-modal-title-vcenter"
              style={{ fontSize: "1.2rem" }}
              className="text-muted"
            >
              Imagens do dataset:{" "}
              <span style={{ fontWeight: 600 }}>{this.name}</span>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Gallery images={this.images} />
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="outline-secondary"
              onClick={() => this.hideDialog()}
            >
              Fechar
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default DatasetCard;
