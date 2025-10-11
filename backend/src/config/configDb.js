"use strict";
import { DataSource } from "typeorm";
import { DATABASE, DB_USERNAME, HOST, DB_PASSWORD, DB_PORT } from "./configEnv.js";
import { User } from "../entities/user.entity.js";
import { TokenBlackList } from "../entities/token.blacklist.entity.js";

// console.log("DATABASE: " + DATABASE);
// console.log("DB_USERNAME: " + DB_USERNAME);
// console.log("HOST: " + HOST);
// console.log("DB_PASSWORD: " + DB_PASSWORD);
// console.log("DB_PORT: " + DB_PORT);


export const AppDataSource = new DataSource({
  type: "postgres",
  host: `${HOST}`,
  port: `${DB_PORT}`,
  username: `${DB_USERNAME}`,
  password: `${DB_PASSWORD}`,
  database: `${DATABASE}`,
  entities: {User, TokenBlackList},
  synchronize: true, 
  logging: false,
});

export async function connectDB() {
  try {
    await AppDataSource.initialize();
    console.log("=> Conexión exitosa a la base de datos PostgreSQL!");
  } catch (error) {
    console.error("Error al conectar con la base de datos:", error);
    process.exit(1);
  }
}