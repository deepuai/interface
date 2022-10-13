import './Footer.css'
import { CDBFooter, CDBBox, CDBBtn, CDBIcon } from 'cdbreact';

const Footer = () => {
    return (
        <CDBFooter className="shadow">
            <CDBBox
                display="flex"
                justifyContent="between"
                alignItems="center"
                className="mx-auto py-4 flex-wrap"
                style={{ width: '90%' }}
            >
                <CDBBox display="flex" alignItems="center">
                <a href="/" className="d-flex align-items-center p-0 text-dark">
                    <img
                    alt="logo"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/EFEI_logo.png/640px-EFEI_logo.png"
                    width="30px"
                    class="me-2"
                    />
                    <span className="ml-4 h5 mb-0 font-weight-bold">DeepUAI</span>
                </a>
                <small className="ml-2">&copy; DeepUAI, 2022. All rights reserved.</small>
                </CDBBox>
                <CDBBox display="flex">
                <CDBBtn flat color="dark" className="p-2">
                    <CDBIcon fab icon="github" />
                </CDBBtn>
                </CDBBox>
            </CDBBox>
    </CDBFooter>
    );
}

export default Footer