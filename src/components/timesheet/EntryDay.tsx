import * as React from 'react';
import { useState } from 'react';
import { Resource } from 'ketting';
import { DateTime } from 'luxon';
import { useCollection, useResource } from 'react-ketting';

import { Entry } from '@badgateway/tt-types';

type DayProps = {
  resource: Resource;
  date: DateTime;
}

export function EntryDay(props: DayProps) {

  const { items, loading, error } = useCollection<Entry>(props.resource);
  const [open, setOpen] = useState(false);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const collapsed = open ? '' : ' collapsed';
  const show = open ? ' show' : '';

  const toggleOpen = () => {
    setOpen(!open);
  }

  return <div className="accordion-item">
    <h2 className="accordion-header">
      <button className={'accordion-button' + collapsed} type="button" onClick={() => toggleOpen()}>
        {props.date.weekdayLong}, {props.date.monthLong} {props.date.day}{ordinal(props.date.day)}
      </button>
    </h2>
    <div className={'accordion-collapse collapse' + show}> 
      <div className="accordion-body">
        <table className="table table-striped">
          <thead>
             <tr>
              <th scope="col">Project</th>
              <th scope="col">Hours</th>
              <th scope="col">Description</th>
             </tr> 
           </thead>
           <tbody>
              {items.map( item => <EntryDayItem resource={item} />)}
           </tbody>
        </table>
      </div>
    </div>
  </div>;

}

type EntryDayItemProps = {
  resource: Resource<Entry>;
}

function EntryDayItem(props: EntryDayItemProps) {

  const { resourceState, loading, error } = useResource<Entry>(props.resource);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const projectName = resourceState.links.get('project')?.title ?? 'No project name :(';

  return <tr>
    <td>{projectName}</td>
    <td>{(resourceState.data.minutes / 60).toFixed(2)}</td>
    <td>{resourceState.data.description}</td>
  </tr>;

}

function ordinal(input: number): string {

  if (input === 11 || input === 12 || input === 13) return 'th';
  const lastDigit = input % 10;

  switch (lastDigit) {
    case 1: return 'st';
    case 2: return 'rd';
    case 3: return 'nd';
    default:  return 'th'
  }
}
