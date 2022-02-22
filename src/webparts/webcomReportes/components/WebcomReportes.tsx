import * as React from 'react';
import { useEffect, useState } from 'react';
import {
  ComboBox,
  CommandBar,
  Depths,
  IComboBoxOption,
  ICommandBarItemProps,
  ProgressIndicator,
  SearchBox,
  Stack,
  Text,
} from '@fluentui/react';
import useGetUser from '../services/useGetUser';
import useGetTypes from '../services/useGetTypes';
import { AnimationClassNames } from 'office-ui-fabric-react';
import useGetFiles from '../services/useGetFiles';

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
  const [loading, setLoading] = useState(null);
  //user
  const { user } = useGetUser(props.context, setLoading);

  //filter
  const [type, setType] = useState<IComboBoxOption>({
    key: '/sites/webcom/Reportes',
    text: 'Todos',
    data: '/sites/webcom/Reportes',
  });
  const [query, setQuery] = useState('');
  //files
  const { types } = useGetTypes(props.context, setLoading);
  const { files } = useGetFiles(props.context, setLoading, type, query);

  let commandBarItems: ICommandBarItemProps[] = [
    {
      key: 'search',
      onRender: () => (
        <SearchBox
          placeholder='Buscar'
          onChange={(ev, newValue) => {
            ev.preventDefault();
            if (newValue != ('' || undefined)) {
              setQuery(newValue);
            } else {
              setQuery('');
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
      onRender: () => (
        <ComboBox
          placeholder='Reporte'
          // defaultSelectedKey={types[0].key}
          options={types}
          onChange={(ev, option) => {
            setType(option);
          }}
          autoComplete='on'
          allowFreeform={true}
        />
      ),
    },
  ];

  useEffect(() => {}, [user, loading, types, query]);

  return (
    <>
      <Stack
        style={{ padding: 10, boxShadow: Depths.depth16 }}
        className={AnimationClassNames.fadeIn100}
      >
        <Text variant='large' className={AnimationClassNames.fadeIn200}>
          Reportes
        </Text>
        {/* Barra de carga y error */}
        <ProgressIndicator
          label={loading?.label}
          description={loading?.description}
          percentComplete={loading?.percentComplete}
        />
        <br />
        {/* Filtros */}
        <CommandBar items={commandBarItems} farItems={commandBarFarItems} />
        {/* Resultados */}
        <ul>
          {files?.map((i) => (
            <li>{i.Name}</li>
          ))}
        </ul>
      </Stack>
    </>
  );
};
