import { jwtDecode } from "jwt-decode";


export const token = localStorage.getItem("token") && localStorage.getItem("token")

export const decoded = token && jwtDecode(token);
