import axios from "axios";

const instance = axios.create({
  baseURL: "https://dipadana.my.id"
});

// baseURL: "localhost:3000"
// baseURL: "https://dipadana.my.id";

export default instance;
