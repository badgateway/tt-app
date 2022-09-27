import * as React from 'react';
import { useLocation } from 'react-router-dom';
import { useResource } from 'react-ketting';
import { Client } from '@badgateway/tt-types';

import { CollectionLinks } from '../CollectionLinks';
import { getTitle } from '../../resource-util';

import { Link } from 'react-router-dom';

export function ClientsPage() {

  const location = useLocation();

  const { loading, error, resourceState, resource } = useResource<Client>(location.pathname);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error">{error.message}</div>;

  return <>
    <div className="page-header">
      <h1>{getTitle(resourceState)}</h1>
      <Link className="btn btn-primary" to='/client/new'>Create new client</Link>
    </div>
    <div>
      <CollectionLinks resource={resource} />
    </div>
  </>;

}

