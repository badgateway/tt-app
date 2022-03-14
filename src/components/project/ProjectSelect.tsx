import * as React from 'react';

import { Resource } from 'ketting';
import { useCollection, useResource } from 'react-ketting';

import { Project } from '@badgateway/tt-types';

type Props = {
  className?: string;
  id?: string;
  defaultValue?: string;
  value?: string;
  onChange?: (projectHref: string) => void;
  showSelectProject?: boolean;
}

export function ProjectSelect(props: Props) {

  const { loading, items } = useCollection('/project');
  const { onChange, showSelectProject, ...passThrough } = props;

  if (loading) {
    return <select {...passThrough}></select>;
  }

  const changeHandler = (ev: React.ChangeEvent<HTMLSelectElement>) => {

    if (onChange) {
      onChange(ev.target.value);
    }

  };

  return <select {...passThrough} onChange={changeHandler}>
    { showSelectProject ? <option key="empty" selected disabled>Select Project</option> : null }
    { items.map( item => <ProjectOption resource={item} key={item.uri} />) }
  </select>;
}


type OptionProps = {
  resource: Resource<Project>;
};

function ProjectOption(props: OptionProps) {

  const { loading, data } = useResource(props.resource);

  if (loading) return <option value={props.resource.uri}>Loading...</option>;
  return <option value={props.resource.uri}>{data.name}</option>;

}
