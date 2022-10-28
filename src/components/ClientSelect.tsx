import * as React from 'react';

import { Resource } from 'ketting';
import { useCollection, useResource } from 'react-ketting';

import { Client } from '@badgateway/tt-types';

type Props = {
  className?: string;
  id?: string;
  defaultValue?: string;
  onChange?: (clientHref: string) => void;
  client?: string;
  required?: boolean;
}

export function ClientSelect(props: Props) {
  const [selectValue, setSelectValue] = React.useState(props.client);
  const { loading, items } = useCollection('/client');
  const { onChange, ...passThrough } = props;

  if (loading) {
    return <select {...passThrough}></select>;
  }

  const changeHandler = (ev: React.ChangeEvent<HTMLSelectElement>) => {

    if (onChange) {
      setSelectValue(ev.target.value);
      onChange(ev.target.value);
    }

  };

  return (
    <select
      {...passThrough}
      onChange={changeHandler}
      className={props.className}
      id={props.id}
      value={selectValue}
      required={props.required}
    >
      <option value='' style={{display: 'none'}}>
        Select a client
      </option>
      {items.map((item) => (
        <ClientOption resource={item} key={item.uri} />
      ))}
    </select>
  );
}


type OptionProps = {
  resource: Resource<Client>;
};

function ClientOption(props: OptionProps) {

  const { loading, data } = useResource(props.resource);

  if (loading) return <option value={props.resource.uri}>Loading...</option>;
  return <option value={props.resource.uri}>{data.name}</option>;

}
