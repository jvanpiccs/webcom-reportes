import { spfi, SPFx } from '@pnp/sp';
import '@pnp/sp/webs';
import '@pnp/sp/items';
import '@pnp/sp/folders';
import '@pnp/sp/lists';
import '@pnp/sp/files';

export default async function getFiles(state, dispatch) {
  const sp = spfi().using(SPFx(state.context));

  try {
    let newFiles = [];
    if (state.type != undefined) {
      let files = await sp.web
        .getFolderByServerRelativePath(state.type?.data)
        .files();

      if (files && state.query != '') {
        await dispatch({ type: 'loadingFiles' });
        newFiles = files.filter((f) =>
          f.Name.toLowerCase().includes(state.query)
        );
      } else {
        newFiles = files;
      }
    }
    // dispatch({ type: 'setFiles', payload: [] });
    dispatch({ type: 'setFiles', payload: newFiles });
  } catch (error) {
    console.log(error);
    dispatch({ type: 'setError', payload: error });
  }
}
