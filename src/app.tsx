import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { Client } from 'ketting';
import { KettingProvider } from 'react-ketting';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';

import { ResourcePage } from './components/ResourcePage';
import { NavBar } from './components/NavBar';

function App() {

  const client = new Client('http://localhost:8901/'); 

  return <KettingProvider client={client}>
    <BrowserRouter>
    <NavBar />
    <Container>
      <Routes>
        <Route path="*" element={<ResourcePage />}/>
      </Routes>
    </Container>
    </BrowserRouter>
  </KettingProvider>;

}


document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <App />,
    document.getElementById('app-root'),
  );
});


