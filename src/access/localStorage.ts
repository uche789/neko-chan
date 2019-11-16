const browserLocalStorage = (() => {
  const set = (key: string, value: any) : boolean => {
    try {
      window.localStorage.setItem(key, btoa(value));
      return true;
    } catch (e) {
      return false;
    }
  };

  const get = (key: string) : any => {
    try {
      const value = window.localStorage.getItem(key) as string;
      return atob(value);
    } catch (e) {
      return null;
    }
  };

  const remove = (key: string) => {
    try {
      window.localStorage.removeItem(key);
      return true;
    } catch (e) {
      return false;
    }
  };

  return {
    set,
    get,
    remove,
  };
})();

export default browserLocalStorage;
