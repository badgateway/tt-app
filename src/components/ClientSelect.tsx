import * as React from 'react';
import {Resource} from 'ketting';
import {useCollection, useResource} from 'react-ketting';
import {Client} from '@badgateway/tt-types';

type ClientSelectProps = {
  className?: string;
  defaultValue?: string;
  id?: string;
  onChange?: (clientHref: string) => void;
  required?: boolean;
};
export function ClientSelect(props: ClientSelectProps) {
  const {onChange, ...passThrough} = props;
  const [selectValue, setSelectValue] = React.useState(props.defaultValue);
  const {loading, items} = useCollection('/client');

  const changeHandler = (ev: React.ChangeEvent<HTMLSelectElement>) => {
    if (onChange) {
      setSelectValue(ev.target.value);
      onChange(ev.target.value);
    }
  };

  if (loading) {
    return <select {...passThrough}></select>;
  }

  return (
    <select
      {...passThrough}
      onChange={changeHandler}
      className={props.className}
      id={props.id}
      value={selectValue}
      defaultValue={selectValue}
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

type ClientOptionProps = {
  resource: Resource<Client>;
};
function ClientOption(props: ClientOptionProps) {
  const {loading, data} = useResource(props.resource);

  if (loading) {
    return <option value={props.resource.uri}>Loading...</option>;
  }

  return <option value={props.resource.uri}>{data.name}</option>;
}
