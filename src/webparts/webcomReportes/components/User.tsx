import {
  AnimationClassNames,
  Persona,
  PersonaPresence,
  PersonaSize,
} from '@fluentui/react';
import * as React from 'react';
import { useContext } from 'react';
import { ReportesStateContext } from '../context/ReportesContext';

export interface IUserProps {}

export const User: React.FunctionComponent<IUserProps> = (
  props: React.PropsWithChildren<IUserProps>
) => {
  const state = useContext(ReportesStateContext);

  let secondaryText = `Entidades: ${state.user?.Entidades?.map(
    (e) => e.Entidad
  ).join(', ')}`;

  return (
    <>
      {!state.isLoading && state.user != undefined && (
        <Persona
          aria-describedby='tooltipPersona'
          text={state.user?.Email}
          showSecondaryText
          secondaryText={secondaryText}
          size={PersonaSize.size24}
          presence={PersonaPresence.none}
          className={AnimationClassNames.fadeIn100}
        />
      )}
    </>
  );
};
