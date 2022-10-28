import React from 'react'
import axios from 'axios'
import cytoscape from 'cytoscape';
import './Version.css'

class Version extends React.Component {
    constructor({ applicationId }) {
        super()
        this.applicationId = applicationId
        this.cy = null
    }

    componentDidMount() {
        axios.get(`http://localhost:8080/applications/${this.applicationId}/versions`)
            .then(response => {
                const versions = response.data[0].version_history.split(' -> ')
                this.createVersionGraph(versions)
            })
            .catch(error => console.log(error))
    }

    createVersionGraph(versionData) {
        debugger
        const elements = versionData.reduce((acc, current, id, array) => {
            acc.push({data: { id: current }})
            if (id !== 0 && array[id-1])
                acc.push({ data: { id: id, source: array[id-1], target: current } })
            return acc
        }, [])
        this.cy = cytoscape({
            container: document.getElementById('cy'),
            elements: elements,
            style: [
                {
                    selector: 'node',
                    style: {
                        'background-color': 'rgba(153, 229, 156, 0.6)',
                        'label': 'data(id)',
                        'font-size': '10px',
                        'color': '#888'
                    }
                },
                {
                    selector: 'edge',
                    style: {
                        'width': 3,
                        'line-color': '#888',
                        'target-arrow-color': '#888',
                        'target-arrow-shape': 'triangle',
                        'curve-style': 'bezier'
                    }
                }
            ],
            layout: {
                name: 'cose'
            }
        })
    }

    render() {
        return (
            <div id='cy' style={{height: '300px', display: 'block'}} /> 
        )
    }
}

export default Version