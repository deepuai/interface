import React from 'react'
import { Button, Modal } from 'react-bootstrap'
import ApplicationCard from '../../utils/ApplicationCard'
import Predict from '../../utils/Predict'
import './Applications.css'

class Applications extends React.Component {

    constructor() {
        // request para a API para listar aplicações disponíveis
        super()
        const resnet50 = {
            name: 'ResNet50',
            version: 'ImageNet',
            applicationAccuracy: 100,
            applicationNumberOfAccesses: '3.8 mil',
            datasetSize: '2.1 GB',
            datasetNumberOfImgs: 1024,
            datasetNumberOfClasses: 28,
            modelName: 'ResNet50',
            modelNumberOfParams: '25.6M',
            modelNumberOfLayers: 28,
            modelSize: '88 MB'
        }
        this.state = {
            applications: [resnet50, resnet50, resnet50, resnet50, resnet50, resnet50],
            isFitComponentVisible: false,
            isPredictComponentVisible: false
        }
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
                        <Modal.Title id="contained-modal-title-vcenter">
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