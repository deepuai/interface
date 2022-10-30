import React from 'react'
import './ModelCard.css'
import { Button } from 'react-bootstrap'

class ModelCard extends React.Component {

    constructor({ modelInfo, callbackFit }) {
        super()
        this.name = modelInfo.model_name
        this.autors = modelInfo.autors
        this.description = modelInfo.description
        this.numberOfParams = modelInfo.n_params
        this.numberOfLayers = modelInfo.n_layers
        this.size = modelInfo.size
        this.dateOfCreation = modelInfo.created_on
        
        this.callbackFit = callbackFit
    }

    render() {

        return (
            <div className='card-model'>
                <div className='card-header'>
                    <h3 className="title">{ this.name }</h3>
                </div>
                <div className='card-body'>
                    <div className='model-infos'>
                        <div>
                            <img src='/assets/icons/params.png' style={{height: '30px', width: '30px', marginRight: '5px'}} alt="params-icon"/> 
                            <span>{ this.numberOfParams } Parâmetros</span>
                        </div>
                        <div>
                            <img src='/assets/icons/layers.png' style={{height: '30px', width: '30px', marginRight: '5px'}} alt="layers-icon"/> 
                            <span>{ this.numberOfLayers } Camadas</span>
                        </div>
                        <div>
                            <img src='/assets/icons/harddisk.png' style={{height: '30px', width: '30px', marginRight: '5px'}} alt="harddisk-icon" /> 
                            <span>{ this.size }</span>
                        </div>
                        <div>
                            <img src='/assets/icons/time.png' style={{height: '30px', width: '30px', marginRight: '5px'}} alt="time-icon" /> 
                            <span>{ this.dateOfCreation }</span>
                        </div>
                    </div>
                    <div className='model-description'>
                        <h3 className="title">Descrição</h3>
                        <p className='paragraph text-muted'>{ this.description }</p>
                    </div>
                    <div className='model-autors'>
                        <h3 className="title">Autores</h3>
                        <p className='paragraph text-muted'>{ this.autors }</p>
                    </div>
                </div>
                <div className='buttons' hidden={true}>
                    <Button variant="outline-secondary" onClick={this.callbackFit}>Treinar</Button>
                </div>
            </div>
        )
    }
}

export default ModelCard