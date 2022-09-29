import * as React from 'react';
import { useCollection, useResource } from 'react-ketting';
import { Resource } from 'ketting';
import { Link } from 'react-router-dom';
import { getTitle, getModifiedAtFormatted } from '../resource-util';

type Props = {
  resource: Resource;
  sort?: 'ASC' | 'DESC';
}

export function CollectionLinks(props: Props) {

  const { items } = useCollection(props.resource);

  if (!items) return null;

  if(props.sort && props.sort === 'DESC') {
    // adding the latest to the top
    items.reverse();
  }

  return <ul className="collection">{items.map( item => <CollectionItem resource={item} key={item.uri} />)}</ul>;

}

export function CollectionItem(props: Props) {

  const { loading, error, resourceState } = useResource(props.resource);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error">{error.message}</div>;

  const target = new URL(resourceState.uri).pathname;

  return <li>
    <Link to={target}>
      {getTitle(resourceState)}
    </Link>
    <span>{ resourceState.links.get('client')?.title }</span>
    <span title={resourceState.data.modifiedAt}>{ getModifiedAtFormatted(resourceState) }</span>
  </li>;

}
