import React from "react";
import { Provider } from 'mobx-react'
import MainScreen from './Main'
import MainStore from './Store'

const stores = {
  mainStore: MainStore
}


const App: React.FC = () => {
  return (
    <Provider {...stores}>
      <MainScreen />
    </Provider>
  );
};

export default App;
