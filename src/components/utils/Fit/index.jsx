import './Fit.css'

import React from 'react'
import FileUploader from '../../utils/FileUploader'

class Fit extends React.Component {

    constructor({ application }) {
        super()
        this.labelFileUploader = 'Envie um arquivo zip com imagens, para treinar ainda mais essa rede.'
        this.tooltipInfoFileUploader = 'O nome das imagens, dentro do zip, será utilizado como rótulo de treinamento.'
        this.state = {
            pathParams: `${application.name.toLowerCase()}/${application.datasetName.toLowerCase()}/fit`
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