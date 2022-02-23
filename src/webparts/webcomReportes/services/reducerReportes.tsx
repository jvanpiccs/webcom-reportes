export const initialState = {
  isLoading: false,
  user: undefined,
  type: undefined,
  types: undefined,
  allFiles: [],
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
    case 'setType': {
      return {
        ...state,
        type: action.payload,
        query: '',
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
    case 'setFiles': {
      return {
        ...state,
        files: action.payload,
        filesLoading: false,
      };
    }
    case 'filesError': {
      return {
        ...state,
        filesLoading: false,
        error: 'No se encontraro reportes',
      };
    }

    default:
      return state;
  }
}
