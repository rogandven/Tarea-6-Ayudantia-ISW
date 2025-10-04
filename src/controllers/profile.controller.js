import { handleErrorClient, handleSuccess } from "../Handlers/responseHandlers.js";
import { getToken, getUserFromToken } from "../middleware/auth.middleware.js";
import { blackListToken } from "../services/auth.service.js";
import { editUser, deleteUser } from "../services/user.service.js";
import { usuarioPrivateProfileQueryValidation, usuarioIntegrityValidation, usuarioOldDataQueryValidation, usuarioDataBodyValidation } from "../validations/usuario.validation.js";

export function getPublicProfile(req, res) {
  handleSuccess(res, 200, "Perfil público obtenido exitosamente", {
    message: "¡Hola! Este es un perfil público. Cualquiera puede verlo.",
  });
}

export function getPrivateProfile(req, res) {
  const user = req.user;
  var result = usuarioPrivateProfileQueryValidation.validate(req.user);
  if (result.error) {
    return handleErrorClient(res, 400, result.error.message);
  }
  result = usuarioIntegrityValidation.validate(req.user);
  if (result.error) {
    return handleErrorClient(res, 400, result.error.message);
  }

  handleSuccess(res, 200, "Perfil privado obtenido exitosamente", {
    message: `¡Hola, ${user.email}! Este es tu perfil privado. Solo tú puedes verlo.`,
    userData: user,
  });
}

export async function editPrivateProfile(req, res) {
  const oldData = getUserFromToken(req, res);
  var result = usuarioOldDataQueryValidation.validate(oldData);
  if (result.error) {
    return handleErrorClient(res, 400, result.error.message);
  } 
  result = usuarioIntegrityValidation.validate(oldData);
  if (result.error) {
    return handleErrorClient(res, 400, result.error.message);
  } 

  const newData = req.body;
  result = usuarioDataBodyValidation.validate(newData);
  if (result.error) {
    return handleErrorClient(res, 400, result.error.message);
  } 
  result = usuarioIntegrityValidation.validate(newData);
  if (result.error) {
    return handleErrorClient(res, 400, result.error.message);
  } 

  if (oldData.email === newData.email) {
    delete newData.email;
  }
  if (newData.email === undefined && newData.password === undefined) {
    return handleSuccess(res, 204, "No hay nada que actualizar.");
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
  const oldData = getUserFromToken(req, res);

  var result = usuarioOldDataQueryValidation.validate(oldData);
  if (result.error) {
    return handleErrorClient(res, 400, result.error.message);
  } 
  result = usuarioIntegrityValidation.validate(oldData);
  if (result.error) {
    return handleErrorClient(res, 400, result.error.message);
  } 

  try {
    await deleteUser(oldData);
    await blackListToken(getToken(req));    
    handleSuccess(res, 200, "Perfil eliminado con éxito");
    return;
  } catch (error) {
    const errorMessage = (error.message || "Error desconocido");
    handleErrorClient(res, 400, errorMessage);
    return;
  } 
}