import jwt from "jsonwebtoken";
import { handleErrorClient, handleErrorServer } from "../Handlers/responseHandlers.js";

export function authMiddleware(req, res, next) {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return handleErrorClient(res, 401, "Acceso denegado. No se proporcionó token.");
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return handleErrorClient(res, 401, "Acceso denegado. Token malformado.");
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload;
    next();
  } catch (error) {
    return handleErrorClient(res, 401, "Token inválido o expirado.", error.message);
  }
}

// Si bien esto no es recomendable, tengo que cumplir con el enunciado. La función authMiddleware ya hace esto.
export function getUserFromToken(req, res) {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return handleErrorClient(res, 401, "Token no proporcionado.");    
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return handleErrorClient(res, 401, "Token inválido.");
  }
  
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    if (!payload) {
      return handleErrorServer(res, 404, "Usuario no encontrado.");
    }
    const user = { id: payload.sub, email: payload.email };
    if (!user.id || !user.email) {
      return handleErrorServer(res, 500, "Base de datos corrupta.");
    }
    return user;
  } catch (error) {
    return handleErrorClient(res, 401, "Token inválido o expirado.", error.message);
  }
}