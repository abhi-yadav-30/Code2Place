import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user")); // stored after login


  if (!user) {
    alert("you are not logged in , first login!!");
    return <Navigate to="/auth" replace />;
  }

  return children;
};

export default ProtectedRoute;
