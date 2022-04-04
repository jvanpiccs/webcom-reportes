import {
  AnimationClassNames,
  ComboBox,
  SearchBox,
  Stack,
} from '@fluentui/react';
import * as React from 'react';
import { useContext, useEffect } from 'react';
import {
  ReportesDispatchContext,
  ReportesStateContext,
} from '../context/ReportesContext';

export interface IFiltrosProps {}

export const Filtros: React.FunctionComponent<IFiltrosProps> = (
  props: React.PropsWithChildren<IFiltrosProps>
) => {
  let state = useContext(ReportesStateContext);
  let dispatch = useContext(ReportesDispatchContext);

  function _onChangeCombo(option) {
    if (option != undefined) {
      dispatch({ type: 'setType', payload: option });
    }
  }

  function _onChangeSearch(newValue) {
    if (newValue.trim() != ('' || undefined)) {
      dispatch({
        type: 'setQuery',
        payload: newValue.trim().toLowerCase(),
      });
    }
  }

  return (
    <>
      {state.error == '' &&
        !state.isLoading &&
        state.user != undefined &&
        state.files != [] && (
          <Stack
            horizontal
            tokens={{ childrenGap: 10 }}
            wrap
            verticalAlign='center'
          >
            <ComboBox
              placeholder='Seleccionar Reporte'
              options={state.types}
              onChange={(ev, option) => _onChangeCombo(option)}
              autoComplete='on'
              allowFreeform={true}
              className={AnimationClassNames.fadeIn100}
            />
            <SearchBox
              className={AnimationClassNames.fadeIn100}
              placeholder='Filtrar resultados'
              onChange={(ev, newValue) => _onChangeSearch(newValue)}
            />
          </Stack>
        )}
    </>
  );
};
