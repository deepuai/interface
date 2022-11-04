import "./Fit2.css";

import React from "react";
import axios from "axios";
import DatasetSelector from "../../utils/DatasetSelector";
import { Button, Form, Spinner, Modal } from "react-bootstrap";
class Fit2 extends React.Component {
  constructor({ modelOrApplication }) {
    super();
    this.pathParams =
      modelOrApplication.model_name.toLowerCase() +
      `${
        modelOrApplication.version
          ? "/" + modelOrApplication.version.toLowerCase()
          : ""
      }/fit`;
    this.state = {
      form: {
        name: null,
        hashKey: null,
        datasetId: null,
        modelId: modelOrApplication["model_id"],
        parentId: modelOrApplication["application_id"],
      },
      loadingActivated: false,
      reponseFromRequest: null,
      isSelectDatasetVisible: false,
    };
  }
  fetchingDbId(selectedDatasetId) {
    console.log("dataset id:", selectedDatasetId);
    this.setState({
      ...this.state,
      form: {
        ...this.state.form,
        datasetId: selectedDatasetId,
      },
      isSelectDatasetVisible: false,
    });
  }
  generateCode(str) {
    let hash = 0;
    for (let i = 0, len = str.length; i < len; i++) {
      let chr = str.charCodeAt(i);
      hash = (hash << 5) - hash + chr;
      hash |= 0;
    }
    return hash;
  }

  onChangeAppName = (event) => {
    this.setState({
      ...this.state,
      form: {
        ...this.state.form,
        name: event.target.value,
        hashKey: Math.abs(
          this.generateCode(new Date().toISOString() + event.target.value)
        ),
      },
    });
  };

  showSelectDataset() {
    this.setState({
      ...this.state,
      isSelectDatasetVisible: true,
    });
  }
  hideDialog() {
    this.setState({
      ...this.state,
      isSelectDatasetVisible: false,
    });
  }
  handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      return;
    }
    const formData = new FormData();
    formData.append("parent_id", this.state.form.parentId);
    formData.append("model_id", this.state.form.modelId);
    formData.append("dataset_id", this.state.form.datasetId);
    formData.append("new_application_name", this.state.form.name);
    this.setState({
      ...this.state,
      loadingActivated: true,
    });
    axios
      .post(`http://localhost:8000/${this.pathParams}`, formData)
      .then((response) => {
        this.setState({
          ...this.state,
          reponseFromRequest: response.data.message,
          loadingActivated: false,
        });
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          ...this.state,
          loadingActivated: false,
        });
      });
  };

  render() {
    console.log(this.state.form.datasetId,this.state.form.datasetId ? "secondary" : "primary")
    return (
      <div className="fit-component">
        <Form onSubmit={this.handleSubmit}>
          <div className="buttons">
            <Button
              variant={this.state.form.datasetId ? "secondary" : "primary"}
              onClick={() => this.showSelectDataset()}
            >
              Escolher Dados
            </Button>
          </div>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>DeepUAI App</Form.Label>
            <Form.Control
              type="text"
              placeholder="Digite um nome"
              onChange={this.onChangeAppName}
              required
            />
            <Form.Text className="text-muted">
              Esse nome será apresentado na tela de aplicações como título da
              aplicação criada
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="version">
            <Form.Label>Versão</Form.Label>
            <Form.Control
              type="text"
              disabled
              value={this.state.form.hashKey}
            />
            <Form.Text className="text-muted">
              Essa é a chave gerada para representar a versão desta aplicação
            </Form.Text>
          </Form.Group>
          <Button type="submit" variant="outline-dark">
            Enviar
          </Button>
        </Form>
        <div className="loading" hidden={!this.state.loadingActivated}>
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
          <span>
            A rede neural está processando as informações enviadas, por favor
            aguarde!
          </span>
        </div>
        <div className="response" hidden={!this.state.reponseFromRequest}>
          <span>{this.state.reponseFromRequest}</span>
        </div>
        <Modal
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={this.state.isSelectDatasetVisible}
          onHide={() => this.hideDialog()}
        >
          <Modal.Header closeButton>
            <Modal.Title
              id="contained-modal-title-vcenter"
              style={{ fontSize: "1.2rem" }}
            >
              Escolha do Conjunto de Dados
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <DatasetSelector
              callbackSelectDataset={(selectedDatasetId) => {
                this.fetchingDbId(selectedDatasetId);
              }}
            />
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

export default Fit2;
