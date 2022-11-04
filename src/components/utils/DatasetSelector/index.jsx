import "./DatasetSelector.css";

import React from "react";
import axios from "axios";
import DatasetCard from "../../utils/DatasetCard";
import { Container } from "react-bootstrap";

class DatasetSelector extends React.Component {
  constructor({ callbackSelectDataset }) {
    super();
    this.callbackSelectDataset = callbackSelectDataset;
    this.state = {
      datasets: [],
    };
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
      <div className="datasets-list">
        <Container>
          {this.state.datasets.map((infos) => (
            <DatasetCard
              infos={infos}
              key={infos.id}
              isSelecting={true}
              callbackSelect={(datasetId) => {
                this.callbackSelectDataset(datasetId);
              }}
            />
          ))}
        </Container>
      </div>
    );
  }
}

export default DatasetSelector;
