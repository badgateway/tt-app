import * as React from 'react';
import { useLocation } from 'react-router-dom';
import { useResource } from 'react-ketting';

import { CollectionLinks } from './CollectionLinks';
import { BodyProperties } from './BodyProperties';
import { getTitle } from '../resource-util';

export function ResourcePage() {

  const location = useLocation();
  console.log(location.pathname);

  const { loading, error, resourceState, resource } = useResource(location.pathname);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error">{error.message}</div>;

  return <>
    <h1>{getTitle(resourceState)}</h1>
    <div>
      <CollectionLinks resource={resource} />
      <BodyProperties resource={resource} />
    </div>
  </>;

}

