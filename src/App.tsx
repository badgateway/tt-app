import { createRoot } from 'react-dom/client';
import * as React from 'react';
import { Client } from 'ketting';
import { KettingProvider } from 'react-ketting';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Modal from 'react-modal';

import {ResourcePage} from './components/ResourcePage';
import {NavBar} from './components/NavBar';

import {ClientsPage} from './pages/clients/ClientsPage';
import {ClientNewPage} from './pages/clients/new/ClientNewPage';
import {ClientPage} from './pages/clients/client/ClientPage';

import {PersonPage} from './pages/people/person/PersonPage';
import {PersonNewPage} from './pages/people/new/PersonNewPage';
import {PeoplePage} from './pages/people/PeoplePage';

import {ProjectsPage} from './pages/projects/ProjectsPage';
import {ProjectNewPage} from './pages/projects/new/ProjectNewPage';
import {ProjectPage} from './pages/projects/project/ProjectPage';

function App() {
  const client = new Client('http://localhost:8901/');

  return (
    <KettingProvider client={client}>
      <BrowserRouter>
        <NavBar />
        <div className='container'>
          <Routes>
            <Route path='/client' element={<ClientsPage />} />
            <Route path='/client/new' element={<ClientNewPage />} />
            <Route path='/client/:id' element={<ClientPage />} />

            <Route path='/person' element={<PeoplePage />} />
            <Route path='/person/new' element={<PersonNewPage />} />
            <Route path='/person/:id' element={<PersonPage />} />

            <Route path='/project' element={<ProjectsPage />} />
            <Route path='/project/new' element={<ProjectNewPage />} />
            <Route path='/project/:id' element={<ProjectPage />} />

            <Route path='*' element={<ResourcePage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </KettingProvider>
  );
}

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('app-root');
  Modal.setAppElement(container!);
  const root = createRoot(container!);
  root.render(<App />);
});


