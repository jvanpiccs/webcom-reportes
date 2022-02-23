import * as React from 'react';
import { useState, useEffect, useReducer } from 'react';
import {
  ComboBox,
  CommandBar,
  Depths,
  ICommandBarItemProps,
  MessageBar,
  MessageBarType,
  ProgressIndicator,
  SearchBox,
  Separator,
  Stack,
  Text,
} from '@fluentui/react';
import { AnimationClassNames } from 'office-ui-fabric-react';

import { reducerReportes, initialState } from '../services/reducerReportes';
import getUser from '../services/getUser';
import getTypes from '../services/getTypes';
import getFiles from '../services/getFiles';
import { Reportes } from './Reportes';

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
    files,
    filesLoading,
  } = state;

  useEffect(() => {
    async function fetchLoading() {
      //!loading user and adding context
      dispatch({ type: 'userLoading', payload: props.context });
      try {
        let user = await getUser(props.context);
        dispatch({ type: 'userSuccess', payload: user });
      } catch (err) {
        dispatch({ type: 'userError', payload: err });
        console.log(err);
      }

      //!loading types
      dispatch({ type: 'typesLoading', payload: types });
      try {
        const types = await getTypes(props.context);
        dispatch({ type: 'typesSuccess', payload: types });
        console.log({ types });
      } catch (err) {
        dispatch({ type: 'typesError', payload: err });
        console.log(err);
      }
    }

    fetchLoading();
  }, []);

  useEffect(() => {
    //!getFiles
    async function fetchData() {
      dispatch({ type: 'filesLoading' });

      try {
        let files = await getFiles(context, type, query);
        dispatch({ type: 'filesSuccess', payload: files });
        console.log(files);
      } catch (err) {
        dispatch({ type: 'filesError' });
      }
    }
    if (type != undefined) {
      fetchData();
    }
  }, [query, type]);

  let commandBarItems: ICommandBarItemProps[] = [
    {
      key: 'search',
      onRender: () => (
        <SearchBox
          placeholder='Buscar'
          onChange={(ev, newValue) => {
            if (newValue.trim() != '' || newValue != undefined) {
              dispatch({
                type: 'setQuery',
                payload: newValue.trim().toLowerCase(),
              });
            }
          }}
        />
      ),
    },
  ];

  let commandBarFarItems: ICommandBarItemProps[] = [
    {
      key: 'type',
      text: 'Tipo de reporte',
      onRender: () =>
        types != undefined && (
          <ComboBox
            placeholder='Reporte'
            options={types}
            onChange={(ev, option) => {
              dispatch({ type: 'setType', payload: option });
            }}
            autoComplete='on'
            allowFreeform={true}
          />
        ),
    },
  ];

  return (
    <>
      <Stack
        style={{ padding: 20, boxShadow: Depths.depth16 }}
        className={AnimationClassNames.fadeIn100}
        tokens={{ childrenGap: 10 }}
      >
        <Text variant='large' className={AnimationClassNames.fadeIn200}>
          Reportes
        </Text>
        <br />
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
        {!isLoading && (
          <>
            <CommandBar
              items={commandBarItems}
              farItems={commandBarFarItems}
              className={AnimationClassNames.fadeIn100}
            />
            <Reportes files={files} loading={filesLoading} />
          </>
        )}
      </Stack>
    </>
  );
};
