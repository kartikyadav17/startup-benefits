import Cookies from 'js-cookie';

export const getToken = (): string | undefined => {
  return Cookies.get('token');
};

export const isAuthenticated = (): boolean => {
  return !!getToken();
};

export const removeToken = (): void => {
  Cookies.remove('token');
};
