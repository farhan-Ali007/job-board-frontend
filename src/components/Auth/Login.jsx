import axios from "axios";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";
import { Link, Navigate } from "react-router-dom";
import "../../App.css";
import { Context } from "../../main";

const Login = () => {
  const { isAuthorized, setIsAuthorized } = useContext(Context);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:8000/api/v1/user/login",
        { email, password, role },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success(data.message);
      setEmail("");
      setPassword("");
      setRole("");
      setIsAuthorized(true);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Invalid role/email/password");
    }
  };

  if(isAuthorized){
    return <Navigate to={'/'}/>
  }


  return (
    <div className="authPage">
      <div className="container">
        <div className="header">
          <h3>Login to your account</h3>
        </div>
        <form>
          <div className="inputTag">
            <div>
              <select className="select_login_register" value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="" disabled>
                  Select Role
                </option>
                <option value="Employer">Employer</option>
                <option value="Job Seeker">Job Seeker</option>
              </select>
              <FaRegUser className="wite" />
            </div>
          </div>
          <div className="inputTag">
            <div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email.."
              />
              <MdOutlineMailOutline className="wite" />
            </div>
          </div>
          <div className="inputTag">
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
              />
              <RiLock2Fill className="wite" />
            </div>
          </div>
          <button onClick={handleLogin} type="submit">
            Login
          </button>
          <Link to="/register">Register</Link>
        </form>
      </div>
      <div className="banner">
        <img src="/login.png" alt="login" />
      </div>
    </div>
  );
};

export default Login;
