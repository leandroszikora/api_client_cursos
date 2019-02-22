import React, { Component } from 'react';
import {Jumbotron} from "react-bootstrap";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Header from "./Components/Header";
import ListaCursos from "./Components/ListaCursos";
import Curso from "./Components/Curso"
import AltaCurso from "./Components/AltaCurso"

function Error() {
   return <div>404</div>;
}

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Header/>
                    <Jumbotron style={{margin:'0'}}>
                        <Switch>
                            <Route path="/" component={ListaCursos} exact />
                            <Route path="/cursos/nuevo" component={AltaCurso} exact/>
                            <Route path="/cursos/:id" component={Curso} exact/>
                            <Route component={Error}/>
                        </Switch>
                    </Jumbotron>
                    <footer className="text-center p-3 mb-2 bg-dark text-white">
                        © 2019 Copyright:
                        <a href="https://www.dblandit.com"> Dblandit</a>
                    </footer>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
