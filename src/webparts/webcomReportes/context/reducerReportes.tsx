export const reportesInitialState = {
  isLoading: false,
  loadingMsg: '',
  user: undefined,
  type: undefined,
  types: [],
  allFiles: [],
  files: [],
  filesLoading: false,
  query: '',
  error: '',
  context: undefined,
};
export function reducerReportes(state, action) {
  switch (action.type) {
    case 'setError': {
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    }
    case 'clearError': {
      return {
        ...state,
        error: '',
        isLoading: false,
      };
    }
    case 'setContext': {
      return {
        ...state,
        context: action.payload,
      };
    }
    case 'userLoading':
      return {
        ...state,
        isLoading: true,
        loadingMsg: 'Cargando usuario',
      };
    case 'setUser': {
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
        error: action.payload,
      };
    case 'typesLoading': {
      return {
        ...state,
        isLoading: true,
        loadingMsg: 'Cargado categorías',
      };
    }
    case 'setTypes': {
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
    case 'downloadError': {
      return {
        ...state,
        error: action.payload,
      };
    }

    default:
      return state;
  }
}
