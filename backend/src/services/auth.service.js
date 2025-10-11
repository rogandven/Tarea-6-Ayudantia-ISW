import { AppDataSource } from "../config/configDb.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { findUserByEmail } from "./user.service.js";
import { TokenBlackList } from "../entities/token.blacklist.entity.js";

const tokenBlackListRepository = AppDataSource.getRepository(TokenBlackList);

export async function loginUser(email, password) {
  const user = await findUserByEmail(email);
  if (!user) {
    throw new Error("Credenciales incorrectas");
  }

  const isMatch = bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Credenciales incorrectas");
  }

  const payload = { sub: user.id, email: user.email, password: user.password };
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });

  delete user.password;
  return { user, token };
}

export async function isTokenBlacklisted(token) {
  if (!token) {
    return true;
  }
  if (typeof token !== "string") {
    return true;
  }
  return await tokenBlackListRepository.findOneBy({ token: token });
}

export async function blackListToken(token) {
  if (!token || (typeof(token) !== "string")) {
    return;
  }
  try {
    return await tokenBlackListRepository.save({token: token});
  } catch (error) {
    console.log(error);
    return;
  }
}
