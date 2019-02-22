import React, {Component} from "react";
import {Container, Row, Col, Button} from "react-bootstrap";
import Alumno from "./Alumno";
import CursoLogo from "./CursoLogo"
import CursoInfo from "./CursoInfo"
import NuevoAlumno from "./NuevoAlumno"


class Curso extends Component{
    constructor(props) {
        super(props);
        this.state = {
            curso: {},
            alumnos: [],
            imagen: "",
            modificando: false,
            agregando: false
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleAlumnoChange = this.handleAlumnoChange.bind(this);
    }

    componentDidMount() {
        fetch("http://localhost:3001/cursos/" + this.props.match.params.id)
            .then(res => res.json())
            .then(data => {
                this.setState({
                    curso: data,
                    alumnos: data.alumnos,
                    imagen: data.imagen
                });
            });
    }

    handleDelete() {
        fetch("http://localhost:3001/cursos/" + this.props.match.params.id, {method:'DELETE'})
    }

    handleClick(event) {
        const {name, value} = event.target;
        this.setState((prevState) => {
            if(value === "cancelar") {
                return({
                    modificando: false,
                    agregando: false
                })
            }
            return ({
                [name]: !prevState[name]
            })
        });
        if (value === "finalizar") {
            fetch("http://localhost:3001/cursos/" + this.props.match.params.id, {
                method: 'PUT', //deberia ser un PATCH?
                body: JSON.stringify(this.state.alumnos),
                headers: {'Content-Type':'application/json'}
            })
                .then(res => res.json())
                .then(data => console.log(data))
                .catch(error => console.log(error));
        }
    }

    handleAlumnoChange(accion, alumno) {
        this.setState(prevState => {
            if (accion === "agregar") {
                return ({
                    alumnos: prevState.alumnos.concat(alumno)
                })
            } else {
                return ({
                    alumnos: prevState.alumnos.filter(al => al.DNI !== alumno.DNI)
                })
            }
        });
    }

    render() {
        const alumnosComponent = this.state.alumnos.length ? this.state.alumnos.map(alumno =>
            <Alumno key={alumno.DNI} alumno={alumno} handleAlumnoChange={this.handleAlumnoChange} modificando={this.state.modificando}/>
        ) : <p>No hay alumnos cargados</p>;

        const styleAgregar = this.state.agregando ? {display:'none'} : {marginLeft:'10px', marginTop:'10px'};
        const styleCancelar = this.state.modificando ? {marginLeft:'20px'} : {display:'none'};

        const boton = this.state.modificando ?
            <Button variant="secondary"
                    value="finalizar"
                    name="modificando"
                    onClick={this.handleClick}
                    disabled={this.state.agregando}>Finalizar</Button> :
            <Button variant="secondary"
                    value="modificar"
                    name="modificando"
                    onClick={this.handleClick}>Modificar</Button>;

        return(
            <div>
                <Button variant="danger" name="eliminar" onClick={this.handleDelete} style={{float:'right'}}>Eliminar curso</Button>
                <Container>
                    <Row>
                        <Col>
                            {this.state.imagen !== "" ? <CursoLogo url={this.state.imagen}/> : null}
                            <br/><br/>
                            <CursoInfo curso={this.state.curso}/>
                            {boton}
                            <Button variant="danger" value="cancelar" name="modificando" onClick={this.handleClick} style={styleCancelar}>Cancelar</Button>
                        </Col>
                        <Col>
                            <h4>Alumnos:</h4>
                            {alumnosComponent}
                            {this.state.agregando ?
                                <NuevoAlumno handleClick={this.handleClick}
                                             id={this.props.match.params.id}
                                             handleAlumnoChange={this.handleAlumnoChange}/>
                                : null}
                            {this.state.modificando ?
                                <Button variant="secondary" name="agregando" style={styleAgregar} onClick={this.handleClick}>Agregar</Button>
                                : null}
                        </Col>
                    </Row>
                </Container>
            </div>

        );
    }
}

export default Curso;