import * as React from 'react';
import {
  DetailsListLayoutMode,
  IColumn,
  SelectionMode,
  ShimmeredDetailsList,
} from '@fluentui/react';

import { ReportesStateContext } from '../context/ReportesContext';
import { useContext } from 'react';
import { Reporte } from './Reporte';

export interface IReportesProps {}

export const Reportes: React.FunctionComponent<IReportesProps> = (
  props: React.PropsWithChildren<IReportesProps>
) => {
  let state = useContext(ReportesStateContext);

  let reportesColumns: IColumn[] = [
    {
      key: 'title',
      name: 'Reporte',
      minWidth: 100,
      fieldName: 'Name',
      onRender: (file) => <Reporte key={file.UniqueId} file={file} />,
    },
  ];

  return (
    <ShimmeredDetailsList
      items={state.files}
      columns={reportesColumns}
      selectionMode={SelectionMode.none}
      compact
      enableShimmer={state.isLoadingFiles}
      isHeaderVisible={false}
      layoutMode={DetailsListLayoutMode.justified}
      shimmerLines={6}
    />
  );
};
