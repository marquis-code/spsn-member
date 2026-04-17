import { ref } from "vue";
const user = ref(null);
const token = ref(null);
const useUser = () => {
  const setUser = (newUser, newToken) => {
    user.value = newUser;
    token.value = newToken;
  };
  const logOut = () => {
    user.value = null;
    token.value = null;
  };
  const loadUser = () => {
  };
  return { user, token, setUser, logOut, loadUser };
};
export {
  useUser as u
};
//# sourceMappingURL=user-Cv7HJ_sz.js.map
