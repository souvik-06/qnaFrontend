import axios from "axios";
import { API_URL } from "../services/API_URL";

export default axios.create({
  baseURL: API_URL,
});
