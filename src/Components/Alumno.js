import React from "react";
import {Card, Badge, Button} from "react-bootstrap";

function Alumno(props) {
    const aprobo = parseInt(props.alumno.nota) > 6;
    const styleButton = props.modificando ? {display:'inline-block', float:'right'} : {display:'none'};

    return(
      <Card style={{ width: '14rem', display: 'inline-block', margin:'10px' }} bg="dark" text="white" >
          <div style={{margin: '20px'}}>
              <Card.Title>
                  {props.alumno.nombre + " " + props.alumno.apellido}
              </Card.Title>
              <Card.Text>Nota: {props.alumno.nota}</Card.Text>
              <Card.Text>
                  {aprobo ? <Badge variant="success">Aprobado</Badge> : <Badge variant="danger">Desaprobado</Badge>}
                  <Button variant="danger" size="sm" onClick={() => props.handleAlumnoChange("eliminar", props.alumno)} style={styleButton}>Eliminar</Button>
              </Card.Text>
          </div>
      </Card>
    );
}

export default Alumno;