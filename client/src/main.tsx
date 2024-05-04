import ReactDOM from 'react-dom/client';

import './index.css';
import { Provider } from 'react-redux';
import { store } from './store';
import { YMaps } from '@pbe/react-yandex-maps';

import App from './App';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <YMaps>
      <Provider store={store}>
        <App />
      </Provider>
    </YMaps>
  </BrowserRouter>,
);
