import { State } from 'ketting';

export function getTitle(resourceState: State): string {


  let title;
  title = resourceState.data.title;
  if (!title) title = resourceState.data.name;
  if (!title) title = resourceState.links.get('self')?.title;
  if (!title) title = resourceState.uri;
  return title;

}

export function getModifiedAtFormatted(resourceState: State): string {

  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const date = new Date(resourceState.data.modifiedAt);
  const dateString = `${months[date.getMonth()]} ${date.getDate()}, ${date.getUTCFullYear()}`;

  return dateString;

}
