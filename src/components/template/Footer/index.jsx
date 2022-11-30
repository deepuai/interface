import './Footer.css'
import React from 'react'
const Footer = () => {
    return (
        <footer className="text-center text-black footer" style={{ backgroundColor: "#f1f1f1" }}>
            <div className="container pt-2">
                <section>
                    <a
                        className="btn text-white btn-floating"
                        href="https://github.com/deepuai"
                        target="_blank"
                        rel="noreferrer"
                        role="button"
                    >
                        <img
                            alt="logo_github"
                            src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
                            width="50px"
                        />
                        <div className="text-dark">Acesse nosso GitHub!</div>
                    </a>
                </section>

            </div>
            <div className="text-center text-dark p-1">
                <img
                    alt="logo"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/EFEI_logo.png/640px-EFEI_logo.png"
                    width="40px"
                />
                <a className="text-dark ms-2" href="https://unifei.edu.br/" target="_blank" rel="noreferrer">Universidade Federal de Itajubá</a>
            </div>
        </footer>
    );
}

export default Footer