import React from 'react';
import { Provider } from 'react-redux';

import './App.scss';
import configureStore from '../../store';
import { Root } from '../Root';
import logger from '../../libraries/logger';

type IState = {
  hasError: boolean;
}

/**
 * @author Vishal Chavan
 */
export class App extends React.PureComponent<{}, IState> {

  state = { hasError: false };

  render() {
    const store = configureStore();
    return (
      <Provider store={store}>
          <Root />
      </Provider>
    );
  }

  componentDidCatch(error: Error, errorInfo: any) {
    // Display fallback UI
    this.setState({ hasError: true });
    logger.error(error);
    logger.info(errorInfo);
    // You can also log the error to an error reporting service
    // logErrorToMyService(error, info);
  }
}
