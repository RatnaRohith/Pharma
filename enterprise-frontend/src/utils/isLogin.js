import { getCurrentUser } from '../services/auth'

export const isLogin = () => {
  const user = getCurrentUser();
  return user ? true : false
};
