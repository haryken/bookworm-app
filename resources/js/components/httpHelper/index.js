import axios from "axios";

const endPoint = "http://127.0.0.1:8000/api";

export function get(url){
   return axios.get(endPoint+url);
}