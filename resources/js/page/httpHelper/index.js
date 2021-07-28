import axios from "axios";

const endPoint = "/api";

export function get(url){
   return axios.get(endPoint+url);
}