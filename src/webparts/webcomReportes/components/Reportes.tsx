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
} from '@fluentui/react';
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
import { initialState, reducerReportes } from '../services/reducerReportes';
export interface IReporteProps {
  file: any;
  entidades;
  context;
}

export const Reporte: React.FunctionComponent<IReporteProps> = (
  props: React.PropsWithChildren<IReporteProps>
) => {
  const [state, dispatch] = React.useReducer(reducerReportes, initialState);
  let { file, entidades, context } = props;
  let [isDownloading, setIsDownloading] = React.useState(false);
  async function downloadReporte(file) {
    try {
      setIsDownloading(true);
      let downloadFile = await getExcel(file, entidades, context);
      setIsDownloading(false);
      return downloadFile;
    } catch (error) {
      dispatch({ type: 'downloadError', payload: error });
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
    </Stack>
  );
};
