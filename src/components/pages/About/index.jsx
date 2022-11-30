import { Card } from "react-bootstrap"

const About = () => {
    return (
        <Card className="text-center" style={{maxWidth: "60%"}}>
            <Card.Header>Informações</Card.Header>
            <Card.Body>
                <Card.Text>
                    Projeto desenvolvido pelos alunos Fábio, Rafael e Victor,
                    como parte do Trabalho Final de Graduação do curso de
                    Engenharia de Computação da UNIFEI
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default About