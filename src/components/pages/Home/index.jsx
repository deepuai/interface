import './Home.css'
import React from 'react'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className='page-home'>
            <Card className="text-center">
                <Card.Header>Página Inicial</Card.Header>
                <Card.Body>
                    <Card.Title>Você está pronto para iniciar sua jornada no mundo das redes neurais artificiais?</Card.Title>
                    <Card.Text>
                        Na DeepUai você têm a possibilidade de treinar e utilizar redes neurais de uma forma fácil e rápida!
                    </Card.Text>
                    <Button as={Link} variant="outline-dark" to="/community/applications" >Clique aqui para começar </Button>
                </Card.Body>
            </Card>
        </div>
    )
}

export default Home