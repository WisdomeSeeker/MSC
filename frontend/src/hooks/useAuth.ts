import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { setUser, clearUser } from '../store/slices/authSlice';
import { authService } from '../services/authService';

export const useAuth = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);

  const login = async (email: string, password: string) => {
    try {
      const response = await authService.login(email, password);
      dispatch(setUser(response.user));
      return response;
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    authService.logout();
    dispatch(clearUser());
  };

  const checkAuth = async () => {
    const user = await authService.getCurrentUser();
    if (user) {
      dispatch(setUser(user));
    } else {
      dispatch(clearUser());
    }
    return user;
  };

  return {
    user,
    isAuthenticated,
    login,
    logout,
    checkAuth,
  };
};
