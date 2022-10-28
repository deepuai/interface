import React from 'react'
import axios from 'axios'
import { Button, Modal } from 'react-bootstrap'
import './Models.css'
import Fit from '../../utils/Fit'
import ModelCard from '../../utils/ModelCard'

class Models extends React.Component {

    constructor() {
        super()
        this.state = {
            models: [],
            isFitComponentVisible: false
        }
    }

    componentDidMount() {
        axios.get(`http://localhost:8080/models`)
            .then(response => {
                this.setState({
                    ...this.state,
                    models: [...response.data]
                })
            })
            .catch(error => console.log(error))
    }

    showFitComponent(model) {
        this.setState({ 
            ...this.state,
            isFitComponentVisible: true,
            modelSelected: model
        })
    }

    hideDialog() {
        this.setState({
            ...this.state,
            isFitComponentVisible: false,
            modelSelected: null
        })
    }

    render() {
        return (
            <div className='page-models'>
                <section className='models'>
                    {this.state.models.map((model, id) => 
                        <ModelCard
                            key={id}
                            modelInfo={model}
                            callbackFit={() => this.showFitComponent(model)}/>
                    )}
                </section>
                <Modal
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    show={this.state.isFitComponentVisible}
                    onHide={() => this.hideDialog()}>
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter" style={{fontSize: '1.2rem'}}>
                            Treinamento da Rede
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Fit modelOrApplication={this.state.modelSelected}/>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="outline-secondary" onClick={() => this.hideDialog()}>Fechar</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

export default Models