import * as React from 'react';
import { useState, useRef } from 'react';
import { Resource } from 'ketting';
import { DateTime } from 'luxon';
import { useCollection, useResource } from 'react-ketting';

import { Entry } from '@badgateway/tt-types';

import { ProjectSelect } from '../project/ProjectSelect';

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
        <table className="table table-striped table-sm">
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

  const { resourceState, setResourceState, loading, error, submit } = useResource<Entry>(props.resource);

  const delayedSubmitTimeout = useRef<null | ReturnType<typeof setTimeout>>(null);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const delayedSubmit = () => {

    if (delayedSubmitTimeout.current) {
      clearTimeout(delayedSubmitTimeout.current);
    }

    delayedSubmitTimeout.current = setTimeout(
      () => submit(),
      5000
    );

  }

  const setDescription = (description: string) => {
    
    resourceState.data.description = description;
    setResourceState(resourceState);
    delayedSubmit();

  }
  const setMinutes = (minutes: number) => {
    
    resourceState.data.minutes = minutes;
    setResourceState(resourceState);
    delayedSubmit();

  }
  const setProject = (projectHref: string) => {
    
    resourceState.links.set('project', projectHref);
    setResourceState(resourceState);
    delayedSubmit();

  }

  return <tr>
    <td>
      <ProjectSelect
        value={resourceState.links.get('project')?.href}
        onChange={projectHref => setProject(projectHref)}
        className="form-control"
      />
    </td>
    <td>
      <input
        type="number"
        value={(resourceState.data.minutes / 60).toFixed(2)}
        className="form-control"
        min="0.25"
        max="24"
        step="0.25"
        placeholder="1"
        onChange={ev => setMinutes(Math.round(ev.target.valueAsNumber * 60))}
      />
    </td>
    <td>
      <input
        type="text"
        value={resourceState.data.description}
        className="form-control"
        onChange={ev => setDescription(ev.target.value)} 
      />
    </td>
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
