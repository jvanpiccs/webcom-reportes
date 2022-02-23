import { spfi, SPFx } from '@pnp/sp';
import '@pnp/sp/webs';
import '@pnp/sp/items';
import '@pnp/sp/folders';
import '@pnp/sp/lists';
import '@pnp/sp/files';

export default async function getTypes(context, type, query) {
  const sp = spfi().using(SPFx(context));
  const listId = '13c99e77-c804-4d36-8012-de6094bf0d5e';

  try {
    let newFiles = await sp.web
      .getFolderByServerRelativePath(type.data)
      .files();
    let files = newFiles.filter((f) => f.Name.toLowerCase().includes(query));
    return files;
  } catch (err) {
    console.log(err);
  }
}
