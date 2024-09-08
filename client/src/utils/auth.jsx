export const useAuth = () => {
    const isLoggedIn = localStorage.getItem("userData") !== null;
    const role = localStorage.getItem("role");
  
    const redirectToLogin = () => {
      window.location.href = "/login";
    };
  
    return { isLoggedIn, role, redirectToLogin };
  };