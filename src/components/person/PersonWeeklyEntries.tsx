import * as React from 'react';
import { useState } from 'react';
import { useResource } from 'react-ketting';
import { Resource } from 'ketting';

import { Person } from '@badgateway/tt-types';

type Props = {
  resource: Resource<Person>;
}

export function PersonWeeklyEntries(props: Props) {

  const { loading, error } = useResource(props.resource);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error">{error.message}</div>;

  return <>
    <ul className="pagination justify-content-center">
      <li className="page-item">
        <a className="page-link">Week 9</a>
      </li>
      <li className="page-item active">
        <a className="page-link">Week 10</a>
      </li>
      <li className="page-item">
        <a className="page-link">Week 11</a>
      </li>
    </ul>
    <div className="accordion">
      <EntryDay day="Monday" />
      <EntryDay day="Tuesday" />
      <EntryDay day="Wednesay" />
      <EntryDay day="Thursday" />
      <EntryDay day="Friday" />
      <EntryDay day="Saturday" />
      <EntryDay day="Sunday" />
    </div>
  </>;

}

type DayProps = {
  day: string;
}

function EntryDay(props: DayProps) {

  const [open, setOpen] = useState(false);

  const collapsed = open ? '' : ' collapsed';
  const show = open ? ' show' : '';

  const toggleOpen = () => {
    setOpen(!open);
  }

  return <div className="accordion-item">
    <h2 className="accordion-header">
      <button className={'accordion-button' + collapsed} type="button" onClick={() => toggleOpen()}>{props.day}</button>
    </h2>
    <div className={'accordion-collapse collapse' + show}> 
      <div className="accordion-body">
        List of entries!
      </div>
    </div>
  </div>;

}
