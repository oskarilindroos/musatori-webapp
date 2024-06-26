import { db } from "../db/db.js";
import { NewUser, UpdatedUser } from "../types/users.type.js";

const createUser = async (newUser: NewUser) => {
  return await db
    .insertInto("users")
    .values(newUser)
    .returning(["id", "username", "admin", "created_at"])
    .executeTakeFirstOrThrow();
};

const deleteUser = async (userId: string) => {
  return await db.deleteFrom("users").where("id", "=", userId).execute();
};

const updateUser = async (userId: string, updatedUser: UpdatedUser) => {
  return await db
    .updateTable("users")
    .set(updatedUser)
    .where("id", "=", userId)
    .returning(["id", "username", "admin", "created_at"])
    .executeTakeFirstOrThrow();
};

const getAllUsers = async () => {
  return await db
    .selectFrom("users")
    .select(["id", "email", "username", "admin", "created_at"])
    .execute();
};

const getUserById = async (userId: string) => {
  return await db
    .selectFrom("users")
    .where("id", "=", userId)
    .select(["id", "email", "username", "admin", "created_at"])
    .executeTakeFirst();
};

const getUserByUsername = async (username: string) => {
  return await db
    .selectFrom("users")
    .where("username", "=", username)
    .select(["id", "email", "username", "admin", "password", "created_at"])
    .executeTakeFirst();
};

const getUserListings = async (userId: string) => {
  return await db
    .selectFrom("listings")
    .where("user_id", "=", userId)
    .selectAll()
    .execute();
};

export const usersRepository = {
  createUser,
  deleteUser,
  updateUser,
  getAllUsers,
  getUserByUsername,
  getUserById,
  getUserListings,
};
