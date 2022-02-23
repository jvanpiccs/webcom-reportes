import { spfi, SPFx } from '@pnp/sp';
import '@pnp/sp/webs';
import '@pnp/sp/items';
import '@pnp/sp/folders';
import '@pnp/sp/lists';
import '@pnp/sp/files';
import { IComboBoxOption } from '@fluentui/react';

export default async function getFiles(
  context,
  type: IComboBoxOption,
  query: string
) {
  const sp = spfi().using(SPFx(context));

  try {
    let newFiles = await sp.web
      .getFolderByServerRelativePath(type.data)
      .files();
    let filterFiles = newFiles.filter((file) =>
      file.Name.toLowerCase().includes(query.toLowerCase().trim())
    );
    return filterFiles;
  } catch (err) {
    console.log(err);
  }
}
