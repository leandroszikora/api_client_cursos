import React, {Component} from "react";
import {Form, Card, Button} from "react-bootstrap";

class NuevoAlumno extends Component{
    constructor(props) {
        super(props);
        this.state = {
            nombre: "",
            apellido: "",
            DNI: "",
            direccion: "",
            nota: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const {name, value} = event.target;
        this.setState({
            [name]: value
        });
    }

    handleClick(event) {
        this.props.handleClick(event);
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.handleAlumnoChange("agregar", this.state);
        this.props.handleClick(event)
    }

    render() {
        return(
            <Card style={{ width: '15rem', display: 'inline-block', margin:'10px'}} bg="dark" text="white">
                <Form name="agregando" onSubmit={this.handleSubmit}>
                    <Form.Control type="text" size="sm" placeholder="Nombre" name="nombre" onChange={this.handleChange} value={this.state.nombre} required/>
                    <Form.Control type="text" size="sm" placeholder="Apellido" name="apellido" onChange={this.handleChange} value={this.state.apellido} required/>
                    <Form.Control type="number" size="sm" placeholder="DNI" name="DNI" onChange={this.handleChange} value={this.state.DNI} required/>
                    <Form.Control type="text" size="sm" placeholder="Domicilio" name="direccion" onChange={this.handleChange} value={this.state.direccion} required/>
                    <Form.Control type="number" size="sm" placeholder="Nota" name="nota" onChange={this.handleChange} value={this.state.nota} required/>
                    <Button type="submit" variant="success">Agregar</Button>
                    <Button type="button" name="agregando" variant="danger" onClick={this.handleClick} style={{float:'right'}}>Cancelar</Button>
                </Form>
            </Card>
        );
    }
}

export default NuevoAlumno;