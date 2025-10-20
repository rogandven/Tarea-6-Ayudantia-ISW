"use strict";
import dotenv from "dotenv";

dotenv.config();

export const VITE_BASE_URL = process.env.VITE_BASE_URL || "http://localhost:80/api";
export const PORT = process.env.PORT || 443;