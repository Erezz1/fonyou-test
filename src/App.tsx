import { Provider } from 'react-redux';

import Router from './router/Router';
import { store } from './app/store';

import 'animate.css';

const App = () => {
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
}

export default App;
