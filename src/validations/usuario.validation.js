"use strict";
import Joi from "joi";

export const validateTimeStamp = (value, helper) => {
    const result = Date.parse(value, "yyyy/MM/dd HH:mm:ss");
    if (result === null || !result) {
        return helper.message("La fecha no es válida");
    }
    return true;
}

export const usuarioExistingFieldsValidation = Joi.object({
    id: Joi.number().integer().positive().messages({
        "number.base": "El ID debe ser un número",
        "number.integer": "El ID debe ser un entero",
        "number.positive": "El ID debe ser positivo"
    }),
    email: Joi.string().email().min(10).max(999).messages({
        "string.base":"El correo debe ser una cadena de caracteres",
        "string.email": "El correo debe estar en un formato válido AAAAAAAAAA",
        "any.email": "El correo debe estar en un formato válido BBBBBBBB",
        "email.base": "El correo debe estar en un formato válido CCCCCCCCCCC",
        "string.min": "El correo debe tener por lo menos 10 caracteres",
        "string.max":  "El correo debe tener menos de 1000 caracteres"
    }),
    password: Joi.string().min(10).max(999).messages({
        "string.base":"La contraseña debe ser una cadena de caracteres",
        "string.min": "La contraseña debe tener por lo menos 10 caracteres",
        "string.max": "La contraseña debe tener menos de 1000 caracteres"
    }),
    created_at: Joi.string().custom(validateTimeStamp).messages({
        "string.base": "La fecha debe ser una cadena de caracteres"
    }),
    updated_at: Joi.string().custom(validateTimeStamp).messages({
        "string.base": "La fecha debe ser una cadena de caracteres"
    }) 
}).unknown(false).messages({
    "object.unknown": "No se permiten campos adicionales"
});

export const usuarioGetPrivateProfileValidation = Joi.object({
    
});
