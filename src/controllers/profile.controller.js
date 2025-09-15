import { handleErrorClient, handleSuccess } from "../Handlers/responseHandlers.js";
import { getUserFromToken } from "../middleware/auth.middleware.js";
import { editUser, deleteUser } from "../services/user.service.js";

export function getPublicProfile(req, res) {
  handleSuccess(res, 200, "Perfil público obtenido exitosamente", {
    message: "¡Hola! Este es un perfil público. Cualquiera puede verlo.",
  });
}

export function getPrivateProfile(req, res) {
  const user = req.user;

  handleSuccess(res, 200, "Perfil privado obtenido exitosamente", {
    message: `¡Hola, ${user.email}! Este es tu perfil privado. Solo tú puedes verlo.`,
    userData: user,
  });
}

export async function editPrivateProfile(req, res) {
  const user = getUserFromToken(req, res);
  const oldData = {
    id: user.id,
    email: user.email
  }
  if (!oldData.id || !oldData.email) {
    return handleErrorClient(res, 401, "Datos de usuario no proporcionados.");
  }
  const newData = {
    email: req.body.email,
    password: req.body.password
  }  
  if (newData.email === undefined && newData.password === undefined) {
    return handleSuccess(res, 200, "No hay nada que actualizar.");
  }
  if ((newData.email === oldData.email) && newData.password === undefined) {
    return handleSuccess(res, 200, "No hay nada que actualizar.");
  }  
  if (oldData.email === newData.email) {
    delete newData.email;
  }

  try {
    await editUser(oldData, newData);
    const responseData = {
      email: newData.email
    };
    handleSuccess(res, 200, "Perfil actualizado con éxito", responseData);
  } catch (error) {
    const errorMessage = (error.message || "Error desconocido");
    handleErrorClient(res, 400, errorMessage);
    return;
  } 
}

export async function deletePrivateProfile(req, res) {
  const user = getUserFromToken(req, res);
  const oldData = {
    id: user.id,
    email: user.email
  }
  if (!oldData.id || !oldData.email) {
    return handleErrorClient(res, 401, "Datos de usuario no proporcionados.");
  }
  try {
    await deleteUser(oldData);
    handleSuccess(res, 200, "Perfil eliminado con éxito");
  } catch (error) {
    const errorMessage = (error.message || "Error desconocido");
    handleErrorClient(res, 400, errorMessage);
    return;
  } 
}