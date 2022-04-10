import * as React from 'react';
import { useNewResource } from 'react-ketting';
import { useNavigate } from 'react-router-dom';
import { ClientSelect } from '../client/ClientSelect';

export function ProjectNewPage() {

  const { submit, resourceState, setResourceState } = useNewResource('/project', {
    initialData: {
      name: '',
    },
  });

  const navigation = useNavigate();

  const createProject = async (ev: any) => {
    ev.preventDefault();
    submit();
    navigation('/project');
  };

  const setName = (name:string) => {
    resourceState.data.name = name;
    setResourceState(resourceState);

  };
  const setClient = (clientHref: string) => {
    resourceState.links.set('client', clientHref);
  };

  return <>
    <div className="page-header"><h1>New Project</h1></div>
    <form onSubmit={createProject}>
      <div className="mb-3">
        <label htmlFor="formProjectName" className="form-label">Project name</label>
        <input
          type="text"
          className="form-control"
          id="formProjectName"
          placeholder="My App"
          defaultValue={resourceState.data.name}
          onChange={ev => setName(ev.target.value)}
          minLength={2}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="formProjectClient" className="form-label">Client</label>
        <ClientSelect
          className="form-select"
          id="formProjectClient"
          onChange={clientHref => setClient(clientHref)}
        />
      </div>
      <div>
        <button type="submit" className="btn btn-primary">Create</button>
      </div>
    </form>
  </>;

}

