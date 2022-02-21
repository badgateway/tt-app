import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { Client } from 'ketting';
import { KettingProvider } from 'react-ketting';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { ResourcePage } from './components/ResourcePage';
import { NavBar } from './components/NavBar';

import { ClientsPage } from './components/clients/ClientsPage';
import { ClientNewPage } from './components/clients/ClientNewPage';

function App() {

  const client = new Client('http://localhost:8901/'); 

  return <KettingProvider client={client}>
    <BrowserRouter>
    <NavBar />
    <div className="container">
      <Routes>
        <Route path="/client" element={<ClientsPage />}/>
        <Route path="/client/new" element={<ClientNewPage />}/>
        <Route path="*" element={<ResourcePage />}/>
      </Routes>
    </div>
    </BrowserRouter>
  </KettingProvider>;

}


document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <App />,
    document.getElementById('app-root'),
  );
});


