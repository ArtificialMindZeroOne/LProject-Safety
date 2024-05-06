import ReactDOM from 'react-dom/client';
import App from './components/app/App.tsx';
import './index.css';
import store from './store/store.tsx';
import { Provider } from 'react-redux';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <App />
  </Provider>
);
