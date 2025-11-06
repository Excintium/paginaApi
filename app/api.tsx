// app/api.ts
import axios from "axios";

// La URL base de tu API NestJS
const API_URL = "http://localhost:3000/api/v1";

export const api = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});