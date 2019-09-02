// @flow

import { compose, applyMiddleware, combineReducers, createStore } from 'redux'
import { offline } from '@redux-offline/redux-offline';
import offlineConfig from '@redux-offline/redux-offline/lib/defaults';

import count from './count'

let inFlight = 0;

const store = createStore(
    combineReducers({
        count
    }),
    undefined,
    compose(
      offline({
        ...offlineConfig,
        queue: {
          ...offlineConfig.queue,
          peek: (pendingRequestActions, action, context) => {
            console.log('in peek, action:', action, 'returning:', pendingRequestActions[0]);
            // if (inFlight === 0 && pendingRequestActions.length) {
            //   inFlight++;
            //   console.log('inFlight is 0 so process the first request, incremented to:', inFlight);
            //   return pendingRequestActions[0];
            // } else {
            //   console.log('another request is in flight, do not peek yet');
            // }
            return pendingRequestActions[0];
          },
          dequeue: (pendingRequestActions, action, context) => {
            console.log('in dequeue, action:', action, 'action.meta.offlineAction:', action.meta.offlineAction);
            if (action.type.endsWith('ROLLBACK')) {
              // do not dequeue until success
              return pendingRequestActions;
            } else {
              const [, ...rest] = pendingRequestActions;
              // inFlight--;
              return rest;
            }
          }
        }
      }),
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(
        //   applyMiddleware(middleware),
      ),
    )
  );

// store.subscribe(function() {
//     console.log('store updated:', store.getState());
// })

export default store
