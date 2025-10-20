"use strict";
import { fileURLToPath } from "url";
import path from "path";
import dotenv from "dotenv";

//Conseguir la ruta del archivo
const _filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(_filename);
const envFilePath = path.resolve(_dirname, ".env");

dotenv.config({ path: envFilePath });

export const VITE_BASE_URL = process.env.VITE_BASE_URL || "http://localhost:80/api";
export const PORT = process.env.PORT || 443;