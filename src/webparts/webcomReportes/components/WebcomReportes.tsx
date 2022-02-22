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
  Stack,
  Text,
} from '@fluentui/react';
import { AnimationClassNames } from 'office-ui-fabric-react';

import { reducerReportes, initialState } from '../services/reducerReportes';
import getUser from '../services/getUser';
import useGetTypes from '../services/useGetTypes';
import getTypes from '../services/getTypes';

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
  } = state;
  //! effect
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'userLoading' });
      try {
        const user = await getUser(props.context);
        dispatch({ type: 'userSuccess', payload: user });
      } catch (err) {
        dispatch({ type: 'userError', payload: err });
        console.log(err);
      }
      dispatch({ type: 'typesLoading', payload: types });
      try {
        const types = await getTypes(props.context);
        dispatch({ type: 'typesSuccess', payload: types });
      } catch (err) {
        dispatch({ type: 'typesError', payload: err });
        console.log(err);
      }
    };
    fetchData();
  }, []);

  let commandBarItems: ICommandBarItemProps[] = [
    {
      key: 'search',
      onRender: () =>
        files != [] && (
          <SearchBox
            placeholder='Buscar'
            onChange={(ev, newValue) => {
              dispatch({
                type: 'setQuery',
                value: newValue?.toLowerCase()?.trim(),
              });
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
        types.length != 0 && (
          <ComboBox
            placeholder='Reporte'
            defaultSelectedKey={types[0].key}
            options={types}
            onChange={(ev, option) => {
              dispatch({ type: 'setType', value: option });
              console.log({ type });
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
        style={{ padding: 10, boxShadow: Depths.depth16 }}
        className={AnimationClassNames.fadeIn100}
        tokens={{ childrenGap: 10 }}
      >
        <Text variant='large' className={AnimationClassNames.fadeIn200}>
          Reportes
        </Text>
        {error != '' && (
          <MessageBar
            messageBarType={MessageBarType.error}
            className={AnimationClassNames.scaleUpIn100}
          >
            Error: {error}
          </MessageBar>
        )}
        <ProgressIndicator
          className={
            isLoading
              ? AnimationClassNames.fadeIn100
              : AnimationClassNames.fadeOut100
          }
          description={loadingMsg}
        />
        <br />
        <CommandBar items={commandBarItems} farItems={commandBarFarItems} />
        <ul>
          {files?.map((i) => (
            <li>{i.Name}</li>
          ))}
        </ul>
      </Stack>
    </>
  );
};
