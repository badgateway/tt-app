import { createRoot } from 'react-dom/client';
import * as React from 'react';
import { Client } from 'ketting';
import { resolve } from 'ketting';
import { KettingProvider, RequireLogin } from 'react-ketting';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { ResourcePage } from './components/ResourcePage';
import { NavBar } from './components/NavBar';

import { ClientsPage } from './pages/clients/ClientsPage';
import { ClientNewPage } from './pages/clients/new/ClientNewPage';
import { ClientPage } from './pages/clients/client/ClientPage';

import { PersonPage } from './pages/people/person/PersonPage';
import { PersonNewPage } from './pages/people/new/PersonNewPage';
import { PeoplePage } from './pages/people/PeoplePage';

import { ProjectsPage } from './pages/projects/ProjectsPage';
import { ProjectNewPage } from './pages/projects/new/ProjectNewPage';
import { ProjectPage } from './pages/projects/project/ProjectPage';

function App() {

  const client = new Client('http://localhost:8901/');
  const a12nserverUri = 'http://localhost:8531/';
  const clientId = 'tt-app';

  const onSuccess = (state: string|null) => {
    document.location.href = state || '/';
  };

  return <KettingProvider client={client}>
    <RequireLogin
      tokenEndpoint={resolve(a12nserverUri, '/token')}
      authorizeEndpoint={resolve(a12nserverUri, '/authorize')}
      clientId={clientId}
      onSuccess={onSuccess}>
      <BrowserRouter>
        <NavBar />
        <div className="container">
          <Routes>

            <Route path="/client" element={<ClientsPage />}/>
            <Route path="/client/new" element={<ClientNewPage />}/>
            <Route path="/client/:id" element={<ClientPage />}/>

            <Route path="/person" element={<PeoplePage />}/>
            <Route path="/person/new" element={<PersonNewPage />}/>
            <Route path="/person/:id" element={<PersonPage />}/>

            <Route path="/project" element={<ProjectsPage />}/>
            <Route path="/project/new" element={<ProjectNewPage />}/>
            <Route path="/project/:id" element={<ProjectPage />}/>


            <Route path="*" element={<ResourcePage />}/>
          </Routes>
        </div>
      </BrowserRouter>
    </RequireLogin>
  </KettingProvider>;

}

document.addEventListener('DOMContentLoaded', () => {

  const container = document.getElementById('app-root');
  const root = createRoot(container!);
  root.render(<App />);

});
