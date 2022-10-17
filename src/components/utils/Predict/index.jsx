import './Predict.css'

import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import FileUploader from '../../utils/FileUploader'
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
        this.application = application
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
            showChart: false
        }
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
            showChart: true
        })
    }

    render() {
        return (
            <div className='predict-component'>
                <FileUploader 
                    pathParam={this.application.name.toLowerCase()}
                    cbAfterFileHasChanged={() => this.hideChart()}
                    cbAfterRequest={(response) => this.setChartDataAfterRequest(response)}
                    />
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