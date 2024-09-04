import { User } from "../types/user";

// Define and save the user session
export function setUserSession(user: User) {
  if (typeof window !== "undefined") {
    const {token, ...userParam} = user;
    sessionStorage.setItem("user", JSON.stringify(userParam));
    sessionStorage.setItem("userToken", token as string);
  }
}

// Get the user token from the session
export function getToken() {
  if (typeof window !== "undefined") {
    const token = sessionStorage.getItem("userToken");

    return token;
  }
  return null;
}

// Save the user information from the session
export function getUser() {
  if (typeof window !== "undefined") {
    const user = JSON.parse(sessionStorage.getItem("user") as string) as User;

    return user;
  }
  return null;
}

// Remove the user session
export function removeUserSession() {
  if (typeof window !== "undefined") {
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("userToken");
  }
}

// Verify if the user is connected
export function isLoggedIn() {
  return getToken() !== null;
}
