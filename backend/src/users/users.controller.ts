import { NextFunction, Request, Response } from "express";
import { usersService } from "./users.service.js";

const getAllUsers = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const users = await usersService.getAllUsers();

    res.json(users);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return next(error);
    }
  }
};

const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await usersService.getUserById(req.params.userId);

    if (!user) {
      throw new Error("User not found");
    }

    res.json(user);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return next(error);
    }
  }
};

const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const updatedUser = await usersService.updateUser(
      req.params.userId,
      req.body,
    );

    res.json(updatedUser);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return next(error);
    }
  }
};

const signup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newUser = await usersService.signup(
      req.body.username,
      req.body.password,
    );

    res.status(201).json(newUser);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return next(error);
    }
  }
};

const login = async (req: Request, res: Response, next: NextFunction) => {
  //TODO:  Logic to login a user
};

export const usersController = {
  getAllUsers,
  getUserById,
  updateUser,
  signup,
  login,
};
