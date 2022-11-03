import "./NewDataset.css";
import React from "react";
import axios from "axios";
import FileUploader from "../../utils/FileUploader";
import { Button, Form, Spinner } from "react-bootstrap";

class NewDataset extends React.Component {
  constructor() {
    super();
    this.labelFileUploader =
      "Envie um arquivo zip com imagens para criar um conjunto de dados.";
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
      },
      name: '',
      loadingActivated: false,
      reponseFromRequest: null,
    };
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
      name:event.target.files[0].name.split('.')[0],
      reponseFromRequest: null,
    });
  };

  handleSubmit = (event) => {
    const pathParams = "dataset/upload";
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      return;
    }
    const formData = new FormData();
    formData.append(
      this.state.form.file.type,
      this.state.form.file.selected,
      this.state.form.file.selected.name
    );
    this.setState({
      ...this.state,
      loadingActivated: true,
    });
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
      <div className="new-dataset-component">
        <Form onSubmit={this.handleSubmit}>
          <FileUploader
            label={this.labelFileUploader}
            tooltipInfo={this.tooltipInfoFileUploader}
            cbOnChangeFile={(response) => this.onChangeUploadFile(response)}
          />
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>DeepUAI Conjunto de Dados</Form.Label>
            <Form.Control
              type="text"
              value={this.state.name}
              placeholder="O nome do conjunto de dados será o mesmo do arquivo enviado"
              readOnly
              required
            />
            <Form.Text className="text-muted">
              Esse nome será apresentado na tela de dados como título do
              conjunto de dados
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
          <span>Os arquivos estão sendo salvos, por favor aguarde!</span>
        </div>
        <div className="response" hidden={!this.state.reponseFromRequest}>
          <span>{this.state.reponseFromRequest}</span>
        </div>
      </div>
    );
  }
}

export default NewDataset;
