// App.js
import React, { useState } from 'react';
import ResolutionForm from './components/Form/ResolutionForm';
import Login from './components/Login/Login';
import './App.css';
import logo from './utils/logo/logo.png';
import { Switch } from 'antd';
import { FaSun, FaMoon } from 'react-icons/fa';
import useTheme from './utils/useTheme';

const App = () => {
  const [showResolutionForm, setShowResolutionForm] = useState(false);
  const { isDarkMode, handleThemeChange } = useTheme();

  const handleShowResolutionForm = () => {
    setShowResolutionForm(true);
  };

  return (
    <div className={`general ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      {showResolutionForm ? (
        <>
          <div className={`header-container ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
            <img src={''} alt='Estudio Jurídico De Leo' className="header-logo" />
            <h1 className={`app-header header-text ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
              Estudio Jurídico De Leo
            </h1>
          </div>
          <div className="switch-container">
            <Switch
              checked={isDarkMode}
              onChange={handleThemeChange}
              checkedChildren={<FaMoon className="switch-icon" />}
              unCheckedChildren={<FaSun className="switch-icon" />}
              className="custom-switch"
            />
          </div>
          <h2 className={`description header-text ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
            Elija el tipo de demanda
          </h2>
          <ResolutionForm />
        </>
      ) : (
        <Login onLogin={handleShowResolutionForm} />
      )}
    </div>
  );
};

export default App;