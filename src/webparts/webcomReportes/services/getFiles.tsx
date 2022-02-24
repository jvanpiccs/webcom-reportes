import { spfi, SPFx } from '@pnp/sp';
import '@pnp/sp/webs';
import '@pnp/sp/items';
import '@pnp/sp/folders';
import '@pnp/sp/lists';
import '@pnp/sp/files';

export default async function getTypes(context, type, query) {
  const sp = spfi().using(SPFx(context));
  try {
    let files = await sp.web.getFolderByServerRelativePath(type.data).files();
    if (query != '') {
      return files.filter((f) => f.Name.toLowerCase().includes(query));
    } else {
      return files;
    }
  } catch (err) {
    console.log(err);
  }
}
