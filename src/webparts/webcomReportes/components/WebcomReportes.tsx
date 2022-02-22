import * as React from 'react';
import { useEffect, useState } from 'react';
import {
  ComboBox,
  CommandBar,
  Depths,
  ICommandBarItemProps,
  MotionAnimations,
  ProgressIndicator,
  SearchBox,
  Stack,
  Text,
} from '@fluentui/react';
import useGetUser from '../services/useGetUser';
import useGetFiles from '../services/useGetFiles';
import { AnimationClassNames } from 'office-ui-fabric-react';

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
  const [type, setType] = useState({});
  const [query, setQuery] = useState('');
  //files
  const { files, folders } = useGetFiles(
    type,
    query,
    props.context,
    setLoading
  );

  let commandBarItems: ICommandBarItemProps[] = [
    {
      key: 'search',
      onRender: () => <SearchBox />,
    },
  ];

  let commandBarFarItems: ICommandBarItemProps[] = [
    {
      key: 'type',
      text: 'Tipo de reporte',
      // iconProps: { iconName: 'ReportDocument' },
      // subMenuProps: {
      //   items: folders.map((f) => {
      //     let obj = { key: f.Name, text: f.Name };
      //     return obj;
      //   }),
      // },
      onRender: () => (
        <ComboBox
          placeholder='Reporte'
          defaultSelectedKey={folders[0].Name}
          options={folders.map((f) => {
            let obj = { key: f.Name, text: f.Name };
            return obj;
          })}
          onChange={(ev, option) => {
            setType(option);
          }}
        />
      ),
    },
  ];

  useEffect(() => {
    // setLoading(null);
    // console.log({ user });
    // console.log({ loading });
  }, [user, loading, files]);

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
          className={
            loading?.percentComplete == 1
              ? AnimationClassNames.fadeOut100
              : AnimationClassNames.fadeIn100
          }
          label={loading?.label}
          description={loading?.description}
          percentComplete={loading?.percentComplete}
        />
        {/* Filtros */}
        <CommandBar items={commandBarItems} farItems={commandBarFarItems} />

        {/* Resultados */}
        <ul>
          {files.map((i) => (
            <li>{i.Name}</li>
          ))}
        </ul>
      </Stack>
    </>
  );
};
