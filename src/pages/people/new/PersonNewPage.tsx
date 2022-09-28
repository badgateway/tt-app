import * as React from 'react';
import { useNewResource } from 'react-ketting';
import { useNavigate } from 'react-router-dom';
import { PersonNew } from '@badgateway/tt-types';

export function PersonNewPage() {

  const { submit, resourceState, setResourceState } = useNewResource<PersonNew>('/person', {
    initialData: {
      name: '',
    },
  });

  const navigation = useNavigate();

  const createPerson = async (ev: any) => {
    ev.preventDefault();
    submit();
    navigation('/person');
  };

  const setName = (name:string) => {
    resourceState.data.name = name;
    setResourceState(resourceState);
  };

  return <>
    <div className="page-header"><h1>New User</h1></div>
    <form onSubmit={createPerson}>
      <div className="mb-3">
        <label htmlFor="formPerson" className="form-label">Display name</label>
        <input
          type="text"
          className="form-control"
          id="formPersonName"
          defaultValue={resourceState.data.name}
          onChange={ev => setName(ev.target.value)}
          minLength={2}
          required
        />
      </div>
      <div>
        <button type="submit" className="btn btn-primary">Create</button>
      </div>
    </form>
  </>;

}

