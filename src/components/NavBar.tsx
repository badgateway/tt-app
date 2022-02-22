import * as React from 'react';
import { useState } from 'react';
import { NavigationLinks } from './NavigationLinks';

export function NavBar() {

  const [open, setOpen] = useState(false);
  
  const toggleOpen = () => setOpen(!open);


  return  <nav className="navbar navbar-expand-md bg-primary navbar-dark fixed-top">
    <div className="container">
        <button className="navbar-toggler" type="button" onClick={toggleOpen}>
          <span className="navbar-toggler-icon"></span>
        </button>
        <a className="navbar-brand">Time Tracker</a>
        <NavigationLinks open={open}/>
    </div>
  </nav>;

}
