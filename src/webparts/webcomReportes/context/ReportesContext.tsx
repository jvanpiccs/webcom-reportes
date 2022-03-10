import { createContext } from 'react';
import { reducerReportes, reportesInitialState } from './reducerReportes';

export const ReportesStateContext = createContext(reportesInitialState);
export const ReportesDispatchContext = createContext(reducerReportes({}, {}));
