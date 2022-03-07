import * as React from 'react';
import {
  DetailsListLayoutMode,
  IColumn,
  SelectionMode,
  ShimmeredDetailsList,
  Text,
  Icon,
  Link,
  Spinner,
  SpinnerSize,
  Stack,
  Callout,
  positionCallout,
  DirectionalHint,
} from '@fluentui/react';
import { useBoolean, useId } from '@fluentui/react-hooks';
import { IFileInfo } from '@pnp/sp/files';

export interface IReportesProps {
  files: IFileInfo[];
  isLoading: boolean;
  entidades;
  context;
}

export const Reportes: React.FunctionComponent<IReportesProps> = (
  props: React.PropsWithChildren<IReportesProps>
) => {
  let { files, isLoading, entidades, context } = props;
  let reportesColumns: IColumn[] = [
    {
      key: 'title',
      name: 'Reporte',
      minWidth: 100,
      fieldName: 'Name',
      onRender: (file) => (
        <Reporte file={file} entidades={entidades} context={context} />
      ),
    },
  ];
  return (
    <>
      <ShimmeredDetailsList
        items={files}
        columns={reportesColumns}
        selectionMode={SelectionMode.none}
        compact
        enableShimmer={isLoading}
        isHeaderVisible={false}
        layoutMode={DetailsListLayoutMode.justified}
        shimmerLines={6}
      />
    </>
  );
};
//!link de descarga
import { getExcel } from '../services/getExcel';
export interface IReporteProps {
  file: any;
  entidades;
  context;
}

export const Reporte: React.FunctionComponent<IReporteProps> = (
  props: React.PropsWithChildren<IReporteProps>
) => {
  let { file, entidades, context } = props;
  let [isDownloading, setIsDownloading] = React.useState(false);
  let [error, setError] = React.useState('');
  const buttonId = useId(`error-${props.file.UniqueId}`);
  console.log(error);

  const [isCalloutVisible, { toggle: toggleIsCalloutVisible }] =
    useBoolean(false);

  async function downloadReporte(file) {
    try {
      setIsDownloading(true);
      let excel = await getExcel(file, entidades, context);
      setIsDownloading(false);
      setError('');
    } catch (error) {
      setIsDownloading(false);
      setError(error);
    }
  }

  return (
    <Stack horizontal horizontalAlign='space-between'>
      <Link onClick={() => downloadReporte(file)} title='Descargar'>
        <Icon iconName='ExcelDocument' />
        <Text>{props.file.Name}</Text>
      </Link>

      {isDownloading && (
        <Spinner
          label='Descargando...'
          size={SpinnerSize.small}
          labelPosition='right'
        />
      )}
      {error != '' && (
        <Stack horizontalAlign='end'>
          <Link
            title={error}
            aria-multiline
            block
            variant='small'
            style={{ color: 'red', textAlign: 'right' }}
            id={buttonId}
            onClick={toggleIsCalloutVisible}
          >
            Error
          </Link>
          {isCalloutVisible && (
            <Callout
              style={{ width: 321, maxWidth: '90%', padding: '10px 14px' }}
              gapSpace={0}
              target={`#${buttonId}`}
              onDismiss={toggleIsCalloutVisible}
              setInitialFocus
              directionalHint={DirectionalHint.leftCenter}
            >
              <Text>{error}</Text>
            </Callout>
          )}
        </Stack>
      )}
    </Stack>
  );
};
