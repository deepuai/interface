import React from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Content from "./components/template/Content";
import Footer from "./components/template/Footer";
import Header from "./components/template/Header";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Content />
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
