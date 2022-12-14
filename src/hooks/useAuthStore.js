import { useDispatch, useSelector } from "react-redux";
import { calendarApi } from "../api";
import {
  clearAuthenticated,
  clearErrorMessage,
  onChecking,
  onLogin,
  onLogout,
} from "../store/auth/authSlice";
import { onLogoutCalendar } from "../store/calendar/calendarSlice";

export const useAuthStore = () => {
  const { status, user, errorMessage } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const startLogin = async ({ email, password }) => {
    dispatch(onChecking());
    try {
      const { data } = await calendarApi.post("/auth", { email, password });
      localStorage.setItem("token", data.token);
      localStorage.setItem("token-init-date", new Date().getTime());
      dispatch(onLogin({ name: data.name, uid: data.uid }));
    } catch (error) {
      dispatch(onLogout("Credenciales incorrectas"));
      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 10);
    }
  };

  const startRegister = async ({ name, email, password }) => {
    dispatch(onChecking());
    try {
      const { data } = await calendarApi.post("/auth/create", {
        name,
        email,
        password,
      });
      localStorage.setItem("token", data.token);
      localStorage.setItem("token-init-date", new Date().getTime());
      dispatch(onLogin({ name: data.name, uid: data.uid }));
    } catch (error) {
      dispatch(
        onLogout(error.response?.data?.msg ?? "Credenciales incorrectas")
      );
      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 10);
    }
  };

  const checkAuthToken = async () => {
    const token = localStorage.getItem("token");
    const tokenInitDate = localStorage.getItem("token-init-date");
    if (!token) return dispatch(onLogout());
    if (!tokenInitDate) return;

    try {
      if (new Date(tokenInitDate) >= new Date()) {
        const { data } = await calendarApi.get("/auth/renew");
        localStorage.setItem("token", data.token);
        localStorage.setItem("token-init-date", new Date().getTime());
        dispatch(onLogin({ name: data.name, uid: data.uid }));
      } else {
        dispatch(clearAuthenticated());
      }
    } catch (error) {
      console.log(error);
      localStorage.clear();
      dispatch(onLogout());
    }
  };

  const startLogout = async () => {
    localStorage.clear();
    dispatch(onLogout());
    dispatch(onLogoutCalendar());
  };

  return {
    status,
    user,
    errorMessage,
    startLogin,
    startRegister,
    checkAuthToken,
    startLogout,
  };
};
