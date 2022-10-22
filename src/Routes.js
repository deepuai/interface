import { Route, Routes as ReactRouters } from "react-router-dom";
import Applications from "./components/pages/Applications";
import Home from "./components/pages/Home";
import Models from "./components/pages/Models";

const Routes = () => {
    return (
        <ReactRouters>
            <Route element={ <Home /> } path="/" exact />
            <Route element={ <Applications /> } path="/community/applications" exact />
            <Route element={ <Models /> } path="/community/models" exact />
        </ReactRouters>
    )
}

export default Routes