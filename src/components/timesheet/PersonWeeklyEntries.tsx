import * as React from 'react';
import { useState } from 'react';
import { useResource } from 'react-ketting';
import { Resource } from 'ketting';
import { DateTime } from 'luxon';

import { Person } from '@badgateway/tt-types';

import { EntryDay } from './EntryDay';

type Props = {
  resource: Resource<Person>;
}

export function PersonWeeklyEntries(props: Props) {

  const { loading, error, resourceState } = useResource(props.resource);

  const [currentDate, setCurrentDate] = useState<DateTime>(() => {

    return DateTime.now().startOf('week');

  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error">{error.message}</div>;

  const weekDec = () => {
    setCurrentDate(currentDate.minus({'weeks': 1}));
  };
  const weekInc = () => {
    setCurrentDate(currentDate.plus({'weeks': 1}));
  };

  return <>
    <ul className="pagination justify-content-center">
      <li className="page-item">
        <button className="page-link" onClick={weekDec}>Week {currentDate.weekNumber - 1}</button>
      </li>
      <li className="page-item active">
        <button className="page-link">Week {currentDate.weekNumber}</button>
      </li>
      <li className="page-item">
        <button className="page-link" onClick={weekInc}>Week {currentDate.weekNumber + 1}</button>
      </li>
    </ul>
    <div className="accordion">
      {[0, 1, 2, 3, 4, 5, 6].map( val =>
        <EntryDay
          date={currentDate.plus({'days': val})}
          resource={resourceState.follow('entry-collection')}
          personResource={props.resource}
          key={'day-' + val}
        />
      )}
    </div>
  </>;

}
