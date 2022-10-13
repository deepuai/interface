import './Footer.css'
import { CDBFooter, CDBBox, CDBBtn, CDBIcon } from 'cdbreact';

const Footer = () => {
    return (
        <CDBFooter className="shadow">
            <CDBBox
                display="flex"
                justifyContent="between"
                alignItems="center"
                className="mx-auto py-4"
                style={{ height: '100%' }}
            >
                <CDBBox display="flex" alignItems="center">
                <a href="/" className="d-flex align-items-center p-0 text-dark">
                    <img
                        alt="logo"
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/EFEI_logo.png/640px-EFEI_logo.png"
                        width="40px"
                        className="ms-2"
                    />
                    <span className="ms-3 h5 mb-0 font-weight-bold">DeepUAI</span>
                </a>
                <small className="ms-5">&copy; DeepUAI, 2022. All rights reserved.</small>
                </CDBBox>
                <CDBBox display="flex">
                <CDBBtn href="https://github.com/deeplearnas" flat color="dark" className="p-3 me-4">
                    <CDBIcon fab icon="github" />
                </CDBBtn>
                </CDBBox>
            </CDBBox>
    </CDBFooter>
    );
}

export default Footer