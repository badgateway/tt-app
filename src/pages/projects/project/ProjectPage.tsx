import * as React from 'react';
import { useResource } from 'react-ketting';
import { resolve } from 'ketting';
import { useNavigate, useLocation } from 'react-router-dom';
import { Project } from '@badgateway/tt-types';

import { ClientSelect } from '../../../components/ClientSelect';

export function ProjectPage() {

  const location = useLocation();
  const { loading, error, resourceState, setResourceState, submit } = useResource<Project>(location.pathname);
  const navigation = useNavigate();

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error">{error.message}</div>;

  const updateProject = async (ev: any) => {

    ev.preventDefault();
    await submit();
    navigation('/project');

  };
  const setName = (name:string) => {
    resourceState.data.name = name;
    setResourceState(resourceState);
  };
  const setClient = (clientHref: string) => {
    resourceState.links.set('client', clientHref);
  };

  const clientLink = resourceState.links.get('client');
  const clientUrl = clientLink ? resolve(clientLink) : undefined;

  return <>
    <div className="page-header"><h1>{resourceState.data.name}</h1></div>
    <form onSubmit={updateProject}>
      <div className="mb-3">
        <label htmlFor="formProjectName" className="form-label">Project name</label>
        <input
          type="text"
          className="form-control"
          id="formProjectName"
          defaultValue={resourceState.data.name}
          onChange={ev => setName(ev.target.value)}
          minLength={2}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="formProjectClient" className="form-label">Client</label>
        <ClientSelect
          className="form-select"
          id="formProjectClient"
          onChange={clientHref => setClient(clientHref)}
          defaultValue={clientUrl}
          value={clientUrl}
          required
        />
      </div>
      <div>
        <button type="submit" className="btn btn-primary">Save</button>
      </div>
    </form>
  </>;

}

