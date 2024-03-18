import { useNavigate } from "react-router";
import AuthHelperMethods from "../Components/AuthHelperMethods";

const Logout = () => {
  const navigate = useNavigate();
  const Auth = new AuthHelperMethods();

  const handleLogout = () => {
    Auth.logout();
    navigate("/login", { replace: true });
  };

  return <button onClick={handleLogout}>LOGOUT</button>;
};

export default Logout;
