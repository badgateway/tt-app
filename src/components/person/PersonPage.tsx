import * as React from 'react';
import { useState } from 'react';
import { useResource } from 'react-ketting';
import { useLocation } from 'react-router-dom';
import { Person } from '@badgateway/tt-types';
import { PersonEditForm } from './PersonEditForm';
import { PersonWeeklyEntries } from '../timesheet/PersonWeeklyEntries';

type Tab = 'weekly-entries' | 'edit';

export function PersonPage() {

  const location = useLocation();
  const { resourceState, resource, loading, error } = useResource<Person>(location.pathname);
  const [activeTab, setActiveTab] = useState<Tab>('weekly-entries');

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error">{error.message}</div>;

  let tabContents;

  switch(activeTab) {

    case 'weekly-entries' :
      tabContents = <PersonWeeklyEntries resource={resource} />
      break;
    case 'edit' :
      tabContents = <PersonEditForm resource={resource} />
      break;
  }


  return <>
    <div className="page-header"><h1>{resourceState.data.name}</h1></div>
    <ul className="nav nav-tabs">
      <TabItem label="Weekly entries" name="weekly-entries" setActiveTab={setActiveTab} activeTab={activeTab} />
      <TabItem label="Edit user" name="edit" setActiveTab={setActiveTab} activeTab={activeTab} />
    </ul>
    <div className="tab-content">
      <div className="tab-pane active">
        {tabContents}
      </div>
    </div>
  </>;

}


type TabProps = {
  label: string;
  name: Tab,
  activeTab: Tab;
  setActiveTab: (name: Tab) => void;
}

function TabItem(props: TabProps) {

  const linkClassName = 'nav-link' + (props.activeTab === props.name ? ' active' : '');

  return <li className="nav-item">
    <a href="#" className={linkClassName} onClick={() => props.setActiveTab(props.name)} >{props.label}</a>
  </li>;

}
