export const initialState = {
  isLoading: false,
  user: undefined,
  type: undefined,
  types: undefined,
  files: [],
  filesLoading: false,
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
        context: action.payload,
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
        type: action.payload[0],
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
        filesLoading: true,
      };
    }
    case 'filesSuccess': {
      return {
        ...state,
        files: action.payload,
        filesLoading: false,
      };
    }
    case 'filesError': {
      return {
        ...state,
        error: 'Error al cargar los reportes',
        filesLoading: false,
      };
    }

    default:
      return state;
  }
}
