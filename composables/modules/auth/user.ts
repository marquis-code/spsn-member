import { ref } from "vue";

const user = ref(null);
const token = ref(null);

export const useUser = () => {
  const setUser = (newUser, newToken) => {
    user.value = newUser;
    token.value = newToken;
    if (typeof window !== "undefined") {
      localStorage.setItem("user", JSON.stringify(newUser));
      localStorage.setItem("token", newToken);
    }
  };

  const logOut = () => {
    user.value = null;
    token.value = null;
    if (typeof window !== "undefined") {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    }
  };

  const loadUser = () => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      const storedToken = localStorage.getItem("token");
      if (storedUser && storedToken) {
        user.value = JSON.parse(storedUser);
        token.value = storedToken;
      }
    }
  };

  return { user, token, setUser, logOut, loadUser };
};
