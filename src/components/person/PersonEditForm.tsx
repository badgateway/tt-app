import * as React from 'react';
import { useResource } from 'react-ketting';
import { Resource } from 'ketting';
import { useNavigate } from 'react-router-dom';

import { Person } from '@badgateway/tt-types';

type Props = {
  resource: Resource<Person>;
}

export function PersonEditForm(props: Props) {

  const { loading, error, resourceState, setResourceState, submit } = useResource(props.resource);
  const navigation = useNavigate();

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error">{error.message}</div>;

  const updatePerson = async (ev: any) => {

    ev.preventDefault();
    submit();
    navigation('/person');

  };
  const setName = (name:string) => {
    resourceState.data.name = name;
    setResourceState(resourceState);
  }

  return <form onSubmit={updatePerson}>
    <div className="mb-3">
      <label htmlFor="formPersonName" className="form-label">Name</label>
      <input
        type="text"
        className="form-control"
        id="formPersonName"
        defaultValue={resourceState.data.name}
        onChange={ev => setName(ev.target.value)}
        minLength={2}
      />
    </div>
    <div>
      <button type="submit" className="btn btn-primary">Save</button>
    </div>
  </form>;

}
