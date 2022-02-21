import * as React from 'react';
import { useResource } from 'react-ketting';
import { useNavigate } from 'react-router-dom';

export function ClientNewPage() {

  const { loading, error, data, setData, submit } = useResource('/clients', {
    mode: 'POST',
    initialState: {
      name: '',
    },
  });

  const navigation = useNavigate();

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error">{error.message}</div>;

  const setName = (ev: any) => {
    data.name = ev.target.value;
    setData(data);
  }

  const createClient = async () => {

    debugger;
    await submit();
    navigation('/client');

  };

  return <>
    <div className="page-header"><h1>New Client</h1></div>
    <form onSubmit={createClient}>
      <div className="mb-3">
        <label htmlFor="formClientName" className="form-label">Client</label>
        <input
          type="text"
          className="form-control"
          id="formClientName"
          placeholder="Bad Gateway Inc."
          defaultValue={data.name}
          onChange={setName}
          minLength={2}
        />
      </div>
      <div>
        <button type="submit" className="btn btn-primary">Create</button>
      </div>
    </form>
  </>;

}

