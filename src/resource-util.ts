import { State } from 'ketting';

export function getTitle(resourceState: State): string {


  let title;
  title = resourceState.data.title;
  if (!title) title = resourceState.data.name;
  if (!title) title = resourceState.links.get('self')?.title;
  if (!title) title = resourceState.uri;
  return title;

}
