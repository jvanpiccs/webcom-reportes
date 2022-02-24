import {
  AnimationClassNames,
  ComboBox,
  CommandBar,
  IComboBoxOption,
  ICommandBarItemProps,
  SearchBox,
  Stack,
} from '@fluentui/react';
import * as React from 'react';

export interface IFiltrosProps {
  dispatch: any;
  types: IComboBoxOption[];
  hasResults: boolean;
}

export const Filtros: React.FunctionComponent<IFiltrosProps> = (
  props: React.PropsWithChildren<IFiltrosProps>
) => {
  let { dispatch, types, hasResults } = props;

  return (
    <Stack horizontal tokens={{ childrenGap: 10 }} wrap verticalAlign='center'>
      <ComboBox
        placeholder='Elección de reporte'
        options={types}
        onChange={(ev, option) => {
          option != undefined && dispatch({ type: 'setType', payload: option });
        }}
        autoComplete='on'
        allowFreeform={true}
        className={AnimationClassNames.fadeIn100}
      />
      <SearchBox
        className={AnimationClassNames.fadeIn100}
        placeholder='Filtrar resultados'
        onChange={(ev, newValue) => {
          if (newValue.trim() != '' || newValue != undefined) {
            dispatch({
              type: 'setQuery',
              payload: newValue.trim().toLowerCase(),
            });
          }
        }}
      />
    </Stack>
  );
};
