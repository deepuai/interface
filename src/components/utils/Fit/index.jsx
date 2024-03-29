import "./Fit.css";

import React from "react";
import axios from "axios";
import FileUploader from "../../utils/FileUploader";
import DatasetSelector from "../../utils/DatasetSelector";
import { Button, Form, Spinner, Modal } from "react-bootstrap";

class Fit extends React.Component {
  constructor({ modelOrApplication }) {

    super();
    console.log(modelOrApplication)
    this.application_path =
      modelOrApplication.model_name.toLowerCase() +
      `${
        modelOrApplication.version
          ? ('/'+modelOrApplication.version.toLowerCase())
          : "/random"
      }/fit`;
    this.labelFileUploader =
      "Envie um arquivo zip com imagens para treinar essa rede.";
    this.tooltipInfoFileUploader = `
            As imagens devem ser organizadas dentro de pastas, com nomes relacionados à sua classificação. Exemplo:
            img/cachorro/cachorro1.jpg, img/cachorro/cachorro2.jpg,
            img/gato/gato1.jpg, img/gato/gato2.jpg.`;

    this.state = {
      form: {
        file: {
          type: "zip_file",
          selected: null,
        },
        name: null,
        hashKey: "",
        parentId: modelOrApplication["application_id"]??-1,
        modelId: modelOrApplication["model_id"]??modelOrApplication["id"],
        datasetId: null,
        datasetName: null,
      },
      loadingActivated: false,
      reponseFromRequest: null,
      dataMode: "upload",
      isSelectDatasetVisible: false,
    };
  }
  fetchingDbId(selectedDatasetId, selectedDatasetName) {
    this.setState({
      ...this.state,
      form: {
        ...this.state.form,
        datasetId: selectedDatasetId,
        datasetName: selectedDatasetName,
      },
      isSelectDatasetVisible: false,
    });
  }
  showSelectDataset() {
    this.setState({
      ...this.state,
      isSelectDatasetVisible: true,
    });
  }
  hideSelectDataset() {
    this.setState({
      ...this.state,
      isSelectDatasetVisible: false,
    });
  }
  get isUploadFileSelected() {
    return this.state.dataMode === "upload";
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

  onChangeUploadFile = (event) => {
    this.setState({
      ...this.state,
      form: {
        ...this.state.form,
        file: {
          type: "zip_file",
          selected: event.target.files[0],
        },
      },
      reponseFromRequest: null,
    });
  };

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
      reponseFromRequest: null,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      return;
    }
    const formData = new FormData();
    formData.append("parent_id", this.state.form.parentId);
    formData.append("deepuai_app", this.state.form.name);
    formData.append("version", this.state.form.hashKey);
    formData.append("model_id", this.state.form.modelId);
    if (this.isUploadFileSelected)
      formData.append(
        this.state.form.file.type,
        this.state.form.file.selected,
        this.state.form.file.selected.name
      );
    else formData.append("dataset_id", this.state.form.datasetId);
    this.setState({
      ...this.state,
      loadingActivated: true,
    });
    const pathParams =
      this.application_path + (this.isUploadFileSelected ? "/file" : "/dataset");
    axios
      .post(`http://localhost:8000/${pathParams}`, formData)
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
    return (
      <div className="fit-component">
        <Form onSubmit={this.handleSubmit}>
          <Form.Check
            checked={this.isUploadFileSelected}
            type="switch"
            id="custom-switch"
            style={{ paddingTop: "8px", paddingBottom: "8px" }}
            label={
              this.isUploadFileSelected
                ? "Envie seu Conjunto de Dados"
                : "Escolha seu Conjunto de Dados"
            }
            onChange={(event) => {
              this.setState({
                ...this.state,
                dataMode:
                  this.state.dataMode === "upload" ? "select" : "upload",
              });
            }}
          />
          {this.state.dataMode === "select" ? (
            <Button
              className="btn-select-dataset"
              variant={this.state.form.datasetId ? "secondary" : "primary"}
              onClick={() => this.showSelectDataset()}
            >
              {this.state.form.datasetId
                ? this.state.form.datasetName
                : "Escolher Dados"}
            </Button>
          ) : (
            <FileUploader
              label={this.labelFileUploader}
              tooltipInfo={this.tooltipInfoFileUploader}
              cbOnChangeFile={(response) => this.onChangeUploadFile(response)}
            />
          )}
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
          onHide={() => this.hideSelectDataset()}
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
              callbackSelectDataset={(
                selectedDatasetId,
                selectedDatasetName
              ) => {
                this.fetchingDbId(selectedDatasetId, selectedDatasetName);
              }}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="outline-secondary"
              onClick={() => this.hideSelectDataset()}
            >
              Fechar
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default Fit;
