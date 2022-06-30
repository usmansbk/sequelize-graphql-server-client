import axios from "axios";
import env from "./env";

const instance = axios.create({
  baseURL: env.V1_ENDPOINT,
});

export default instance;
