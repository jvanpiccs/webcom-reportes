import {
  AnimationClassNames,
  ComboBox,
  CommandBar,
  IComboBoxOption,
  ICommandBarItemProps,
  SearchBox,
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

  let commandBarItems: ICommandBarItemProps[] = [
    {
      key: 'type',
      text: 'Tipo de reporte',
      onRender: () =>
        types != undefined && (
          <ComboBox
            placeholder='Elección de reporte'
            options={types}
            onChange={(ev, option) => {
              dispatch({ type: 'setType', payload: option });
            }}
            autoComplete='on'
            allowFreeform={true}
            className={AnimationClassNames.fadeIn100}
          />
        ),
    },
    {
      key: 'search',
      onRender: () => (
        <>
          <div style={{ minWidth: 10 }}></div>
          <SearchBox
            className={AnimationClassNames.fadeIn100}
            disabled={!hasResults}
            placeholder='Buscar'
            onChange={(ev, newValue) => {
              if (newValue.trim() != '' || newValue != undefined) {
                dispatch({
                  type: 'setQuery',
                  payload: newValue.trim().toLowerCase(),
                });
              }
            }}
          />
        </>
      ),
    },
  ];

  return (
    <>
      <CommandBar
        items={commandBarItems}
        className={AnimationClassNames.fadeIn100}
      />
    </>
  );
};
