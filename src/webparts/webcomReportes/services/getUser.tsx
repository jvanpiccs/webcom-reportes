import { spfi, SPFx } from '@pnp/sp';
import '@pnp/sp/webs';
import '@pnp/sp/lists';
import '@pnp/sp/items';
import '@pnp/sp/site-users/web';
import { HttpRequestError } from '@pnp/queryable';

export default async function getUser(state, dispatch) {
  //!sp
  const sp = spfi().using(SPFx(state.context));
  let listId = '2a529d15-8e90-4e08-a9ee-c4360dc6ad45';

  //!inicio
  dispatch({ type: 'userLoading' });
  try {
    let currentUser = await sp.web.currentUser();
    if (currentUser == undefined) {
      throw new Error('No se encontro el usuario logueado.');
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
      userProfile[0]['Entidades'] = await Promise.all(
        userProfile[0].EntidadesId.map(async (id) => {
          let entidad = await sp.web.lists.getById(listId).items.getById(id)();
          return entidad;
        })
      );
    }
    let newUser = { ...userProfile[0], Email: currentUser.Email };
    dispatch({ type: 'setUser', payload: newUser });
  } catch (error) {
    console.log(error);
    if (error?.isHttpRequestError) {
      dispatch({
        type: 'setError',
        payload: 'No tiene permisos para leer el listado de usuarios.',
      });
    } else {
      dispatch({
        type: 'setError',
        payload: error,
      });
    }
  }
}
