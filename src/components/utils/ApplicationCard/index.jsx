import React from 'react'
import './ApplicationCard.css'
import { Button, Modal } from 'react-bootstrap'
import Version from '../Version'

class ApplicationCard extends React.Component {

    constructor({ applicationInfo, callbackPredict, callbackFit }) {
        super()
        this.applicationId = applicationInfo.application_id
        this.name = applicationInfo.application_name
        this.version = applicationInfo.version
        this.datasetNumberOfImgs = applicationInfo.n_images
        this.datasetName = applicationInfo.dataset_name
        this.datasetSize = applicationInfo.dataset_size
        this.datasetNumberOfClasses = applicationInfo.n_classes
        this.modelName = applicationInfo.model_name
        this.modelNumberOfParams = applicationInfo.n_params
        this.modelNumberOfLayers = applicationInfo.n_layers
        this.modelSize = applicationInfo.model_size
        this.applicationAccuracy = applicationInfo.accuracy
        this.applicationNumberOfAccesses = applicationInfo.n_accesses
        this.imgURIs = applicationInfo.images
        
        this.callbackPredict = callbackPredict
        this.callbackFit = callbackFit

        this.state = {
            isVersionComponentVisible: false
        }
    }

    showVersionComponent() {
        this.setState({ 
            ...this.state,
            isVersionComponentVisible: true
        })
    }

    hideDialog() {
        this.setState({
            ...this.state,
            isVersionComponentVisible: false
        })
    }

    render() {

        return (
            <div className='card-application'>
                <div className='card-header'>
                    <h3 className="title">{ this.name }</h3>
                    <h6 className="subtitle text-muted" onClick={() => this.showVersionComponent()}>VERSÃO: { this.version }</h6>
                </div>
                <div className='card-body'>
                    <div className='dataset'>
                        <h5 className='dataset-title'>Conjunto de Dados</h5>
                        <div className='dataset-body'>
                            <h5 className='dataset-name'> {this.datasetName} </h5>
                            <div className='dataset-imgs'>
                                {this.imgURIs.map(imgURI => <img src={imgURI} alt='Exemplo de input utilizado no aprendizado da rede' key={imgURI}/> )}
                            </div>
                            <div className='dataset-infos'>
                                <div>
                                    <img src='/assets/icons/gallery.png' style={{height: '30px', width: '30px', marginRight: '5px'}} alt="img-icon"/> 
                                    <span>{ this.datasetNumberOfImgs } Imagens</span>
                                </div>
                                <div>
                                    <img src='/assets/icons/harddisk.png' style={{height: '30px', width: '30px', marginRight: '5px'}} alt="hardisk-icon"/> 
                                    <span>{ this.datasetSize }</span>
                                </div>
                                <div>
                                    <img src='/assets/icons/multicast.png' style={{height: '30px', width: '30px', marginRight: '5px'}} alt="classes-icon" /> 
                                    <span>{ this.datasetNumberOfClasses } Classes</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='neural-network'>
                        <h5 className='title'>Modelo de Rede Neural</h5>
                        <div className='neural-network-body'>
                            <div className='neural-network-infos'>
                                <h5 className='neural-network-name'>{ this.modelName }</h5>
                                <div className='neural-network-config'>
                                    <div>
                                        <img src='/assets/icons/params.png' style={{height: '30px', width: '30px', marginRight: '5px'}} alt="img-icon"/> 
                                        <span>{ this.modelNumberOfParams } Parâmetros</span>
                                    </div>
                                    <div>
                                        <img src='/assets/icons/layers.png' style={{height: '30px', width: '30px', marginRight: '5px'}} alt="hardisk-icon"/> 
                                        <span>{ this.modelNumberOfLayers } Camadas</span>
                                    </div>
                                    <div>
                                        <img src='/assets/icons/harddisk.png' style={{height: '30px', width: '30px', marginRight: '5px'}} alt="classes-icon" /> 
                                        <span>{ this.modelSize }</span>
                                    </div>
                                </div>
                            </div>
                            <div className='neural-network-metrics'>
                                <h5 className='title'>Métricas</h5>
                                <div className='neural-network-metrics-imgs'>
                                    <div>
                                        <img src='/assets/icons/accuracy.png' style={{height: '30px', width: '30px', marginRight: '5px'}} alt="img-icon"/> 
                                        <div>
                                            <span>{ (this.applicationAccuracy * 100).toFixed(2) }% de Precisão*</span>
                                            <span style={{display: 'block'}} className="text-muted">*Avaliado sob o subconjunto de teste do próprio conjunto de dados.</span>
                                        </div>
                                    </div>
                                    <div>
                                        <img src='/assets/icons/people.png' style={{height: '30px', width: '30px', marginRight: '5px'}} alt="hardisk-icon"/> 
                                        <div>
                                            <span>{ this.applicationNumberOfAccesses } acessos da comunidade</span>
                                            <span style={{display: 'block'}} className="text-muted">{ this.applicationNumberOfAccesses } usuários utilizaram essa rede para classificar os próprios dados.</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='buttons'>
                    <Button variant="outline-secondary" onClick={this.callbackPredict}>Classificar</Button>
                    <Button variant="outline-secondary" onClick={this.callbackFit}>Treinar</Button>
                </div>
                <Modal
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    show={this.state.isVersionComponentVisible}
                    onHide={() => this.hideDialog()}>
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter" style={{fontSize: '1.2rem'}}>
                            Histórico de Versão da Aplicação {this.name}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Version applicationId={this.applicationId}/>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="outline-secondary" onClick={() => this.hideDialog()}>Fechar</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

export default ApplicationCard