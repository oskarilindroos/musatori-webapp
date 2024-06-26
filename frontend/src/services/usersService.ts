import axios from "axios";
import { AuthUser, User } from "../types/users";
import { Listing } from "../types/listings";

const signUp = async (
  email: string,
  username: string,
  password: string,
): Promise<string | User> => {
  try {
    const response = await axios.post("/api/users/signup", {
      email,
      username,
      password,
    });

    const createdUser: User = response.data;

    return createdUser;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data.message;
    } else {
      return "Failed to sign up.";
    }
  }
};

const login = async (
  username: string,
  password: string,
): Promise<AuthUser | string> => {
  try {
    const response = await axios.post("/api/users/login", {
      username,
      password,
    });

    const { user, token } = response.data;

    // Create an AuthUser object from the response
    const authUser: AuthUser = {
      isLoggedIn: true,
      isAdmin: Boolean(user.admin),
      email: user.email,
      userId: user.id,
      userName: user.username,
      token: token,
    };

    return authUser;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data.message;
    } else {
      return "Failed to sign up.";
    }
  }
};

const getAllUsers = async (token: string): Promise<User[] | string> => {
  try {
    const response = await axios.get("/api/users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const users: User[] = response.data;
    return users;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data.message;
    } else {
      return "Failed to fetch users.";
    }
  }
};

const getUserById = async (
  id: string,
  token: string,
): Promise<User | string> => {
  try {
    const response = await axios.get(`/api/users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const user: User = response.data;
    return user;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data.message;
    } else {
      return "Failed to fetch user.";
    }
  }
};

const getUserListings = async ({
  userId,
  token,
}: {
  userId: string;
  token: string;
}) => {
  return (
    await axios.get<Listing[]>(`/api/users/${userId}/listings`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  ).data;
};

export const usersService = {
  signUp,
  login,
  getAllUsers,
  getUserById,
  getUserListings,
};
