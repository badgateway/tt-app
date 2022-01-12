import * as React from 'react';
import { NavigationLinks } from './NavigationLinks';
import { Navbar, Container } from 'react-bootstrap';

export function NavBar() {

  return  <Navbar bg="primary" expand="md" variant="dark">
    <Container>
        <Navbar.Toggle aria-controlers="basic-navbar-nav" />
        <Navbar.Brand>Time Tracker</Navbar.Brand>
        <NavigationLinks />
    </Container>

  </Navbar>;

}
