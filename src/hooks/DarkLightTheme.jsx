import { useState, useEffect } from 'react';

const DarkLightTheme = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setDarkMode(savedTheme === 'dark');
    }
    document.body.classList.toggle('dark-mode', darkMode);
  }, [darkMode]);

  const toggleDarkMode = (checked) => {
    setDarkMode(checked);
    localStorage.setItem('theme', checked ? 'dark' : 'light');
  };

  return [darkMode, toggleDarkMode];
};

export default DarkLightTheme;