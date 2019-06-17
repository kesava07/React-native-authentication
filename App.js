import React, { Component } from 'react';
import { Provider } from 'react-redux';
import configureStore from './Store/ConfigureStore';
import DraweNavigator from './Navigation/DrawerNavigator';


const store = configureStore();

export class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <DraweNavigator />
      </Provider>
    )
  }
}

export default App;
