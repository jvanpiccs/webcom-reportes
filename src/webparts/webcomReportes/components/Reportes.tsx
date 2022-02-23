import {
  DetailsListLayoutMode,
  IColumn,
  SelectionMode,
  ShimmeredDetailsList,
  Text,
  Icon,
  Link,
} from '@fluentui/react';
import { IFileInfo } from '@pnp/sp/files';
import * as React from 'react';

export interface IReportesProps {
  files: IFileInfo[];
  loading: boolean;
}

export const Reportes: React.FunctionComponent<IReportesProps> = (
  props: React.PropsWithChildren<IReportesProps>
) => {
  console.log(props.files);
  function downloadReporte(id) {
    console.log(id);
  }
  let reportesColumns: IColumn[] = [
    {
      key: 'title',
      name: 'Reporte',
      minWidth: 100,
      fieldName: 'Name',
      onRender: (item) => (
        <Link onClick={() => downloadReporte(item.UniqueId)}>
          <Icon iconName='ExcelDocument' /> <Text>{item.Name}</Text>
        </Link>
      ),
    },
  ];
  return (
    <>
      <ShimmeredDetailsList
        items={props.files}
        columns={reportesColumns}
        selectionMode={SelectionMode.none}
        compact
        enableShimmer={props.loading}
        isHeaderVisible={false}
        layoutMode={DetailsListLayoutMode.justified}
      />
    </>
  );
};
