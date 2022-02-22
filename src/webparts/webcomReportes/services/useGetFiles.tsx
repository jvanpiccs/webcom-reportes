import { useState, useEffect } from 'react';
import { spfi, SPFx } from '@pnp/sp';
import '@pnp/sp/webs';
import '@pnp/sp/items';
import '@pnp/sp/folders';
import '@pnp/sp/lists';
import '@pnp/sp/files';

export default function useGetFiles(context, setLoading, type, query) {
  const sp = spfi().using(SPFx(context));
  const [files, setFiles] = useState([]);
  const listId = '13c99e77-c804-4d36-8012-de6094bf0d5e';

  useEffect(() => {
    async function fetchData() {
      setLoading({
        label: 'Reportes',
        description: 'Cargando reportes',
        percentComplete: 0.1,
      });
      try {
        let newFiles = await sp.web
          .getFolderByServerRelativePath(type.data)
          .files();
        let filterFiles = newFiles.filter((file) =>
          file.Name.toLowerCase().includes(query.toLowerCase().trim())
        );
        setFiles(filterFiles);
        setLoading({
          label: 'Reportes',
          description: 'Reportes cargados',
          percentComplete: 1,
        });
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, [type, query]);

  return {
    files,
  };
}
