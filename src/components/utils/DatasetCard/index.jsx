import React from 'react'
import { Button, Modal } from 'react-bootstrap'
import Gallery from '../Gallery'
import './DatasetCard.css'

class DatasetCard extends React.Component {

    constructor({ infos }) {
        super()
        this.id = infos.id
        this.name = infos.name
        this.application = infos.application
        this.n_images = infos.n_images
        this.n_classes = infos.n_classes
        this.size = infos.size

        this.state = {
            images: [],
            isGalleryComponentVisible: false
        }
    }

    getDatasetImages() {
        // request para pegar imagens do dataset
        const datasetExemplo = [
            'https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(1).webp',
            'https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(2).webp',
            'https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(3).webp',
            'https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(4).webp',
            'https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(5).webp',
            'https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(6).webp',
            'https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(7).webp',
            'https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(8).webp',
            'https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(9).webp',
            'https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(10).webp',
            'https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(11).webp',
            'https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(12).webp',
            'https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(13).webp',
            'https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(14).webp',
            'https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(15).webp',
            'https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(16).webp',
            'https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(17).webp',
            'https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(18).webp',
            'https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(19).webp',
            'https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(20).webp'
        ]

        this.setState({
            ...this.state,
            images: datasetExemplo
        })
    }

    async showGalleryComponent() {
        await this.getDatasetImages()

        this.setState({ 
            ...this.state,
            isGalleryComponentVisible: true
        })
    }

    hideDialog() {
        this.setState({
            ...this.state,
            isGalleryComponentVisible: false
        })
    }

    render() {
        return (
            <div className='card-dataset'>
                <div className='card-header'>
                    <h3 className="title">{this.name}</h3>
                </div>
                <div className='card-body'>
                    <div className='dataset-infos'>
                        <div>
                            <img src='/assets/icons/harddisk.png' style={{height: '30px', width: '30px', marginRight: '5px'}} alt="harddisk-icon" /> 
                            <span>{this.size}</span>
                        </div>
                        <div>
                            <img src='/assets/icons/gallery.png' style={{height: '30px', width: '30px', marginRight: '5px'}} alt="gallery-icon" /> 
                            <span>{this.n_images} Imagens</span>
                        </div>
                        <div>
                            <img src='/assets/icons/multicast.png' style={{height: '30px', width: '30px', marginRight: '5px'}} alt="multicast-icon" /> 
                            <span>{this.n_classes} Classes</span>
                        </div>
                    </div>
                    <div className='dataset-description'>
                        <h3 className="title">Aplicação</h3>
                        <p className='text-muted'>{this.application}</p>
                    </div>
                </div>
                <div className='buttons'>
                    <Button variant="outline-secondary" onClick={() => this.showGalleryComponent()}>Visualizar</Button>
                </div>
                <Modal
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    show={this.state.isGalleryComponentVisible}
                    onHide={() => this.hideDialog()}>
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter" style={{fontSize: '1.2rem'}} className="text-muted">
                            Imagens do dataset: <span style={{fontWeight: 600}}>{this.name}</span>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Gallery images={this.state.images}/>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="outline-secondary" onClick={() => this.hideDialog()}>Fechar</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

export default DatasetCard