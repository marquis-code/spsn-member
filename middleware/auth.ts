export default defineNuxtRouteMiddleware((to, from) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    const publicPaths = ["/", "/login", "/signup", "/register"];
    if (!token && !publicPaths.includes(to.path)) {
      return navigateTo("/login");
    }
  }
});
