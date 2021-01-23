/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import AppMain from './Appmain';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import Thunk from 'redux-thunk';
import Reducers from './src/reduxReducers';

const App = () => {
  const store = createStore(Reducers, {}, applyMiddleware(Thunk));

  return (
    <>
      <Provider store={store}>
        <AppMain />
      </Provider>
    </>
  );
};

export default App;
