import * as React from 'react';
import { useState } from 'react';
import { useClient } from 'react-ketting';
import { useNavigate } from 'react-router-dom';

export function ClientNewPage() {

  const client = useClient();
  const [name, setName] = useState('');

  const navigation = useNavigate();

  const createClient = async (ev: any) => {

    ev.preventDefault();
    await client.go('/client').postFollow({
      data: {
        name
      }
    });
    navigation('/client');

  };

  return <>
    <div className="page-header"><h1>New Client</h1></div>
    <form onSubmit={createClient}>
      <div className="mb-3">
        <label htmlFor="formClientName" className="form-label">Company name</label>
        <input
          type="text"
          className="form-control"
          id="formClientName"
          placeholder="Bad Gateway Inc."
          defaultValue={name}
          onChange={ev => setName(ev.target.value)}
          minLength={2}
        />
      </div>
      <div>
        <button type="submit" className="btn btn-primary">Create</button>
      </div>
    </form>
  </>;

}

