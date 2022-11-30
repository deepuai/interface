import './Header.css'
import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import { Col, Row } from 'react-bootstrap';

const Header = () => {
    return (
      <header className='header'>
        <Navbar bg="light" expand="lg" style={{ fontSize: '15px' }}>
          <Container>
            <Row>
              <Col>
                <Navbar.Brand as={Link} to="/" className='title'>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/EFEI_logo.png/640px-EFEI_logo.png" width="33" height="33" className="d-inline-block align-top me-2" alt=""/>
                    <span className='title-sm'>DeepUAI</span>
                    <span className='title-lg'>: Aplicações de Redes Neurais</span>
                </Navbar.Brand>
              </Col>
              <Col>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="me-auto">

                    <Nav.Link id="nav-link" as={Link} to="/community/datasets">Dados</Nav.Link>

                    <Nav.Link id="nav-link" as={Link} to="/community/models">Modelos</Nav.Link>

                    <NavDropdown title="Aplicações" id="nav-dropdown">
                      <NavDropdown.Item as={Link} to="/community/applications">Disponíveis</NavDropdown.Item>
                      <NavDropdown.Item as={Link} to="/community/applications/queue">Na fila</NavDropdown.Item>
                    </NavDropdown>

                    <NavDropdown title="Outros" id="nav-dropdown">
                      <NavDropdown.Item as={Link} to="/about">Sobre</NavDropdown.Item>
                      <NavDropdown.Item href="https://github.com/deepuai" target="_blank">Repositório GitHub</NavDropdown.Item>
                    </NavDropdown>

                  </Nav>
                </Navbar.Collapse>
              </Col>
            </Row>
          </Container>
        </Navbar>
      </header>
    );
}

export default Header