import * as React from 'react';
import { getExcel } from '../services/getExcel';
import { useBoolean, useId } from '@fluentui/react-hooks';
import {
  Text,
  Icon,
  Link,
  Spinner,
  SpinnerSize,
  Stack,
  Callout,
  DirectionalHint,
} from '@fluentui/react';
import { ReportesStateContext } from '../context/ReportesContext';
import { useContext } from 'react';
import { IFileInfo } from '@pnp/sp/files';
import { ActionButton } from 'office-ui-fabric-react';

export interface IReporteProps {
  file: IFileInfo;
}

export const Reporte: React.FunctionComponent<IReporteProps> = (
  props: React.PropsWithChildren<IReporteProps>
) => {
  let state = useContext(ReportesStateContext);
  let { file } = props;
  let [isDownloading, setIsDownloading] = React.useState(false);
  let [error, setError] = React.useState('');
  const buttonId = useId(`error-${props.file.UniqueId}`);

  const [isCalloutVisible, { toggle: toggleIsCalloutVisible }] =
    useBoolean(false);

  async function downloadReporte(file) {
    try {
      setIsDownloading(true);
      let excel = await getExcel(file, state);
      setIsDownloading(false);
      setError('');
    } catch (error) {
      setIsDownloading(false);
      setError(error);
    }
  }

  let button = () => {
    if (isDownloading) {
      return {
        label: 'Descargando',
        icon: 'Processing',
        disabled: true,
      };
    } else if (error != '') {
      return {
        label: 'Error',
        icon: 'StatusCircleErrorX',
        disabled: false,
        onClick: () => toggleIsCalloutVisible(),
      };
    } else {
      return {
        label: 'Descargar',
        icon: 'Download',
        disabled: false,
        onClick: () => downloadReporte(file),
      };
    }
  };

  return (
    <Stack horizontal horizontalAlign='space-between'>
      <Link onClick={button().onClick} disabled={isDownloading}>
        <Icon iconName='ExcelDocument' />
        <Text>{props.file.Name}</Text>
      </Link>

      <ActionButton
        id={buttonId}
        text={button().label}
        iconProps={{ iconName: button().icon }}
        onClick={button().onClick}
        disabled={isDownloading}
        style={{ height: 20 }}
      >
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
      </ActionButton>
    </Stack>
  );
};
