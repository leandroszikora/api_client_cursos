import React from "react";
import Navbar from "react-bootstrap/Navbar"


function Header() {
    return (
        <Navbar expand="lg" variant="dark" bg="dark">

            <Navbar.Brand href="/">
                Cursos
            </Navbar.Brand>
        </Navbar>
    );
}

export default Header;