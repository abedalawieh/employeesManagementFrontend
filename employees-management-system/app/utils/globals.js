import axios from "axios";
global._sys = {
  backend: {
    url: "http://localhost:4000",
  },
  axios: axios,
};
export default _sys;
