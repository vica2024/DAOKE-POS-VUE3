const TOKEN_KEY = 'token';
const ROLE_KEY = 'userRole';

const isLogin = () => {
  return !!localStorage.getItem(TOKEN_KEY);
};

const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

const setToken = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
};

const setRole = (role) => {
  localStorage.setItem(ROLE_KEY, role);
};

const clearRole = () => {
  localStorage.removeItem(ROLE_KEY);
};

const clearToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};

export { isLogin, getToken, setToken, clearToken, clearRole, setRole };
