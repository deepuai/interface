import React from 'react'
import { useState } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import './Gallery.css'

const Gallery = ({ images }) => {

    const [slicedImagesIntoLines, setSlicedImagesIntoLines] = useState([])
    const [numberOfImgLinesShowing, setNumberOfImgLines] = useState(4)

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
            <Row key={`${images[0]}-${images[1]}-${images[2]}`}>
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
        const imgLines = []
        if (!slicedImagesIntoLines.length) {
            setSlicedImagesIntoLines(sliceArray(images, 3))
        }
        const __numberOfImgLines = numberOfImgLinesShowing < slicedImagesIntoLines.length ? numberOfImgLinesShowing : slicedImagesIntoLines.length
        for (let i = 0; i < __numberOfImgLines; i++) {
            imgLines.push(lineOfImages(slicedImagesIntoLines[i]))
        }
        return imgLines
    }

    const loadMoreImages = () => {
        setNumberOfImgLines(numberOfImgLinesShowing + 2)
    }

    return (
        <Container className='gallery'>
            {createGalleryOfImages()}
            <Button variant="outline-primary" onClick={loadMoreImages} hidden={slicedImagesIntoLines.length === numberOfImgLinesShowing}>
                + Carregar mais
            </Button>
        </Container>
    )
}

export default Gallery