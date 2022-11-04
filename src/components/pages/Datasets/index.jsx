import React from "react";
import axios from "axios";
import { Button, Modal } from "react-bootstrap";
import DatasetCard from "../../utils/DatasetCard";
import NewDataset from "../../utils/NewDataset";
import "./Datasets.css";

class Datasets extends React.Component {
  constructor() {
    super();
    this.state = {
      datasets: [],
      isNewDatasetComponentVisible: false,
    };
  }
  showNewDatasetComponent() {
    this.setState({
      ...this.state,
      isNewDatasetComponentVisible: true,
    });
  }
  hideDialog() {
    this.setState({
      ...this.state,
      isNewDatasetComponentVisible: false,
    });
  }
  componentDidMount() {
    axios
      .get(`http://localhost:8080/datasets`)
      .then((response) => {
        this.setState({
          ...this.state,
          datasets: [...response.data],
        });
      })
      .catch((error) => console.log(error));
  }

  render() {
    return (
      <div className="page-datasets">
        <div className="datasets">
          {this.state.datasets.map((infos) => (
            <DatasetCard infos={infos} key={infos.id} />
          ))}
        </div>
        <div className="buttons">
          <Button
            variant="outline-primary"
            onClick={() => this.showNewDatasetComponent()}
          >
            + Novo
          </Button>
        </div>

        <Modal
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={this.state.isNewDatasetComponentVisible}
          onHide={() => this.hideDialog()}
        >
          <Modal.Header closeButton>
            <Modal.Title
              id="contained-modal-title-vcenter"
              style={{ fontSize: "1.2rem" }}
            >
              Novo Conjunto de Dados
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <NewDataset />
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

export default Datasets;
