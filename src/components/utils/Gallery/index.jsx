import { Col, Container, Row } from 'react-bootstrap'
import './Gallery.css'

const Gallery = ({ images }) => {

    const sliceArray = (array, size) => {
        var id = 0
        var arrayLength = array.length
        var temp = []
        
        for (id = 0; id < arrayLength; id += size) {
            const slice = array.slice(id, id + size)
            temp.push(slice)
        }
    
        return temp
    }

    const lineOfImages = (images) => {
        return (
            <Row>
                {images[0] && <Col lg={4} md={12} className='mb-4 mb-lg-0'>
                    <img
                        src={images[0]}
                        className='w-100 shadow-1-strong rounded mb-4'
                        alt='primeira imagem dessa linha'
                    />
                </Col>}
                {images[1] && <Col lg={4} className='mb-4 mb-lg-0'>
                    <img
                        src={images[1]}
                        className='w-100 shadow-1-strong rounded mb-4'
                        alt='segunda imagem dessa linha'
                        />
                </Col>}
                {images[2] && <Col lg={4} className='mb-4 mb-lg-0'>
                    <img
                        src={images[2]}
                        className='w-100 shadow-1-strong rounded mb-4'
                        alt='terceira imagem dessa linha'
                    />
                </Col>}
            </Row>
        )
    }

    const createGalleryOfImages = () => {
        const slicedImages = sliceArray(images, 3)
        return slicedImages.map(images =>  lineOfImages(images))
    }

    return (
        <Container className='gallery'>
            {createGalleryOfImages()}
        </Container>
    )
}

export default Gallery