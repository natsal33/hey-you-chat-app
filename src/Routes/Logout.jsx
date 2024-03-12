import { useNavigate } from "react-router";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login", { replace: true });
  };
  // const { setToken } = useAuth();
  // const navigate = useNavigate();

  // const handleLogout = () => {
  //   setToken();
  //   navigate("/login", { replace: true });
  // };

  // setTimeout(() => {
  //   handleLogout();
  // }, 3 * 1000);

  return <button onClick={handleLogout}>LOGOUT</button>;
};

export default Logout;
