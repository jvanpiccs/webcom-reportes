export const reportesInitialState = {
  isLoading: false,
  isLoadingFiles: false,
  loadingMsg: '',
  user: undefined,
  type: undefined,
  types: [],
  files: [],
  tree: null,
  query: '',
  error: '',
  context: undefined,
  token: undefined,
};
export function reducerReportes(state, action) {
  switch (action.type) {
    case 'setToken': {
      return {
        ...state,
        token: action.payload,
      };
    }
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
    case 'setFiles': {
      return {
        ...state,
        isLoading: false,
        files: action.payload,
      };
    }
    case 'userError':
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case 'filesError': {
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    }
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
    case 'loadingFiles': {
      return {
        ...state,
        filesLoading: true,
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
