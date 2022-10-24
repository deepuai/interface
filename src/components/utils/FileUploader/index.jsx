import './FileUploader.css'

import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';

const FileUploader = (props) => {

    return (
        <div className='file-uploader'>
            <div className='form'>
                <Form.Group controlId="formFile" className="mb-2">
                    <Form.Label>
                        {props.label}
                        <OverlayTrigger
                            placement="right"
                            delay={{ show: 250, hide: 400 }}
                            overlay={
                                <Tooltip id="button-tooltip" {...props} hidden={!props.tooltipInfo}>
                                    {props.tooltipInfo}
                                </Tooltip>
                            }
                            hidden={!props.tooltipInfo}>
                            <img
                                src='/assets/icons/info.png'
                                alt='info'
                                style={{height: '25px', width: '25px', marginLeft: '10px'}}
                                hidden={!props.tooltipInfo}/>
                        </OverlayTrigger>
                    </Form.Label>
                    <Form.Control type="file" onChange={props.cbOnChangeFile} required/>
                </Form.Group>
            </div>
        </div>
    )
}

export default FileUploader