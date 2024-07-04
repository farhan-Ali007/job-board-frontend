import axios from "axios";
import { Context } from "./main";
import { useContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Application from "./components/Application/Application";
import MyApplications from "./components/Application/MyApplications";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Home from "./components/Home/Home";
import JobDetails from "./components/Job/JobDetailes";
import Jobs from "./components/Job/Jobs";
import MyJobs from "./components/Job/MyJobs";
import Footer from "./components/Layout/Footer";
import Navbar from "./components/Layout/Navbar";
import NotFound from "./components/NotFound/NotFound";
import PostJobs from "./components/Job/PostJobs";
import "./App.css";

const App = () => {
  const {  setIsAuthorized, setUser, isAuthorized } = useContext(Context);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/v1/user/getUser",
          {
            withCredentials: true,
          }
        );
        console.log("Response ==>", response);
        setLoading(false)
        setUser(response.data.user);
        setIsAuthorized(true);
      } catch (error) {
        setLoading(false);
        setIsAuthorized(false);
        setUser({});
        console.error("Fetch user error:", error);
      }
    };

    fetchUser();
  }, [isAuthorized]);
  if (loading) {
    return <div>Loading...</div>; // Or a proper loading spinner
  }

  return (
    <>
      <Router>
        <Navbar />
        <ToastContainer />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Home />} />
          <Route path="/job/getall" element={<Jobs />} />
          <Route path="/job/:id" element={<JobDetails />} />
          <Route path="/application/:id" element={<Application />} />
          <Route path="/applications/me" element={<MyApplications />} />
          <Route path="/job/post" element={<PostJobs />} />
          <Route path="/job/me" element={<MyJobs />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
};

export default App;
