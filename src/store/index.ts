import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootReducer from '../features/root.reducer';
import rootSaga from '../features/root.saga';
import axios from 'axios';

const sagaMonitor = require('@redux-saga/simple-saga-monitor');

// rehydrate state on app start
const initialState = {} //loadState();

const setInterceptor = (store: any) => {
    axios.interceptors.request.use((config) => {
        if (process.env.NODE_ENV === 'development') {
            const { authState } = store.getState();
            const token = authState.auth.token;
            config.headers.Authorization = token;
        }
        return config;
    });
}

// create store
const configureStore = () => {
    const middlewares: any = [];
    const sagaMiddleware = createSagaMiddleware({ sagaMonitor });
    middlewares.push(sagaMiddleware);
    if (process.env.NODE_ENV === 'development') {
        const { logger } = require('redux-logger');
        middlewares.push(logger);
    }

    const store = createStore(rootReducer(), initialState, applyMiddleware(...middlewares));
    sagaMiddleware.run(rootSaga);
    setInterceptor(store);
   
    return store;
}

export default configureStore;