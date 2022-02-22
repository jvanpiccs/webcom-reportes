import useGetUser from './useGetUser';

export const initialState = {
  isLoading: false,
  user: undefined,
  type: undefined,
  types: undefined,
  files: undefined,
  query: '',
  error: '',
  context: {},
};
export function reducerReportes(state, action) {
  switch (action.type) {
    case 'userLoading':
      return {
        ...state,
        isLoading: true,
        loadingMsg: 'Cargando usuario',
        context: action.value,
      };
    case 'userSuccess': {
      return {
        ...state,
        isLoading: false,
        user: action.value,
      };
    }
    case 'userError':
      return {
        ...state,
        isLoading: false,
        error: action.value.message,
      };
    case 'typesLoading': {
      return {
        ...state,
        isLoading: true,
        loadingMsg: 'Cargado categorías',
      };
    }
    case 'typesSuccess': {
      return {
        ...state,
        isLoading: false,
        types: action.value,
      };
    }
    case 'typesErrors': {
      return {
        ...state,
        isLoading: false,
        error: 'Error al cargar las categorías',
      };
    }
    case 'setType': {
      return {
        ...state,
        type: action.value,
      };
    }
    case 'setQuery': {
      return {
        ...state,
        query: action.value,
      };
    }
    case 'filesLoading': {
      return {
        ...state,
        isLoading: true,
        loadingMsg: 'Cargando reportes',
      };
    }
    case 'filesSuccess': {
      return {
        ...state,
        isLoading: false,
        files: action.value,
      };
    }
    case 'filesError': {
      return {
        ...state,
        isLoading: false,
        error: 'Error al cargar los reportes',
      };
    }

    default:
      return state;
  }
}
