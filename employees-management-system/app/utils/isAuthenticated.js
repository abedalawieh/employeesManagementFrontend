const isAuthenticated = () => {
  return Boolean(sessionStorage.getItem("token"));
};

export { isAuthenticated };
