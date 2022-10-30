import React from 'react'
import DatasetCard from '../../utils/DatasetCard'
import './Datasets.css'

class Datasets extends React.Component {

    constructor() {
        super()
        this.state = {
            datasets: []
        }
    }

    componentDidMount() {
        // request para listar datasets
        this.setState({
            datasets: [
                {
                    'id': 1,
                    'name': 'Imagens Aleatórias 1',
                    'application': 'Classificação de Frutas',
                    'n_images': 200,
                    'n_classes': 5,
                    'size': '200 MB'
                },
                {
                    'id': 2,
                    'name': 'Imagens Aleatórias 2',
                    'application': 'Classificação de Objetos',
                    'n_images': 200,
                    'n_classes': 5,
                    'size': '200 MB'
                },
                {
                    'id': 3,
                    'name': 'Imagens Aleatórias 3',
                    'application': 'Classificação Qualquer',
                    'n_images': 200,
                    'n_classes': 5,
                    'size': '200 MB'
                }
            ]
        })
    }

    render() {
        return (
            <div className='page-datasets'>
                <div className='datasets'>
                    {this.state.datasets.map(infos => <DatasetCard infos={infos} key={infos.id}/>)}
                </div>
            </div>
        )
    }
}

export default Datasets