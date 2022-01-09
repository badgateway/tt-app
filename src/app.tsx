import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { Client } from 'ketting';
import { KettingProvider } from 'react-ketting';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Navigation } from './components/Navigation';
import { ResourcePage } from './components/ResourcePage';

function App() {

  const client = new Client('http://localhost:8901/'); 

  return <KettingProvider client={client}>
    <BrowserRouter>
    <header>
      <h1>Time Tracker</h1>
      <Navigation />
    </header>
    <main>
      <Routes>
        <Route path="*" element={<ResourcePage />}/>
      </Routes>
    </main>
    </BrowserRouter>
  </KettingProvider>;

}


document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <App />,
    document.getElementById('app-root'),
  );
});


