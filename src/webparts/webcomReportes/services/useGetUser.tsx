import { useState, useEffect } from 'react';
import { spfi, SPFx } from '@pnp/sp';
import '@pnp/sp/webs';
import '@pnp/sp/lists';
import '@pnp/sp/items';
import '@pnp/sp/site-users/web';

export default function useGetuser(context, setLoading) {
  const sp = spfi().using(SPFx(context));
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchData() {
      setLoading({
        label: 'Usuario',
        description: 'Cargando',
        percentComplete: 0,
      });
      try {
        let listId = '2a529d15-8e90-4e08-a9ee-c4360dc6ad45';
        let currentUser = await sp.web.currentUser();
        if (currentUser == undefined) {
          throw 'No se encontro el usuario logueado.';
        }
        let userProfile = await sp.web.lists
          .getById(listId)
          .items.filter(`UsuarioId eq ${currentUser.Id}`)();
        if (userProfile.length == 0) {
          throw `El usuario '${currentUser.Email}' no se encuentra habilitado para la descarga de reportes.`;
        }
        if (userProfile[0].EntidadesId == 0) {
          throw `El usuario '${currentUser.Email}' no registra entidades asignadas.`;
        } else {
          let entidades = [];
          userProfile[0].EntidadesId.map(async (id) => {
            let entidad = await sp.web.lists
              .getById(listId)
              .items.getById(id)();
            entidades.push(entidad);
          });
          userProfile[0]['Entidades'] = entidades;
        }
        setUser(userProfile[0]);
        setLoading({
          label: 'Usuario',
          description: 'Cargado',
          percentComplete: 1,
        });
      } catch (err) {
        setLoading({
          label: 'Error en la carga de usuario',
          description: err,
          percentComplete: 1,
        });
      }
    }

    fetchData();
  }, [context]);

  return {
    user,
  };
}
