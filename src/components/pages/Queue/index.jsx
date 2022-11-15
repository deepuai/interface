import React from 'react'
import axios from 'axios'
import { Table } from 'react-bootstrap'
import './Queue.css'

class Queue extends React.Component {

    constructor() {
        super()
        this.state = {
            applications: []
        }
    }

    componentDidMount() {
        axios
          .get(`http://localhost:8080/applications/queue`)
          .then((response) => {
            this.setState({
              ...this.state,
              applications: [...response.data],
            });
          })
          .catch((error) => console.log(error))
      }

    render() {
        return (
            <div className='page-queue'>
                {!this.state.applications.length ? 
                    <h5 className='text-muted'>A fila está vazia</h5> :
                    <Table bordered hover>
                        <thead>
                            <tr style={{backgroundColor: '#eee'}}>
                                <th>ID</th>
                                <th>Nome da Aplicação</th>
                                <th>Nome do Modelo</th>
                                <th>Versão</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.applications.map(app => {
                                return (
                                    <tr>
                                        <td style={{backgroundColor: '#eee'}}>{ app.id }</td>
                                        <td>{ app.name }</td>
                                        <td>{ app.model_name }</td>
                                        <td>{ app.version }</td>
                                        <td style={{backgroundColor: app.status === 'WAITING' ? 'rgb(240, 240, 128)' : 'rgb(131, 255, 131)'}}>
                                            { app.status === 'WAITING' ? 'ESPERANDO' : 'TREINANDO' }
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                }
            </div>
        )
    }
}

export default Queue