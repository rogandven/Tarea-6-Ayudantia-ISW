import { handleErrorClient } from "../Handlers/responseHandlers.js";

export function validateRequest(body, res) {
    if (body === null) {
        return handleErrorClient(res, 400, "Los datos son nulos");
    }
    if (body === undefined) {
        return handleErrorClient(res, 400, "Datos no proporcionados");
    }
    if (!body) {
        return handleErrorClient(res, 400, "Error al procesar los datos");
    }
    return null;
}