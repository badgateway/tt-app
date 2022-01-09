import * as React from 'react';
import { useResource } from 'react-ketting';
import { Resource } from 'ketting';

type Props = {
  resource: Resource
}

export function BodyProperties(props: Props) {

  const { loading, data } = useResource(props.resource);

  if (loading) return null;
  if (!data) null;

  if (typeof data === 'string') {
    return <section>
      <h1>Contents</h1>
      <div>{data}</div>
    </section>
  }

  const entries = Object.entries(data);
  if (!entries) return null;

  return <section>
    <h1>Contents</h1>
    <table>
      <tbody>
        <tr key="head"><th>Key</th><th>Value</th></tr>
        {entries.map( ([key, value]) => {
          let newVal: string|number = 'Cannot render this type';
          if (typeof value === 'string' || typeof value === 'number') {
            newVal = value;
          }

          return <tr key={key}><th>{key}</th><td>{newVal}</td></tr>;
        })}
      </tbody>
    </table>

  </section>

}
