import './Fit.css'

import React from 'react'
import axios from 'axios'
import FileUploader from '../../utils/FileUploader'
import { Button, Form, Spinner } from 'react-bootstrap'

class Fit extends React.Component {

    constructor({ modelOrApplication }) {
        super()
        this.labelFileUploader = 'Envie um arquivo zip com imagens para treinar essa rede.'
        this.tooltipInfoFileUploader = `
            As imagens devem ser organizadas dentro de pastas, com nomes relacionados à sua classificação. Exemplo:
            img/cachorro/cachorro1.jpg, img/cachorro/cachorro2.jpg,
            img/gato/gato1.jpg, img/gato/gato2.jpg.`

        this.pathParams =  `${modelOrApplication.model_name.toLowerCase()}
            ${modelOrApplication.version ? '/' + modelOrApplication.version.toLowerCase() : ''}/fit`
        this.state = {
            form: {
                file: {
                    type: 'zip_file',
                    selected: null
                } 
            },
            loadingActivated: false,
            reponseFromRequest: null
        }
    }

    onChangeUploadFile = event => {
        this.setState({ 
            ...this.state,
            form: {
                ...this.state.form,
                file: {
                    type: 'zip_file',
                    selected: event.target.files[0]
                },
            },
            reponseFromRequest: null,
        })
    }

    onChangeAppName = event => {
        this.setState({ 
            ...this.state,
            form: {
                ...this.state.form,
                name: event.target.value,
                hashKey: event.target.value + '_versão XYZ'
            },
            reponseFromRequest: null,
        })
    }

    handleSubmit = event => {
        event.preventDefault()
        const form = event.currentTarget
        if (form.checkValidity() === false) {
            event.stopPropagation()
            return
        }
        const formData = new FormData()
        formData.append(
            this.state.form.file.type,
            this.state.form.file.selected,
            this.state.form.file.selected.name
        )
        this.setState({
            ...this.state,
            loadingActivated: true
        })
        axios.post(`http://localhost:8000/${this.pathParams}`, formData)
            .then(response => {
                this.setState({
                    ...this.state,
                    reponseFromRequest: response.data.message,
                    loadingActivated: false
                })
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
            <div className='fit-component'>
                <Form onSubmit={this.handleSubmit}>
                    <FileUploader 
                        label={this.labelFileUploader}
                        tooltipInfo={this.tooltipInfoFileUploader}
                        cbOnChangeFile={(response) => this.onChangeUploadFile(response)}/>
                    <Form.Group className="mb-3" controlId="name">
                        <Form.Label>DeepUAI App</Form.Label>
                        <Form.Control type="text" placeholder="Digite um nome" onChange={this.onChangeAppName} required/>
                        <Form.Text className="text-muted">
                            Esse nome será apresentado na tela de aplicações como título da aplicação criada
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="version">
                        <Form.Label>Versão</Form.Label>
                        <Form.Control type="text" disabled value={this.state.form.hashKey}/>
                        <Form.Text className="text-muted">
                            Essa é a chave gerada para representar a versão desta aplicação
                        </Form.Text>
                    </Form.Group>
                    <Button type="submit" variant="outline-dark">
                        Enviar
                    </Button>
                </Form>
                <div className='loading' hidden={!this.state.loadingActivated}>
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                    <span>
                        A rede neural está processando as informações enviadas, por favor aguarde! 
                    </span>
                </div>
                <div className='response' hidden={!this.state.reponseFromRequest}>
                    <span>
                        {this.state.reponseFromRequest}
                    </span>
                </div>
            </div>
        )
    }
    }

export default Fit