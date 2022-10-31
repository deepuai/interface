import './Predict.css'

import axios from 'axios'
import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import FileUploader from '../../utils/FileUploader'
import { Button, Form, Spinner } from 'react-bootstrap';

ChartJS.register(ArcElement, Tooltip, Legend);

const CHART_OPTIONS = {
    plugins: {
        title: {
            display: true,
            text: 'Predições realizadas pela aplicação'
        },
        legend: {
            display: true,
            position: 'bottom',
            labels: { 
                padding: 20,
                boxWidth: 50,
                font: { size: 12}
            }
        },
        tooltip: {
            backgroundColor: '#FFF',
            borderColor: 'black',
            borderWidth: 0.5,
            titleFontSize: 16,
            bodyColor: 'black',
            bodyFont: { size: 12 },
            bodyFontSize: 12,
            displayColors: false,
            callbacks: {
                label: context => {
                    const label = context.label;
                    const precision = context.parsed * 100
                    
                    return `${label}: ${precision}%`;
                }
            },
        }
    }
}

const DATASET_OPTIONS = {
    backgroundColor: [
        'rgba(54, 162, 235, 0.3)',
        'rgba(255, 99, 132, 0.3)',
        'rgba(255, 206, 86, 0.3)'
    ],
    hoverBackgroundColor: [
        'rgba(54, 162, 235, 0.5)',
        'rgba(255, 99, 132, 0.5)',
        'rgba(255, 206, 86, 0.5)'
    ],
    borderColor: [
        'rgba(54, 162, 235, 1)',
        'rgba(255, 99, 132, 1)',
        'rgba(255, 206, 86, 1)'
    ],
    borderWidth: 1
}

class Predict extends React.Component {

    constructor({ application }) {
        super()
        this.labelFileUploader = 'Envie uma imagem para o modelo realizar a predição.'
        this.pathParams = `${application.model_name.toLowerCase()}/${application.version.toLowerCase()}/eval`

        this.state = {
            chart: {
                data: {
                    labels: ['Null', 'Null', 'Null'],
                    datasets: [{ 
                        data: [1, 2, 3] ,
                        ...DATASET_OPTIONS
                    }]
                },
                options: {...CHART_OPTIONS}
            },
            showChart: false,
            loadingActivated: false,
            form: {
                file: {
                    type: 'img_file',
                    selected: null
                },
            },
            formHasChanged: false
        }
    }

    onChangeUploadFile = event => {
        this.setState({ 
            ...this.state,
            form: {
                file: {
                    type: 'img_file',
                    selected: event.target.files[0]
                },
            },
            formHasChanged: true,
            showChart: false
        })
    }

    uploadFile = event => {
        event.preventDefault()
        const formData = new FormData()
        formData.append(
            this.state.form.file.type,
            this.state.form.file.selected,
            this.state.form.file.selected.name
        )
        this.setState({
            ...this.state,
            loadingActivated: true,
            formHasChanged: false
        })
        axios.post(`http://localhost:8000/${this.pathParams}`, formData)
            .then(response => {
                this.setChartDataAfterRequest(response)
            })
            .catch(error => {
                console.log(error)
                this.setState({
                    ...this.state,
                    loadingActivated: false
                })
            })
    }

    hideChart() {
        this.setState({
            ...this.state,
            showChart: false
        })
    }

    setChartDataAfterRequest(response) {
        const labels = response.data.predictions.map(elem => elem[1])
        const data = response.data.predictions.map(elem => elem[2])
        this.setState({
            ...this.state,
            chart: {
                ...this.state.chart,
                data: {
                    labels: labels,
                    datasets: [{
                        ...this.state.chart.data.datasets,
                        data: data
                    }]
                }
            },
            showChart: true,
            loadingActivated: false
        })
    }

    render() {
        return (
            <div className='predict-component'>
                <Form onSubmit={this.uploadFile}>
                    <FileUploader
                        label={this.labelFileUploader}
                        tooltipInfo={false}
                        cbOnChangeFile={(response) => this.onChangeUploadFile(response)}/>
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
                <Doughnut
                    data={this.state.chart.data}
                    options={this.state.chart.options}
                    className='doughnut-chart'
                    hidden={!this.state.showChart}/>
            </div>
        )
    }
    }

export default Predict