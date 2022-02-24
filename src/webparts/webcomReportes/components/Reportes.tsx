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
import * as React from 'react';
import getExcel from '../services/getExcel';

export interface IReportesProps {
  files: IFileInfo[];
  isLoading: boolean;
}

export const Reportes: React.FunctionComponent<IReportesProps> = (
  props: React.PropsWithChildren<IReportesProps>
) => {
  let { files, isLoading } = props;
  let reportesColumns: IColumn[] = [
    {
      key: 'title',
      name: 'Reporte',
      minWidth: 100,
      fieldName: 'Name',
      onRender: (i) => <Reporte file={i} />,
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

export interface IReporteProps {
  file: any;
}

export const Reporte: React.FunctionComponent<IReporteProps> = (
  props: React.PropsWithChildren<IReporteProps>
) => {
  let [isDownloading, setIsDownloading] = React.useState(false);
  async function downloadReporte(file) {
    setIsDownloading(true);
    let downloadFile = await getExcel(file);
    setIsDownloading(false);
    return downloadFile;
  }
  return (
    <Stack horizontal horizontalAlign='space-between'>
      <Link onClick={() => downloadReporte(props.file)} title='Descargar'>
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
