import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { signout } from "../store/actions/authActions";

const NavbarComponents = () => {
  const signOutUser = useSelector((state) => state.signOutUser);
  const { loading, success, error } = signOutUser;
  const dispatch = useDispatch();

  const signOut = () => {
    dispatch(signout());
  };

  return (
    <div>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Link to="/">
            <Navbar.Brand>Firebase</Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Link to="/">
                <Nav.Link>Home</Nav.Link>
              </Link>
            </Nav>
            <Nav>
              <NavDropdown title="User" id="collasible-nav-dropdown">
                <NavDropdown.Item>Name</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={signOut}>Log Out</NavDropdown.Item>
              </NavDropdown>
              <Link to="/signin">
                <Nav.Link eventKey={2}>SignIn</Nav.Link>
              </Link>
              <Link to="/signup">
                <Nav.Link eventKey={2}>Register</Nav.Link>
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavbarComponents;
