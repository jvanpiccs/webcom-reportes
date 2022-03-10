import { spfi, SPFx } from '@pnp/sp';
import '@pnp/sp/webs';
import '@pnp/sp/items';
import '@pnp/sp/folders';
import '@pnp/sp/lists';
import '@pnp/sp/files';

export default async function getTypes(state, dispatch) {
  const sp = spfi().using(SPFx(state.context));
  const listId = '13c99e77-c804-4d36-8012-de6094bf0d5e';

  try {
    const allFolders = await sp.web.lists
      .getById(listId)
      .rootFolder.folders.orderBy('Name')
      .filter(`Name ne 'ADMIN' and Name ne 'Forms' and Name ne 'Test'`)();
    let types = [];
    allFolders.map(async (folder) => {
      let newFiles = await sp.web
        .getFolderByServerRelativePath(folder.ServerRelativeUrl)
        .files();
      if (newFiles.length != 0) {
        console.log();
        let url = newFiles[0].ServerRelativeUrl.split('/')
          .slice(0, -1)
          .join('/');
        let name = newFiles[0].ServerRelativeUrl.split('/').slice(-2)[0];
        types.push({
          key: name,
          text: name,
          data: url,
        });
      }
    });

    dispatch({ type: 'setTypes', payload: types });
  } catch (error) {
    console.log(error);
    dispatch({ type: 'setError', payload: error });
  }
}
