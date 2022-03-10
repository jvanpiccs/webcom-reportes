import { AnimationClassNames, ProgressIndicator } from '@fluentui/react';
import * as React from 'react';
import { useContext } from 'react';
import { ReportesStateContext } from '../context/ReportesContext';

export interface ILoadingBarProps {}

export const LoadingBar: React.FunctionComponent<ILoadingBarProps> = (
  props: React.PropsWithChildren<ILoadingBarProps>
) => {
  const state = useContext(ReportesStateContext);
  return (
    <>
      {state.isLoading && (
        <ProgressIndicator
          className={AnimationClassNames.fadeIn100}
          barHeight={1}
          description={state.loadingMsg}
        />
      )}
    </>
  );
};
