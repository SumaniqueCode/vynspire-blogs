import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../redux/store";
import { loginStart, loginSuccess, loginFailure, logout } from "../redux/slices/authSlice";
import { toast } from "react-toastify";
import api from "../apis/axios";

export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const auth = useSelector((state: RootState) => state.auth);

  const login = async (email: string, password: string) => {
    try {
      dispatch(loginStart());

      const apiUsers = await api.get("/users");
      const localUsers = JSON.parse(localStorage.getItem("users") || "[]");
      const allUsers = [...apiUsers.data, ...localUsers];

      const matchedUser = allUsers.find(
        (u: any) => u.email === email && u.password === password
      );

      if (!matchedUser) {
        toast.error("Invalid email or password");
        dispatch(loginFailure("Invalid email or password"));
        return;
      }

      const fakeToken = "fake-jwt-token";
      localStorage.setItem("token", fakeToken);

      localStorage.setItem(
        "user",
        JSON.stringify({ id: matchedUser.id, name: matchedUser.name, email: matchedUser.email, avatar: matchedUser.avatar })
      );

      dispatch(
        loginSuccess({
          user: {
            email: matchedUser.email,
            name: matchedUser.name,
            id: matchedUser.id,
            avatar: "",
            createdAt: ""
          },
          token: fakeToken,
        })
      );

      toast.success("Login successful");
    } catch (err) {
      console.error(err);
      toast.error("Login failed");
      dispatch(loginFailure("Login failed"));
    }
  };

  const logoutUser = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user"); // remove stored user on logout
    dispatch(logout());
  };

  return { ...auth, login, logoutUser };
};
