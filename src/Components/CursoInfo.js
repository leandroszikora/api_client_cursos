import React from "react";

function CursoInfo(props) {
    return(
        <div>
            <h2>{props.curso.tema}</h2>
            <br/>
            <p>Año: {props.curso.anioDictado}</p>
            <p>Duracion: {props.curso.duracion}</p>
        </div>
    );
}

export default CursoInfo;