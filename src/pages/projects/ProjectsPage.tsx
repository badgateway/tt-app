import * as React from 'react';
import { useLocation } from 'react-router-dom';
import { useResource } from 'react-ketting';
import { Project } from '@badgateway/tt-types';

import { CollectionLinks } from '../../components/CollectionLinks';
import { getTitle } from '../../resource-util';

import { Link } from 'react-router-dom';

export function ProjectsPage() {

  const location = useLocation();

  const { loading, error, resourceState, resource } = useResource<Project>(
    location.pathname,
    { refreshOnStale: true }
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error">{error.message}</div>;

  return <>
    <div className="page-header">
      <h1>
        {getTitle(resourceState)}
      </h1>
      <Link className="btn btn-primary" to='/project/new'>Create new project</Link>
    </div>
    <div>
      <CollectionLinks resource={resource} sort="DESC"/>
    </div>
  </>;

}

