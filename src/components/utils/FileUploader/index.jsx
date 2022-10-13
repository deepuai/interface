import './FileUploader.css'

import axios from 'axios'
import { Component } from "react"
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';

class FileUploader extends Component {
    state = { selectedFile: null }

    onFileChange = event => {
        this.setState({ selectedFile: event.target.files[0] })
    }
    
    onFileUpload = () => {
        const formData = new FormData()
        formData.append(
            "img_file",
            this.state.selectedFile,
            this.state.selectedFile.name
        )
        console.log(this.state.selectedFile)
        axios.post("http://localhost:8000/resnet50/eval", formData)
    }

    fileData = () => {
        if (this.state.selectedFile) {
            return (
                <div>
                    <h2>File Details:</h2>
                    <p>File Name: {this.state.selectedFile.name}</p>
                    <p>File Type: {this.state.selectedFile.type}</p>
                    {/* <p>
                        Last Modified:{" "}
                        {this.state.selectedFile.lastModifiedDate.toDateString()}
                    </p> */}

                </div>
            )
        } else {
            return (
                <div>
                    <br />
                    <h4>Selecione um arquivo antes de clicar Upload</h4>
                </div>
            )
        }
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
                        <Button onClick={this.onFileUpload} variant="outline-dark"> Upload </Button>
                    </div>
                </div>
                {this.fileData()}
            </div>
        )
    }
}

export default FileUploader