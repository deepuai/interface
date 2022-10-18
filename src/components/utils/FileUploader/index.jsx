import './FileUploader.css'

import axios from 'axios'
import { Component } from "react"
import { Button, Spinner } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';

class FileUploader extends Component {
    state = {
        selectedFile: null,
        fileHasChanged: false,
        loadingActivated: false
    }

    constructor({ pathParam, cbAfterFileHasChanged, cbAfterRequest }) {
        super()
        this.pathParam = pathParam
        this.cbAfterRequest = cbAfterRequest
        this.cbAfterFileHasChanged = cbAfterFileHasChanged
    }

    onFileChange = event => {
        this.setState({ 
            ...this.state,
            selectedFile: event.target.files[0],
            fileHasChanged: true
        })
        this.cbAfterFileHasChanged()
    }
    
    onFileUpload = () => {
        const formData = new FormData()
        formData.append(
            "img_file",
            this.state.selectedFile,
            this.state.selectedFile.name
        )
        this.setState({
            ...this.state,
            loadingActivated: true,
            fileHasChanged: false
        })
        axios.post(`http://localhost:8000/${this.pathParam}`, formData)
            .then(response => {
                this.setState({
                    ...this.state,
                    loadingActivated: false
                })
                return this.cbAfterRequest(response)
            })
            .catch(error => {
                console.log(error)
                this.setState({
                    ...this.state,
                    loadingActivated: false
                })
            })
    }

    render() {
        return (
            <div className='file-uploader'>
                <div className='form'>
                    <Form.Group controlId="formFile" className="mb-2">
                        <Form.Label>Envie uma imagem para o modelo realizar a predição</Form.Label>
                        <Form.Control type="file" onChange={this.onFileChange}/>
                    </Form.Group>
                    <div className='btn'>
                        <Button
                            onClick={this.onFileUpload}
                            variant="outline-dark"
                            disabled={!this.state.selectedFile}
                            hidden={!this.state.selectedFile || !this.state.fileHasChanged}>
                                Enviar
                        </Button>
                    </div>
                </div>
                <div className='form-loading' hidden={!this.state.loadingActivated}>
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                    <span>
                        A rede neural está processando a imagem enviada, por favor aguarde! 
                    </span>
                </div>
            </div>
        )
    }
}

export default FileUploader