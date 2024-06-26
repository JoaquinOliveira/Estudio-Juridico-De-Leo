import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from '../src/redux/store';
import Modal from 'react-modal';
import { ConfigProvider } from 'antd';
import es_ES from 'antd/lib/locale/es_ES';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import localeData from 'dayjs/plugin/localeData';
import weekday from 'dayjs/plugin/weekday';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import weekYear from 'dayjs/plugin/weekYear';
import 'dayjs/locale/es';


// Configurar dayjs
dayjs.extend(customParseFormat);
dayjs.extend(localeData);
dayjs.extend(weekday);
dayjs.extend(weekOfYear);
dayjs.extend(weekYear);
dayjs.locale('es');

const dayjsGenerateConfig = {
  // Implementa estas funciones según sea necesario
  getPrefixCls: (suffixCls, customizePrefixCls) => {
    if (customizePrefixCls) return customizePrefixCls;
    return `ant-${suffixCls}`;
  },
  getTheme: () => ({}),
  generateConfig: {
    // Implementa las funciones necesarias aquí
    // Por ejemplo:
    getNow: () => dayjs(),
    getFixedDate: (string) => dayjs(string, 'YYYY-MM-DD'),
    getEndDate: (date) => date.endOf('month'),
    getWeekDay: (date) => date.day(),
    getYear: (date) => date.year(),
    getMonth: (date) => date.month(),
    getDate: (date) => date.date(),
    getHour: (date) => date.hour(),
    getMinute: (date) => date.minute(),
    getSecond: (date) => date.second(),
    // ... otras funciones necesarias
  },
};

const root = ReactDOM.createRoot(document.getElementById('root'));
Modal.setAppElement('#root');
root.render(
  <Provider store={store}>
    <ConfigProvider locale={es_ES} {...dayjsGenerateConfig}>
      <App />
    </ConfigProvider>
  </Provider>
);

reportWebVitals();