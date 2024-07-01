export const login = async (username, password, config) => {
    const { validUsername, validPassword } = config;
  
    if (username === validUsername && password === validPassword) {
      return true;
    } else {
      return false;
    }
  };