import * as React from 'react';
import { useCollection, useResource } from 'react-ketting';
import { Resource } from 'ketting';
import { Link } from 'react-router-dom';
import { getTitle } from '../resource-util';

type Props = {
  resource: Resource
}

export function CollectionLinks(props: Props) {

  const { items } = useCollection(props.resource);

  if (!items) return null;

  return <ul>{items.map( item => <CollectionItem resource={item} key={item.uri} />)}</ul>;

}

export function CollectionItem(props: Props) {

  const { loading, error, resourceState } = useResource(props.resource);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error">{error.message}</div>;

  return <li>
    <Link to={resourceState.uri}>
     {getTitle(resourceState)}
    </Link>
  </li>; 

}
