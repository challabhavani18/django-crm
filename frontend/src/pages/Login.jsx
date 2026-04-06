import { useDispatch } from "react-redux";
import { loginUser } from "../redux/authSlice";

const Login = () => {
  const dispatch = useDispatch();

  const handleLogin = () => {
    dispatch(loginUser({
      email: "your@email.com",
      password: "yourpassword"
    }));
  };

  return <button onClick={handleLogin}>Login</button>;
};

export default Login;