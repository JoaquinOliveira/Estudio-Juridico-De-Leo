import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTipoResolucion } from './redux/formSlice';
import { ConfigProvider, Layout, theme } from 'antd';
import { Content } from 'antd/es/layout/layout';
import AppLayout from './components/AppLayout';
import FormSelection from './components/FormSelection';
import OSPSA from './components/OSPSA/OSPSA';
import FATSA from './components/FATSA/FATSA';
import ACUERDOS from './components/ACUERDOS/ACUERDOS';
import Login from './components/Login/Login'
import AppFooter from './components/AppFooter';
import DarkLightTheme from './hooks/DarkLightTheme';
import './theme.css';
import './global-autocomplete.css';


const App = () => {
  const dispatch = useDispatch();
  const tipoResolucion = useSelector((state) => state.form.tipoResolucion);
  const [darkMode, toggleDarkMode] = DarkLightTheme()
  const [showResolutionForm, setShowResolutionForm] = useState(false);

  const handleShowResolutionForm = () => {
    setShowResolutionForm(true);
  };

  const handleSelectForm = (formType) => {
    dispatch(setTipoResolucion(formType));
  };

  const handleBack = () => {
    dispatch(setTipoResolucion(''));
  };

  const renderForm = () => {
    switch (tipoResolucion) {
      case 'OSPSA':
        return <OSPSA onBack={handleBack} />;
      case 'FATSA':
        return <FATSA onBack={handleBack} />;
      case 'ACUERDOS':
        return <ACUERDOS onBack={handleBack} />;

      default:
        return <FormSelection onSelectForm={handleSelectForm} darkMode={darkMode} />;
    }
  };

  return (
    <ConfigProvider
      theme={{
        algorithm: darkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
        token: {
          colorPrimary: '#1890ff',
          borderRadius: 8,
          fontFamily: 'Arial, sans-serif',
        },
        components: {
          Button: {
            colorPrimary: '#1890ff',
            algorithm: true, // Enable algorithm
          },
          Card: {
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',

          },
          Form: {
            itemMarginBottom: 24,
          },
          Input: {
            colorBgContainer: darkMode ? '#141414' : '#ffffff',
            colorText: darkMode ? '#ffffff' : '#000000',
            colorBorder: darkMode ? '#434343' : '#d9d9d9',
          },
          Select: {
            colorBgContainer: darkMode ? '#141414' : '#ffffff',
            colorText: darkMode ? '#ffffff' : '#000000',
            colorBorder: darkMode ? '#434343' : '#d9d9d9',
          },
        },
      }}
    >
      <Layout className={darkMode ? 'dark-mode' : 'light-mode'} style={{ minHeight: '100vh' }}>
        <AppLayout darkMode={darkMode} onToggleDarkMode={toggleDarkMode}>
          <Content style={{ padding: '0 50px', }}>
            <div style={{ background: 'var(--background-color)', padding: 24, minHeight: 380 }}>
              {showResolutionForm ? renderForm() :
                <Login darkMode={darkMode} onLogin={handleShowResolutionForm} />}
            </div>
          </Content>
          <AppFooter darkMode={darkMode} />
        </AppLayout>
      </Layout>
    </ConfigProvider >
  );
};

export default App;


