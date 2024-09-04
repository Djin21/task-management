import { useDispatch, useSelector } from "react-redux";
import {
    login as loginOnStore,
    logout as logoutOnStore
} from "../store/authSlice";

import {
  AppDispatch,
  RootState,
} from "../store";
import { UserLoginParams } from "../types/user";

const useAuth = () => {
  const { user } = useSelector((state: RootState) => state?.auth);
  const dispatch = useDispatch<AppDispatch>();

  const signIn = async (formData: FormData) => {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const user: UserLoginParams = { email, password };

    // Login
    const response = await dispatch(loginOnStore(user));

    if(response?.payload) {
        // Redirect to tasks page
        window.location.replace("/")
    }

  };

  const signOut = async () => {
    // Login
    const response = await dispatch(logoutOnStore());

    if(response?.payload) {
        // Redirect to the login page after logout
        window.location.replace("/login")
    }

  };

  const isLogin = () => {

    if(user) {
        return true
    }
    return false
  };

  return { user, signIn, isLogin, signOut };
};

export default useAuth;
