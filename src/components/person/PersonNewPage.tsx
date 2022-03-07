import * as React from 'react';
import { useResource } from 'react-ketting';
import { useNavigate } from 'react-router-dom';
import { PersonNew } from '@badgateway/tt-types';

export function PersonNewPage() {

  const { submit, resourceState, setResourceState } = useResource<PersonNew>('/person', {
    mode: 'POST',
    initialState: {
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
  }

  return <>
    <div className="page-header"><h1>New User</h1></div>
    <form onSubmit={createPerson}>
      <div className="mb-3">
        <label htmlFor="formPerson" className="form-label">Person name</label>
        <input
          type="text"
          className="form-control"
          id="formPersonName"
          placeholder="My App"
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

