import './Fit.css'

import React from 'react'
import FileUploader from '../../utils/FileUploader'

class Fit extends React.Component {

    constructor({ modelOrApplication }) {
        super()
        this.labelFileUploader = 'Envie um arquivo zip com imagens para treinar essa rede.'
        this.tooltipInfoFileUploader = `
            As imagens devem ser organizadas dentro de pastas, com nomes relacionados à sua classificação. Exemplo:
            img/cachorro/cachorro1.jpg, img/cachorro/cachorro2.jpg,
            img/gato/gato1.jpg, img/gato/gato2.jpg.
        `

        const pathParams =  `${modelOrApplication.name.toLowerCase()}
            ${modelOrApplication.datasetName ? '/' + modelOrApplication.datasetName.toLowerCase() : ''}/fit`
        this.state = {
            pathParams: pathParams
        }
    }

    render() {
        return (
            <div className='predict-component'>
                <FileUploader 
                    label={this.labelFileUploader}
                    tooltipInfo={this.tooltipInfoFileUploader}
                    fileType='zip_file'
                    pathParam={this.state.pathParams}
                    cbAfterFileHasChanged={() => {}}
                    cbAfterRequest={(response) => {}}/>
            </div>
        )
    }
    }

export default Fit