import * as React from 'react';
import { useResource } from 'react-ketting';
import { useNavigate, useLocation } from 'react-router-dom';

type Client = {
  name: string;
}

export function ClientPage() {

  const location = useLocation();
  const { loading, error, data, setData, submit } = useResource<Client>(location.pathname);
  const navigation = useNavigate();

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error">{error.message}</div>;

  const updateClient = async (ev: any) => {

    ev.preventDefault();
    submit();
    navigation('/client');

  };

  const setName = (name: string) => {

    setData({
      ...data,
      name
    });

  }

  return <>
    <div className="page-header"><h1>{data.name}</h1></div>
    <form onSubmit={updateClient}>
      <div className="mb-3">
        <label htmlFor="formClientName" className="form-label">Company name</label>
        <input
          type="text"
          className="form-control"
          id="formClientName"
          placeholder="Bad Gateway Inc."
          value={data.name}
          onChange={ev => setName(ev.target.value)}
          minLength={2}
        />
      </div>
      <div>
        <button type="submit" className="btn btn-primary">Save</button>
      </div>
    </form>
  </>;

}

