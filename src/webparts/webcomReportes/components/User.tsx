import {
  AnimationClassNames,
  Persona,
  PersonaPresence,
  PersonaSize,
} from '@fluentui/react';
import * as React from 'react';
import { useContext, useEffect } from 'react';
import {
  ReportesDispatchContext,
  ReportesStateContext,
} from '../context/ReportesContext';
import { getUser } from '../services/getUser';

export interface IUserProps {}

export const User: React.FunctionComponent<IUserProps> = (
  props: React.PropsWithChildren<IUserProps>
) => {
  const dispatch = useContext(ReportesDispatchContext);
  const state = useContext(ReportesStateContext);

  useEffect(() => {
    async function fetchData() {
      dispatch({ type: 'userLoading' });
      try {
        let data = await getUser(state.context, dispatch);
        dispatch({ type: 'setUser', payload: data['User'] });
      } catch (error) {
        console.log(error);
      }
    }
    if (state.context != undefined) {
      fetchData();
    }
  }, [state.context]);

  let secondaryText = `Entidades: ${state.user?.Entidades?.map(
    (e) => e.Value.split('.')[0]
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
