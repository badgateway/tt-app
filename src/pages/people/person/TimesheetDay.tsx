import * as React from 'react';
import {useState, useRef} from 'react';
import {Resource} from 'ketting';
import {DateTime} from 'luxon';
import {useCollection, useResource} from 'react-ketting';
import {ConfirmModal} from '../../../components/ConfirmModal';

import {Entry, EntryNew, Person} from '@badgateway/tt-types';

import {ProjectSelect} from '../../../components/ProjectSelect';

type TimesheetDayProps = {
  resource: Resource;
  personResource: Resource<Person>;
  date: DateTime;
};

export function TimesheetDay(props: TimesheetDayProps) {
  const {items, loading, error} = useCollection<Entry>(props.resource, {
    refreshOnStale: true,
    rel: 'entry',
  });

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

  return (
    <div className='accordion-item'>
      <h2 className='accordion-header'>
        <button
          className={'accordion-button' + collapsed}
          type='button'
          onClick={() => toggleOpen()}
        >
          {props.date.weekdayLong}, {props.date.monthLong} {props.date.day}
          {ordinal(props.date.day)}
        </button>
      </h2>
      <div className={'accordion-collapse collapse' + show}>
        <div className='accordion-body'>
          <table className='table table-striped table-sm'>
            <thead>
              <tr>
                <th scope='col'>Project</th>
                <th scope='col'>Hours</th>
                <th scope='col' colSpan={2}>
                  Description
                </th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <EntryItem
                  resource={item}
                  key={item.uri}
                  date={props.date}
                />
              ))}
              <EntryItemNew
                parentResource={props.resource}
                date={props.date}
                personResource={props.personResource}
                key='new'
              />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

type EntryItemProps = {
  resource: Resource<Entry>;
  date: DateTime;
};
function EntryItem(props: EntryItemProps) {
  const {resourceState, setResourceState, loading, error, submit} =
    useResource<Entry>(props.resource);

  const delayedSubmitTimeout = useRef<null | ReturnType<typeof setTimeout>>(
    null
  );

  const [modalOpen, setModalOpen] = React.useState(false);

  const deleteEntry = async () => {
    try {
      await props.resource.delete();
      setModalOpen(false);
    } catch (error: any) {
      setModalOpen(false);
    }
  };

  if (loading) return null;

  if (error) {
    return (
      <tr>
        <td colSpan={3}>Error: {error.message}</td>
      </tr>
    );
  }

  if (props.date.toISODate() !== resourceState.data.date) {
    return null;
  }

  const delayedSubmit = () => {
    if (delayedSubmitTimeout.current) {
      clearTimeout(delayedSubmitTimeout.current);
    }

    delayedSubmitTimeout.current = setTimeout(() => submit(), 1000);
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

  return (
    <>
      <tr>
        <td>
          <ProjectSelect
            value={resourceState.links.get('project')?.href}
            onChange={(projectHref) => setProject(projectHref)}
            className='form-control'
            required
          />
        </td>
        <td>
          <input
            type='number'
            value={(resourceState.data.minutes / 60).toFixed(2)}
            className='form-control'
            min='0.25'
            max='24'
            step='0.25'
            placeholder='1'
            onChange={(ev) =>
              setMinutes(Math.round(ev.target.valueAsNumber * 60))
            }
          />
        </td>
        <td>
          <input
            type='text'
            value={resourceState.data.description}
            className='form-control'
            onChange={(ev) => setDescription(ev.target.value)}
          />
        </td>
        <td>
          <button
            aria-label={`Delete the ${
              resourceState.links.get('project')?.title
            } entry.`}
            className='btn btn-primary'
            onClick={() => setModalOpen(true)}
            type='button'
            title='Delete this entry'
          >
            <i aria-hidden='true' className='material-icons'>
              delete
            </i>
          </button>
        </td>
      </tr>
      <ConfirmModal
        acceptAction={deleteEntry}
        acceptAria={`Delete the ${
          resourceState.links.get('project')?.title
        } entry.`}
        closeAction={setModalOpen}
        isOpen={modalOpen}
        message={`Are you sure you want to delete the entry for ${
          resourceState.links.get('project')?.title
        }?`}
        renderDecline
      />
    </>
  );
}

type EntryItemNewProps = {
  parentResource: Resource;
  personResource: Resource<Person>;
  date: DateTime;
};

function EntryItemNew(props: EntryItemNewProps) {
  const [data, setData] = useState<EntryNew>({
    minutes: 60,
    description: '',
    date: props.date.toISODate(),
    billable: false,
  });
  const [addingNew, setAddingNew] = useState<boolean>(false);
  const [projectHref, setProjectHref] = useState<string>();
  const [projectError, setProjectError] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const setDescription = (description: string) => {
    setData({
      ...data,
      description,
    });
  };
  const setMinutes = (minutes: number) => {
    setData({
      ...data,
      minutes,
    });
  };
  const setProject = (projectHref: string) => {
    setProjectError(false);
    setProjectHref(projectHref);
  };

  const submit = async () => {
    if (!projectHref) {
      setProjectError(true);
      setModalOpen(true);
      return;
    }
    try {
      await props.parentResource.post({
        data: {
          ...data,
          _links: {
            project: {href: projectHref},
          },
        },
      });
    } catch (error: any) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
    setData({
      minutes: 60,
      description: '',
      date: props.date.toISODate(),
      billable: false,
    });
    setProjectHref(undefined);
    setAddingNew(false);
  };

  return (
    <>
      {addingNew ? (
        <>
          <tr>
            <td>
              <ProjectSelect
                value={projectHref}
                onChange={(projectHref) => setProject(projectHref)}
                className={`form-select ${projectError ? 'validationError' : ''}`}
                showSelectProject
              />
            </td>
            <td>
              <input
                type='number'
                value={(data.minutes / 60).toFixed(2)}
                className='form-control'
                min='0.25'
                max='24'
                step='0.25'
                placeholder='1'
                required
                onChange={(ev) =>
                  setMinutes(Math.round(ev.target.valueAsNumber * 60))
                }
              />
            </td>
            <td>
              <input
                type='text'
                value={data.description}
                className='form-control'
                required
                onChange={(ev) => setDescription(ev.target.value)}
              />
            </td>
            <td>
              <button
                type='button'
                className='btn btn-primary'
                onClick={() => submit()}
                title='Save new entry'
              >
                <i aria-hidden='true' className='material-icons'>
                  save
                </i>
              </button>
            </td>
          </tr>
          <ConfirmModal
            acceptLabel='Ok'
            closeAction={setModalOpen}
            isOpen={modalOpen}
            message={'New entries require a project.'}
          />
        </>
      ) : (
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td>
            <button
              type='button'
              className='btn btn-primary'
              onClick={() => setAddingNew(true)}
              title='Add a new entry'
            >
              <i aria-hidden='true' className='material-icons'>
                more_time
              </i>
            </button>
          </td>
        </tr>
      )}
    </>
  );
}

function ordinal(input: number): string {
  if (input === 11 || input === 12 || input === 13) return 'th';
  const lastDigit = input % 10;

  switch (lastDigit) {
    case 1:
      return 'st';
    case 2:
      return 'rd';
    case 3:
      return 'nd';
    default:
      return 'th';
  }
}
