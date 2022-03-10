import {
  AnimationClassNames,
  MessageBar,
  MessageBarType,
} from '@fluentui/react';
import * as React from 'react';
import { useContext } from 'react';
import {
  ReportesDispatchContext,
  ReportesStateContext,
} from '../context/ReportesContext';

export interface IErrorMessageProps {}

export const ErrorMessage: React.FunctionComponent<IErrorMessageProps> = (
  props: React.PropsWithChildren<IErrorMessageProps>
) => {
  const state = useContext(ReportesStateContext);
  const dispatch = useContext(ReportesDispatchContext);
  return (
    <>
      {state.error != '' && (
        <MessageBar
          messageBarType={MessageBarType.error}
          className={AnimationClassNames.scaleUpIn100}
          onDismiss={() => dispatch({ type: 'clearError' })}
          dismissButtonAriaLabel='Cerrar'
        >
          Error: {state.error}
        </MessageBar>
      )}
    </>
  );
};
