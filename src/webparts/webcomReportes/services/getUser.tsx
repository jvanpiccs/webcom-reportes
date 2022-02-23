import { spfi, SPFx } from '@pnp/sp';
import '@pnp/sp/webs';
import '@pnp/sp/lists';
import '@pnp/sp/items';
import '@pnp/sp/site-users/web';

export default async function useGetuser(context) {
  const sp = spfi().using(SPFx(context));
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
        let entidad = await sp.web.lists.getById(listId).items.getById(id)();
        entidades.push(entidad);
      });
      userProfile[0]['Entidades'] = entidades;
      console.log(entidades);
    }
    return { ...userProfile[0], Email: currentUser.Email };
  } catch (err) {
    console.log(err);
  }
}
