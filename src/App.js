import React from 'react';

import { Provider, useDispatch, useSelector } from 'react-redux'

import store from "./store";
import { up, dn } from './store/count';

import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <AppBody />
    </Provider>
  );
}

function AppBody() {

  const dispatch = useDispatch();
  const count = useSelector(storeState => storeState.count);

  return (
    <div className="App">
      <header className="App-header">

        <img src={logo} className="App-logo" alt="logo" />

        <p>
          Count: <code>{count}</code>
        </p>

        <a
          className="App-link"
          href="#"
          onClick={e => {
            e.preventDefault();
            dispatch(up());
          }}
        >
          Up
        </a>

        <a
          className="App-link"
          href="#"
          onClick={e => {
            e.preventDefault();
            dispatch(dn());
          }}
        >
          Down
        </a>

        <a
          className="App-link"
          href="#"
          onClick={e => {
            e.preventDefault();
            let userId = count;
            dispatch({
              type: 'FOLLOW_USER_REQUEST',
              payload: { userId },
              meta: {
                offline: {
                  // the network action to execute:
                  effect: { url: 'http://localhost:1337/api/follow', method: 'POST', json: { userId } },
                  // action to dispatch when effect succeeds:
                  commit: { type: 'FOLLOW_USER_COMMIT', meta: { userId } },
                  // action to dispatch if network action fails permanently:
                  rollback: { type: 'FOLLOW_USER_ROLLBACK', meta: { userId } }
                }
              }
            });
            dispatch(up());

            userId++;
            dispatch({
              type: 'FOLLOW_USER_REQUEST',
              payload: { userId },
              meta: {
                offline: {
                  // the network action to execute:
                  effect: { url: 'http://localhost:1337/api/follow', method: 'POST', json: { userId } },
                  // action to dispatch when effect succeeds:
                  commit: { type: 'FOLLOW_USER_COMMIT', meta: { userId } },
                  // action to dispatch if network action fails permanently:
                  rollback: { type: 'FOLLOW_USER_ROLLBACK', meta: { userId } }
                }
              }
            });
            dispatch(up());
          }}
        >
          Follow User
        </a>

      </header>
    </div>
  );
}

export default App;
