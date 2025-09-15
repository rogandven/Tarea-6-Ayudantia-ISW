import { AppDataSource } from "../config/configDB.js";
import { User } from "../entities/user.entity.js";
import bcrypt from "bcrypt";

const userRepository = AppDataSource.getRepository(User);

export async function createUser(data) {
  const hashedPassword = await bcrypt.hash(data.password, 10);

  const newUser = userRepository.create({
    email: data.email,
    password: hashedPassword,
  });

  return await userRepository.save(newUser);
}

export async function editUser(oldData, newData) {
  const user = await findUserById(oldData.id);
  if (!user) {
    throw new Error("Usuario no encontrado.");
  }
  if (!user.id || !user.email || !user.password) {
    throw new Error("Usuario no encontrado.");
  }
  delete user.password;
  if (newData.password !== undefined) {
    user.password = await bcrypt.hash(newData.password, 10);
    delete newData.password;
  }
  if (newData.email !== undefined) {
    const emailExists = await findUserByEmail(newData.email);
    if (emailExists && true) {
      throw new Error("El correo ya está registrado en la base de datos.")
    }
    user.email = newData.email;
  }
  try {
    return await userRepository.save(user);
  } catch (error) {
    throw new Error("No se pudieron guardar los datos.");
  }
}

export async function deleteUser(oldData) {
  const user = await findUserById(oldData.id);
  if (!user) {
    throw new Error("Usuario no encontrado.");
  }
  if (!user.id || !user.email || !user.password) {
    throw new Error("Usuario no encontrado.");
  } 
  delete user.password;
  try {
    return await userRepository.delete({id: user.id});
  } catch (error) {
    console.log(error);
    throw new Error("No se pudo eliminar el usuario.");
  }
}

export async function findUserById(id) {
  if (!id) {
    return undefined;
  }

  return await userRepository.findOneBy({ id });
}

export async function findUserByEmail(email) {
  if (!email) {
    return undefined;
  }

  return await userRepository.findOneBy({ email });
}
