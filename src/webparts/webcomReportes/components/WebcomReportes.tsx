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
import useGetuser from '../services/useGetUser';
import useGetUser from '../services/useGetUser';
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

  // let newUser = useGetUser(props.context).user;
  // let newTypes = useGetTypes(props.context).types;
  // let newFiles = useGetFiles(props.context, type, query).files;
  // console.log({ types });
  function getUser(context) {
    let user = useGetUser(context).user;
    console.log({ user });
    return user;
  }
  //usuario
  useEffect(() => {
    async function fetchData() {
      dispatch({ type: 'userLoading', value: props.context });
      try {
        dispatch({
          type: 'userSuccess',
          value: getUser(props.context),
        });
      } catch (err) {
        dispatch({ type: 'userError', value: err });
        console.log(err);
      }
    }
    fetchData();
  }, []);
  //types
  // useEffect(() => {
  //   async function fetchData() {
  //     dispatch({ type: 'typesLoading' });
  //     try {
  //       dispatch({ type: 'typesSuccess', value: newTypes });
  //     } catch (err) {
  //       dispatch({ type: 'typesErrors', value: err });
  //       console.log(err);
  //     }
  //   }
  //   if (user != undefined && newTypes != undefined) {
  //     fetchData();
  //   }
  //   console.log({ types });
  // }, [user]);
  // files
  // useEffect(() => {
  //   async function fetchData() {
  //     dispatch({ type: 'filesLoading' });
  //     try {
  //       dispatch({ type: 'filesSuccess', });
  //     } catch (err) {
  //       dispatch({ type: 'filesError' });
  //     }
  //   }
  //   if (query != '' || type == undefined) {
  //     fetchData();
  //   }
  // }, [type, query]);

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
        types != undefined && (
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
