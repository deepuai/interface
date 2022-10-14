import React from 'react'
import { Button, Modal } from 'react-bootstrap'
import ApplicationCard from '../../utils/ApplicationCard'
import FileUploader from '../../utils/FileUploader'
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

    showFitComponent() {
        this.setState({ 
            ...this.state,
            isFitComponentVisible: true,
            isPredictComponentVisible: false
        })
    }

    showPredictComponent() {
        this.setState({ 
            ...this.state,
            isFitComponentVisible: false,
            isPredictComponentVisible: true
        })
    }

    hideDialog() {
        this.setState({ 
            ...this.state,
            isFitComponentVisible: false,
            isPredictComponentVisible: false
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
                            callbackFit={() => this.showFitComponent()}
                            callbackPredict={() => this.showPredictComponent()}/>
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
                            Classificação de Imagem na Aplicação Selecionada
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <FileUploader />
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