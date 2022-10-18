import React from 'react'
import axios from 'axios'
import TooltipButton from '../TooltipButton'
import './ApplicationCard.css'

class ApplicationCard extends React.Component {

    constructor({ applicationInfo, callbackPredict, callbackFit }) {
        super()
        this.name = applicationInfo.name
        this.version = applicationInfo.version
        this.datasetNumberOfImgs = applicationInfo.datasetNumberOfImgs
        this.datasetName = applicationInfo.datasetName
        this.datasetSize = applicationInfo.datasetSize
        this.datasetNumberOfClasses = applicationInfo.datasetNumberOfClasses
        this.modelName = applicationInfo.modelName
        this.modelNumberOfParams = applicationInfo.modelNumberOfParams
        this.modelNumberOfLayers = applicationInfo.modelNumberOfLayers
        this.modelSize = applicationInfo.modelSize
        this.applicationAccuracy = applicationInfo.applicationAccuracy
        this.applicationNumberOfAccesses = applicationInfo.applicationNumberOfAccesses
        
        this.callbackPredict = callbackPredict
        this.callbackFit = callbackFit
        
        this.state = {
            imgURIs: []
        }
    }

    componentDidMount() {
        this.loadSomeImgsUsedToFit()
    }

    loadSomeImgsUsedToFit() {
        const params = {
                'application': this.name,
                'datasetName': this.datasetName
        }
        axios.get(`http://localhost:8000/dataset`, { params: params })
            .then(response => {
                this.setState({
                    ...this.state,
                    imgURIs: [...response.data.datasetImagens]
                })
            })
            .catch(error => console.log(error))
    }

    render() {

        return (
            <div className='card-application'>
                <div className='card-header'>
                    <h3 className="title">{ this.name }</h3>
                    <h6 className="subtitle text-muted">VERSÃO: { this.version }</h6>
                </div>
                <div className='card-body'>
                    <div className='dataset'>
                        <h5 className='dataset-title'>Conjunto de Dados</h5>
                        <div className='dataset-body'>
                            <h5 className='dataset-name'>Imagens Aleatórias da Internet</h5>
                            <div className='dataset-imgs'>
                                {this.state.imgURIs.map(imgURI => <img src={imgURI} alt='Exemplo de input utilizado no aprendizado da rede' key={imgURI}/> )}
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
                                            <span>{ this.applicationAccuracy }% de Precisão*</span>
                                            <span style={{display: 'block'}} className="text-muted">*Avaliado sob o subconjunto de teste do próprio conjunto de dados.</span>
                                        </div>
                                    </div>
                                    <div>
                                        <img src='/assets/icons/people.png' style={{height: '30px', width: '30px', marginRight: '5px'}} alt="hardisk-icon"/> 
                                        <div>
                                            <span>{ this.applicationNumberOfAccesses } acessos da comunidade</span>
                                            <span style={{display: 'block'}} className="text-muted">3.8 mil usuários utilizaram essa rede para classificar os próprios dados.</span>
                                        </div>
                                    </div>
                                </div>
                                <div className='buttons'>
                                    <TooltipButton onClick={this.callbackPredict} iconURI='/assets/icons/predict.png' tooltipText='Classificar' />
                                    <TooltipButton onClick={this.callbackFit} iconURI='/assets/icons/train.png' tooltipText='Treinar' />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ApplicationCard