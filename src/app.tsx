import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { Client } from 'ketting';
import { KettingProvider } from 'react-ketting';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { ResourcePage } from './components/ResourcePage';
import { NavBar } from './components/NavBar';

import { ClientsPage } from './components/client/ClientsPage';
import { ClientNewPage } from './components/client/ClientNewPage';
import { ClientPage } from './components/client/ClientPage';

import { PersonPage } from './components/person/PersonPage';
import { PeoplePage } from './components/person/PeoplePage';

import { ProjectsPage } from './components/project/ProjectsPage';
import { ProjectNewPage } from './components/project/ProjectNewPage';
import { ProjectPage } from './components/project/ProjectPage';

function App() {

  const client = new Client('http://localhost:8901/');

  return <KettingProvider client={client}>
    <BrowserRouter>
      <NavBar />
      <div className="container">
        <Routes>
          <Route path="/client" element={<ClientsPage />}/>
          <Route path="/client/new" element={<ClientNewPage />}/>
          <Route path="/client/:id" element={<ClientPage />}/>

          <Route path="/person" element={<PeoplePage />}/>
          <Route path="/person/:id" element={<PersonPage />}/>

          <Route path="/project" element={<ProjectsPage />}/>
          <Route path="/project/new" element={<ProjectNewPage />}/>
          <Route path="/project/:id" element={<ProjectPage />}/>


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


