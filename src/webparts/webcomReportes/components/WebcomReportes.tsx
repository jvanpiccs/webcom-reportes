import * as React from 'react';
import { useEffect, useReducer } from 'react';
import { AnimationClassNames } from 'office-ui-fabric-react';
import { Depths, Stack, Text } from '@fluentui/react';
//components
import { Reportes } from './Reportes';
import { Filtros } from './Filtros';
//funciones
import getUser from '../services/getUser';
import getTypes from '../services/getTypes';
import getFiles from '../services/getFiles';
//context
import {
  reducerReportes,
  reportesInitialState,
} from '../context/reducerReportes';
import {
  ReportesDispatchContext,
  ReportesStateContext,
} from '../context/ReportesContext';
import { ErrorMessage } from './ErrorMessage';
import { LoadingBar } from './LoadingBar';
import { User } from './User';
import { getData } from '../services/getData';

export interface IWebcomReportesProps {
  isDarkTheme: boolean;
  context: any;
}

export const WebcomReportes: React.FunctionComponent<IWebcomReportesProps> = (
  props: React.PropsWithChildren<IWebcomReportesProps>
) => {
  const [state, dispatch] = useReducer(reducerReportes, reportesInitialState);
  useEffect(() => {
    dispatch({ type: 'setContext', payload: props.context });
  }, []);

  //! data
  useEffect(() => {
    async function fetchData() {
      console.log('prevFlow');
      getData(state.context);
    }
    if (state.context != undefined) {
      fetchData();
    }
  }, [state.context]);

  return (
    <>
      <ReportesDispatchContext.Provider value={dispatch}>
        <ReportesStateContext.Provider value={state}>
          <Stack
            style={{ padding: 20, boxShadow: Depths.depth16 }}
            className={AnimationClassNames.fadeIn100}
            tokens={{ childrenGap: 10 }}
          >
            <Stack
              wrap
              horizontal
              horizontalAlign='space-between'
              verticalAlign='center'
            >
              <Text variant='large' className={AnimationClassNames.fadeIn200}>
                Reportes
              </Text>
              {/* <User /> */}
            </Stack>

            <Stack>
              {/* <LoadingBar /> */}
              {/* <ErrorMessage /> */}
              {/* <Filtros /> */}
              <br />
              {/* <Reportes /> */}
            </Stack>
          </Stack>
        </ReportesStateContext.Provider>
      </ReportesDispatchContext.Provider>
    </>
  );
};
