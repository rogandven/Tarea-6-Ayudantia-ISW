import { loginUser } from "../services/auth.service.js";
import { createUser } from "../services/user.service.js";
import { handleSuccess, handleErrorClient, handleErrorServer } from "../Handlers/responseHandlers.js";
import { usuarioDataBodyValidation, usuarioIntegrityValidation } from "../validations/usuario.validation.js";
export async function login(req, res) {
  try {
    var result = usuarioDataBodyValidation.validate(req.body);
    if (result.error) {
      return handleErrorClient(res, 400, result.error.message);
    }
    result = usuarioIntegrityValidation.validate(req.body);
    if (result.error) {
      return handleErrorClient(res, 400, result.error.message);
    }
    
    const data = await loginUser(req.body.email, req.body.password);
    handleSuccess(res, 200, "Login exitoso", data);
  } catch (error) {
    handleErrorClient(res, 401, error.message);
  }
}

export async function register(req, res) {
  try {
    var result = usuarioDataBodyValidation.validate(req.body);
    if (result.error) {
      return handleErrorClient(res, 400, result.error.message);
    }
    result = usuarioIntegrityValidation.validate(req.body);
    if (result.error) {
      return handleErrorClient(res, 400, result.error.message);
    }
    
    const newUser = await createUser(req.body);
    delete newUser.password; // Nunca devolver la contraseña
    handleSuccess(res, 201, "Usuario registrado exitosamente", newUser);
  } catch (error) {
    if (error.code === '23505') { // Código de error de PostgreSQL para violación de unique constraint
      handleErrorClient(res, 409, "El email ya está registrado");
    } else {
      console.log(error);
      handleErrorServer(res, 500, "Error interno del servidor", error.message);
    }
  }
}
