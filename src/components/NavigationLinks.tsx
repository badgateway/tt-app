import * as React from 'react';
import { Link } from 'ketting';
import { useResource } from 'react-ketting';
import { Link as RouterLink } from 'react-router-dom';
import { Nav, Navbar } from 'react-bootstrap';

export function NavigationLinks() {

  const { loading, error, resourceState } = useResource('/');

  if (loading) {
    return <div>Loading</div>;
  }

  if (error) {
    return <div className="error">{error.message}</div>;
  }

  const links = resourceState.links.getAll();

  return <Navbar.Collapse id="basic-navbar-nav" role="navigation">
    <Nav className="me-auto">
      {links.map( link => <NavItem link={link} key={link.href} /> )}
    </Nav>
  </Navbar.Collapse>;

}

type NavItemProps = {
  link: Link
};

export function NavItem({link}: NavItemProps) {

  let title: string = link.title ?? link.rel;

  switch(link.rel) {
    case 'schema-collection': 
      return null;
    case 'client-collection' :
      title = 'Clients';
      break;
    case 'project-collection' :
      title = 'Projects';
      break;
    case 'person-collection' :
      title = 'People';
      break
  }
  return <Nav.Link><RouterLink to={link.href}>{title}</RouterLink></Nav.Link>;
}
