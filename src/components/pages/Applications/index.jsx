import React from 'react'
import axios from 'axios'
import { Button, Modal } from 'react-bootstrap'
import ApplicationCard from '../../utils/ApplicationCard'
import Predict from '../../utils/Predict'
import './Applications.css'

class Applications extends React.Component {

    constructor() {
        // request para a API para listar aplicações disponíveis
        super()
        this.state = {
            applications: [],
            isFitComponentVisible: false,
            isPredictComponentVisible: false
        }
    }

    componentDidMount() {
        axios.get(`http://localhost:8000/applications`)
            .then(response => {
                this.setState({
                    ...this.state,
                    applications: [...response.data]
                })
            })
            .catch(error => console.log(error))
    }

    showFitComponent(application) {
        this.setState({ 
            ...this.state,
            isFitComponentVisible: true,
            isPredictComponentVisible: false,
            applicationSelected: application
        })
    }

    showPredictComponent(application) {
        this.setState({ 
            ...this.state,
            isFitComponentVisible: false,
            isPredictComponentVisible: true,
            applicationSelected: application
        })
    }

    hideDialog() {
        this.setState({ 
            ...this.state,
            isFitComponentVisible: false,
            isPredictComponentVisible: false,
            applicationSelected: null
        })
    }

    render() {
        return (
            <div className='page-applications'>
                <section className='applications'>
                    {this.state.applications.map((application, id) => 
                        <ApplicationCard 
                            key={id}
                            applicationInfo={application}
                            callbackFit={() => this.showFitComponent(application)}
                            callbackPredict={() => this.showPredictComponent(application)}/>
                    )}
                </section>
                <Modal
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    show={this.state.isPredictComponentVisible}
                    onHide={() => this.hideDialog()}>
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter" style={{fontSize: '1.2rem'}}>
                            Classificação de Imagens
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Predict application={this.state.applicationSelected}/>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="outline-secondary" onClick={() => this.hideDialog()}>Fechar</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

export default Applications