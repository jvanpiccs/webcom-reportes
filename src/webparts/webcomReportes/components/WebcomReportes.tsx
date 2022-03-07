import * as React from 'react';
import { useState, useEffect, useReducer } from 'react';
import {
  Depths,
  Link,
  MessageBar,
  MessageBarType,
  Persona,
  PersonaPresence,
  PersonaSize,
  ProgressIndicator,
  Stack,
  Text,
  TooltipHost,
} from '@fluentui/react';
import { AnimationClassNames, fontFace } from 'office-ui-fabric-react';

import { reducerReportes, initialState } from '../services/reducerReportes';
import getUser from '../services/getUser';
import getTypes from '../services/getTypes';
import { Reportes } from './Reportes';
import { Filtros } from './Filtros';
import getFiles from '../services/getFiles';

export interface IWebcomReportesProps {
  description: string;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
  context: any;
}

export const WebcomReportes: React.FunctionComponent<IWebcomReportesProps> = (
  props: React.PropsWithChildren<IWebcomReportesProps>
) => {
  const [state, dispatch] = useReducer(reducerReportes, initialState);
  const {
    user,
    isLoading,
    loadingMsg,
    error,
    context,
    type,
    types,
    query,
    allFiles,
    files,
    filesLoading,
  } = state;

  //!usuario y categorias
  useEffect(() => {
    async function fetchLoading() {
      dispatch({ type: 'userLoading', payload: props.context });
      try {
        let user = await getUser(props.context);
        dispatch({ type: 'userSuccess', payload: user });
      } catch (error) {
        console.log(error);
        dispatch({ type: 'userError', payload: error });
      }

      try {
        let types = await getTypes(props.context);
        dispatch({ type: 'typesSuccess', payload: types });
      } catch (error) {
        console.log(error);
        dispatch({ type: 'allFilesError', payload: error });
      }
    }
    fetchLoading();
  }, []);

  //! busqueda y filtrado
  useEffect(() => {
    async function fetchData() {
      dispatch({ type: 'filesLoading' });
      try {
        let files = await getFiles(context, type, query);
        dispatch({ type: 'setFiles', payload: files });
      } catch (err) {
        dispatch({ type: 'filesError' });
        console.log(err);
      }
    }
    if (types != undefined) {
      fetchData();
    }
  }, [type, query]);

  return (
    <>
      <Stack
        style={{ padding: 20, boxShadow: Depths.depth16 }}
        className={AnimationClassNames.fadeIn100}
        tokens={{ childrenGap: 10 }}
      >
        <Stack
          horizontal
          horizontalAlign='space-between'
          wrap
          verticalAlign='center'
        >
          <Text variant='large' className={AnimationClassNames.fadeIn200}>
            Reportes
          </Text>
          {!isLoading && user != undefined && (
            <Persona
              aria-describedby='tooltipPersona'
              text={user.Email}
              secondaryText={`Entidades: ${user.Entidades?.map(
                (e) => e.Entidad
              ).join(', ')}`}
              showSecondaryText
              size={PersonaSize.size24}
              presence={PersonaPresence.none}
              className={AnimationClassNames.fadeIn100}
            />
          )}
        </Stack>
        {error != '' && (
          <MessageBar
            messageBarType={MessageBarType.error}
            className={AnimationClassNames.scaleUpIn100}
          >
            Error: {error}
          </MessageBar>
        )}
        {isLoading && (
          <ProgressIndicator
            className={AnimationClassNames.fadeIn100}
            barHeight={1}
            description={loadingMsg}
          />
        )}
        {!isLoading && user != null && allFiles != [] && (
          <>
            <Filtros
              dispatch={dispatch}
              types={types}
              hasResults={files.length != 0}
            />
            <Reportes
              files={files}
              isLoading={filesLoading}
              context={context}
              entidades={user.Entidades}
            />
          </>
        )}
      </Stack>
    </>
  );
};
