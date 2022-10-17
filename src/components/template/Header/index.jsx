import './Header.css'
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

                    <NavDropdown title="Dados" id="basic-nav-dropdown">
                      <NavDropdown.Item as={Link} to="/">Dados Próprios</NavDropdown.Item>
                      <NavDropdown.Item as={Link} to="/">Dados da Comunidade</NavDropdown.Item>
                    </NavDropdown>

                    <NavDropdown title="Modelos" id="basic-nav-dropdown">
                      <NavDropdown.Item as={Link} to="/">Modelos Próprios</NavDropdown.Item>
                      <NavDropdown.Item as={Link} to="/">Modelos da Comunidade</NavDropdown.Item>
                    </NavDropdown>

                    <NavDropdown title="Aplicações" id="basic-nav-dropdown">
                      <NavDropdown.Item as={Link} to="/">Aplicações Próprias</NavDropdown.Item>
                      <NavDropdown.Item as={Link} to="/">Aplicações da Comunidade</NavDropdown.Item>
                    </NavDropdown>

                    <NavDropdown title="Outros" id="basic-nav-dropdown">
                      <NavDropdown.Item as={Link} to="/">Sobre</NavDropdown.Item>
                      <NavDropdown.Item href="https://github.com/deeplearnas">Repositório GitHub</NavDropdown.Item>
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