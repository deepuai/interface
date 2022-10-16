import React from 'react'
import Button from '../Button'
import './ApplicationCard.css'

class ApplicationCard extends React.Component {

    constructor({ applicationInfo, callbackPredict, callbackFit }) {
        super()
        this.name = applicationInfo.name
        this.version = applicationInfo.version
        this.datasetNumberOfImgs = applicationInfo.datasetNumberOfImgs
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
        // request para API para pegar pequeno conjunto de imagens utilizados na aplicação
        this.setState({
            imgURIs: [
                'https://cdn.pixabay.com/photo/2016/03/27/22/22/fox-1284512_960_720.jpg',
                'https://cdn.pixabay.com/photo/2017/02/20/18/03/cat-2083492_960_720.jpg',
                'https://cdn.pixabay.com/photo/2017/02/07/16/47/kingfisher-2046453_960_720.jpg',
                'https://cdn.pixabay.com/photo/2018/07/31/22/08/lion-3576045_960_720.jpg',
                'https://cdn.pixabay.com/photo/2017/09/25/13/12/cocker-spaniel-2785074_960_720.jpg',
                'https://cdn.pixabay.com/photo/2016/12/31/21/22/discus-fish-1943755_960_720.jpg',
                'https://cdn.pixabay.com/photo/2018/03/31/06/31/dog-3277416_960_720.jpg',
                'https://cdn.pixabay.com/photo/2019/08/19/07/45/corgi-4415649_960_720.jpg',
                'https://cdn.pixabay.com/photo/2016/12/04/21/58/rabbit-1882699_960_720.jpg',
                'https://cdn.pixabay.com/photo/2016/10/31/14/55/rottweiler-1785760_960_720.jpg',
                'https://cdn.pixabay.com/photo/2017/02/18/13/55/swan-2077219_960_720.jpg',
                'https://cdn.pixabay.com/photo/2016/07/15/15/55/dachshund-1519374_960_720.jpg'
        ]})
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
                            </div>
                        </div>
                    </div>
                </div>
                <div className='card-footer'>
                    <Button onClick={this.callbackPredict} iconURI='/assets/icons/predict.png'>Classificar</Button>
                    <Button onClick={this.callbackFit} iconURI='/assets/icons/train.png'>Treinar</Button>
                </div>
            </div>
        )
    }
}

export default ApplicationCard