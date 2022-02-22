export const initialState = {
  isLoading: false,
  user: {},
  type: {},
  types: [],
  files: [],
  query: '',
  error: '',
  context: null,
};
export function reducerReportes(state, action) {
  switch (action.type) {
    case 'userLoading':
      return {
        ...state,
        isLoading: true,
        loadingMsg: 'Cargando usuario',
      };
    case 'userSuccess': {
      return {
        ...state,
        isLoading: false,
        user: action.payload,
      };
    }
    case 'userError':
      return {
        ...state,
        isLoading: false,
        error: action.payload.message,
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
        types: action.payload,
      };
    }
    case 'typesError': {
      return {
        ...state,
        isLoading: false,
        error: 'Error al cargar las categorías',
      };
    }
    case 'setType': {
      return {
        ...state,
        type: action.payload,
      };
    }
    case 'setQuery': {
      return {
        ...state,
        query: action.payload,
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
        files: action.payload,
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
