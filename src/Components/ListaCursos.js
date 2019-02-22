import React, {Component} from "react";
import {Card, Button, Container, Row, Form}from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

class ListaCursos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cursos: [],
            original: [],
            busqueda: ""
        };
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        fetch("http://localhost:3001/cursos")
            .then(res => res.json())
            .then(data => {
                this.setState({
                    cursos: data,
                    original: data
                })
            })
    }

    handleChange(event) {
        const {name, value} = event.target;
        this.setState({
            [name]: value
        });
        this.setState(prevState => {
            const busqueda = value ?
                prevState.cursos.filter(curso => curso.tema.toLowerCase().includes(value)) :
                this.state.original;
            return ({
                cursos: busqueda
            })
        })
    }

    render() {
        let cursosList = this.state.cursos.map( curso => {
            return (
                <Card key={curso._id} bg="dark" text="white" style={{ width: '17rem', display: 'inline-block', margin:'10px' }}>
                    <Card.Header>{curso.tema}</Card.Header>
                    <Card.Body>
                        <Card.Text>Año: {curso.anioDictado}</Card.Text>
                        <Card.Text>Duracion: {curso.duracion}</Card.Text>
                        <LinkContainer to={"/cursos/" + curso._id}>
                            <Button variant="secondary">Ver mas</Button>
                        </LinkContainer>
                    </Card.Body>
                </Card>
            );
        });
        return(
            <div>
                <Form style={{marginBottom:'50px'}} inline>
                    <Form.Control className="mr-sm-2" placeholder="Tema" name="busqueda" value={this.state.busqueda} onChange={this.handleChange}/>
                </Form>
                <Container>
                    <Row style={{float:'right'}}>
                        <LinkContainer to={"/cursos/nuevo"}>
                            <Button variant="secondary" style={{margin:'10px', display:'inline-block'}}>Nuevo curso</Button>
                        </LinkContainer>
                    </Row>
                    <Row>
                      {cursosList}
                    </Row>
                </Container>
            </div>
        );
    }

}

export default ListaCursos;
