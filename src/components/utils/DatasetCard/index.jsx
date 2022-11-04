import React from "react";
import { Button, Modal } from "react-bootstrap";
import Gallery from "../Gallery";
import "./DatasetCard.css";

class DatasetCard extends React.Component {
  constructor({ infos, isSelecting = false, callbackSelect = (_) => {} }) {
    super();
    this.id = infos.id;
    this.name = infos.name;
    this.application = infos.application;
    this.n_images = infos.n_images;
    this.n_classes = infos.n_classes;
    this.sizeMB = (infos.size / 1e6).toFixed(2);
    this.images = infos.images;
    this.classes = infos.classes;
    this.isSelecting = isSelecting;
    this.callbackSelect = callbackSelect;
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
        <div className="card-body">
          <h5 className="dataset-name"> {this.name} </h5>
          <div className="dataset-imgs">
            {this.images
              .sort(() => Math.random() - 0.5)
              .slice(0, 12)
              .map((imgURI) => (
                <img src={imgURI} alt="Imagem" key={imgURI} />
              ))}
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
          <div className="buttons">
            <Button
              variant="secondary"
              onClick={() => this.showGalleryComponent()}
            >
              Visualizar
            </Button>

            {this.isSelecting ? (
              <Button
                variant="primary"
                onClick={() => {
                  this.callbackSelect(this.id);
                }}
              >
                Escolher
              </Button>
            ) : (
              <></>
            )}
          </div>
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
