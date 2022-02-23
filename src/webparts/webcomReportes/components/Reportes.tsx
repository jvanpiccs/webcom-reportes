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
  isLoading: boolean;
}

export const Reportes: React.FunctionComponent<IReportesProps> = (
  props: React.PropsWithChildren<IReportesProps>
) => {
  let { files, isLoading } = props;
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
        enableShimmer={isLoading}
        isHeaderVisible={false}
        layoutMode={DetailsListLayoutMode.justified}
        shimmerLines={6}
      />
    </>
  );
};
