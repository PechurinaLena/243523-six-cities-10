import {FC, ReactNode, useLayoutEffect, useState} from 'react';
import {Router} from 'react-router-dom';
import type {BrowserHistory} from 'history';

export interface HistoryRouterProps {
  history: BrowserHistory
  basename?: string
  children?: ReactNode
}

export const HistoryRouter: FC<HistoryRouterProps> = ({history, children, basename}) => {
  const [state, setState] = useState({
    action: history.action,
    location: history.location,
  });

  useLayoutEffect(() => history.listen(setState), [history]);

  return (
    <Router
      basename={basename}
      location={state.location}
      navigationType={state.action}
      navigator={history}
    >
      {children}
    </Router>
  );
};

export default HistoryRouter;
