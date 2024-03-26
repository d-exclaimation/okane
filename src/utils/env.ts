import { z } from "zod";

const rawApiURl = import.meta.env.VITE_API_URL;

export const apiUrl = z
  .string()
  .catch("http://localhost:8000")
  .parse(rawApiURl);
