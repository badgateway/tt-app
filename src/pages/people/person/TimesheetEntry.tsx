import * as React from 'react';
import { useState, useRef } from 'react';
import { Resource } from 'ketting';
import { DateTime } from 'luxon';
import { useCollection, useResource } from 'react-ketting';

import { Entry, EntryNew, Person } from '@badgateway/tt-types';

import { ProjectSelect } from '../../../components/ProjectSelect';

type DayProps = {
  resource: Resource;
  personResource: Resource<Person>;
  date: DateTime;
}

export function EntryDay(props: DayProps) {

  const { items, loading, error } = useCollection<Entry>(
    props.resource,
    {
      refreshOnStale: true,
      rel: 'entry',
    }
  );
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
  };

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
              <th scope="col" colSpan={2}>Description</th>
            </tr>
          </thead>
          <tbody>
            {items.map( item => <EntryDayItem
              resource={item}
              key={item.uri}
              date={props.date}
            />)}
            <EntryDayItemNew
              parentResource={props.resource}
              date={props.date}
              personResource={props.personResource}
              key="new"
            />
          </tbody>
        </table>
      </div>
    </div>
  </div>;

}

type EntryDayItemProps = {
  resource: Resource<Entry>;
  date: DateTime;
}

function EntryDayItem(props: EntryDayItemProps) {

  const { resourceState, setResourceState, loading, error, submit } = useResource<Entry>(props.resource);

  const delayedSubmitTimeout = useRef<null | ReturnType<typeof setTimeout>>(null);

  if (loading) return null;

  if (error) {
    return <tr><td colSpan={3}>Error: {error.message}</td></tr>;
  }

  if (props.date.toISODate() !== resourceState.data.date) {
    return null;
  }

  const delayedSubmit = () => {

    if (delayedSubmitTimeout.current) {
      clearTimeout(delayedSubmitTimeout.current);
    }

    delayedSubmitTimeout.current = setTimeout(
      () => submit(),
      5000
    );

  };

  const setDescription = (description: string) => {

    resourceState.data.description = description;
    setResourceState(resourceState);
    delayedSubmit();

  };
  const setMinutes = (minutes: number) => {

    resourceState.data.minutes = minutes;
    setResourceState(resourceState);
    delayedSubmit();

  };
  const setProject = (projectHref: string) => {

    resourceState.links.set('project', projectHref);
    setResourceState(resourceState);
    delayedSubmit();

  };

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

type EntryDayItemNewProps = {
  parentResource: Resource;
  personResource: Resource<Person>;
  date: DateTime;
}

function EntryDayItemNew(props: EntryDayItemNewProps) {

  const [data, setData] = useState<EntryNew>({
    minutes: 60,
    description: '',
    date: props.date.toISODate(),
    billable: false,
  });

  const [projectHref, setProjectHref] = useState<string>();

  const setDescription = (description: string) => {

    setData({
      ...data,
      description
    });

  };
  const setMinutes = (minutes: number) => {

    setData({
      ...data,
      minutes
    });

  };
  const setProject = (projectHref: string) => {

    setProjectHref(projectHref);

  };

  const submit = async() => {
    await props.parentResource.postFollow({
      data: {
        ...data,
        _links: {
          project: { href: projectHref }
        }
      }
    });
    setData({
      minutes: 60,
      description: '',
      date: props.date.toISODate(),
      billable: false,
    });
    setProjectHref(undefined);

  };

  return <tr>
    <td>
      <ProjectSelect
        value={projectHref}
        onChange={projectHref => setProject(projectHref)}
        className="form-select"
        showSelectProject
      />
    </td>
    <td>
      <input
        type="number"
        value={(data.minutes / 60).toFixed(2)}
        className="form-control"
        min="0.25"
        max="24"
        step="0.25"
        placeholder="1"
        required
        onChange={ev => setMinutes(Math.round(ev.target.valueAsNumber * 60))}
      />
    </td>
    <td>
      <input
        type="text"
        value={data.description}
        className="form-control"
        required
        onChange={ev => setDescription(ev.target.value)}
      />
    </td>
    <td><button type="button" className="btn btn-primary" onClick={() => submit()}>Submit</button></td>
  </tr>;

}

function ordinal(input: number): string {

  if (input === 11 || input === 12 || input === 13) return 'th';
  const lastDigit = input % 10;

  switch (lastDigit) {
    case 1: return 'st';
    case 2: return 'rd';
    case 3: return 'nd';
    default:  return 'th';
  }
}
