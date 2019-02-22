import React, {Component} from "react";
import {Form, Button, Col} from "react-bootstrap";

class AltaCurso extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tema: "",
            duracion: "",
            anioDictado: "",
            imagen: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const {name, value} = event.target;
        this.setState({
            [name]: value
        })
    }

    handleSubmit(event) {
        event.preventDefault();
        const data = JSON.stringify(this.state);
        fetch("http://localhost:3001/cursos", {
            method: 'POST',
            body: data,
            headers: {'Content-Type':'application/json'}
        })
            .then(res => {
                if (res.status === 201) {
                    this.setState({
                        tema: "",
                        duracion: "",
                        anioDictado: "",
                        imagen: ""
                    })
                }
                return res.json()})
            .then(data => console.log(data))
            .catch(error => console.log(error));
    }

    render() {
        return (
                <Form onSubmit={this.handleSubmit} style={{padding:'20px 250px'}}>
                    <Form.Row>
                        <Col>
                            <Form.Label>Tema:</Form.Label>
                            <Form.Control type="text" placeholder="Ingrese el nombre del curso" value={this.state.tema}
                                          name="tema" onChange={this.handleChange} required/>
                        </Col>
                        <Col>
                            <Form.Label>Duracion:</Form.Label>
                            <Form.Control type="text" placeholder="Por ej. 3 semanas" value={this.state.duracion}
                                          name="duracion" onChange={this.handleChange} required/>
                        </Col>
                    </Form.Row>
                    <br/>
                    <Form.Row>
                        <Col>
                            <Form.Label>Año de dictado:</Form.Label>
                            <Form.Control type="number" placeholder="Por ej. 2019" value={this.state.anioDictado}
                                          name="anioDictado" onChange={this.handleChange} required/>
                        </Col>
                        <Col>
                            <Form.Label>Url imagen:</Form.Label>
                            <Form.Control type="text" placeholder="Por ej. https://site.com/imagen.png" value={this.state.imagen}
                                          name="imagen" onChange={this.handleChange}/>
                        </Col>
                    </Form.Row>
                    <br/>
                    <Button type="submit" variant="secondary" style={{float:'right'}}>Agregar</Button>
                </Form>
        )
    }
}

export default AltaCurso;