import { useState } from 'react';
import cookie from 'js-cookie';

export const useCookie = (cookieName) => {
  const [value, setValue] = useState(cookie.get(cookieName));

  const setCookie = (newValue, options = {}) => {
    setValue(newValue);
    cookie.set(cookieName, newValue, options);
  };

  const removeCookie = () => {
    setValue(null);
    cookie.remove(cookieName);
  };

  return { value, setCookie, removeCookie };
};
