"use strict";
import { fileURLToPath } from "url";
import path from "path";
import { loadEnv } from 'vite';



export const HOST = process.env.DB_HOST || process.env.HOST || "localhost";
export const PORT = process.env.PORT || 3000;
export const DB_PORT = process.env.DB_PORT || 5432;
export const DB_USERNAME = process.env.DB_USERNAME;
export const DB_PASSWORD = process.env.DB_PASSWORD;
export const DATABASE = process.env.DATABASE;
export const JWT_SECRET = process.env.JWT_SECRET;
export const cookieKey = process.env.COOKIE_KEY;