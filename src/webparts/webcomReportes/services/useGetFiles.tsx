import { useState, useEffect } from 'react';
import { spfi, SPFx } from '@pnp/sp';
import '@pnp/sp/webs';
import '@pnp/sp/items';
import '@pnp/sp/folders';
import '@pnp/sp/lists';
import '@pnp/sp/files';

export default function useGetFiles(type, query, context, setLoading) {
  const sp = spfi().using(SPFx(context));
  const [files, setFiles] = useState([]);
  const [folders, setFolders] = useState([]);
  const listId = '13c99e77-c804-4d36-8012-de6094bf0d5e';
  //get types
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading({
          label: 'Carpetas',
          description: 'Cargando carpetas',
          percentComplete: 0.1,
        });
        const allFolders = await sp.web.lists
          .getById(listId)
          .rootFolder.folders.orderBy('Name')
          .filter(`Name ne 'ADMIN' and Name ne 'Forms' and Name ne 'Test'`)();
        const newFolders = [
          { Name: 'Todos', ServerRelativeUrl: '/sites/webcom/Reportes' },
          ...allFolders,
        ];
        console.log({ newFolders });
        setFolders(newFolders);
        setLoading({
          label: 'Carpetas',
          description: 'Carpetas cargadas',
          percentComplete: 1,
        });
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading({
          label: 'Reportes',
          description: 'Cargando reportes',
          percentComplete: 0.1,
        });
        let newFiles = await sp.web
          .getFolderByServerRelativePath(folders[1]?.ServerRelativeUrl)
          .files.orderBy('Name', false)();
        console.log({ newFiles });
        setFiles(newFiles);
        setLoading({
          label: 'Reportes',
          description: 'Reportes cargados',
          percentComplete: 1,
        });
      } catch (err) {
        console.log(err);
      }
    }
    if (folders != []) {
      fetchData();
    }
  }, [type, query, setLoading, folders]);

  return {
    files,
    folders,
  };
}
