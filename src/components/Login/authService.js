export const login = async (username, password, config) => {
    const { validUsername, validPassword } = config;
  console.log(validUsername)
  console.log(validPassword)
    if (username === validUsername && password === validPassword) {
      return true;
    } else {
      return false;
    }
  };