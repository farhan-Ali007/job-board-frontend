import { Context } from "../../main";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import HeroSection from "../Home/HeroSection";
import HowItWorks from "../Home/HowItWorks";
import PopularCategories from "../Home/PopularCategories";
import PopularCompanies from "../Home/PopularCompanies";
import About from "./About";
import AvailablePositions from "./AvailablePositions";

const Home = () => {
  const { isAuthorized } = useContext(Context);

  if (!isAuthorized) {
    return <Navigate to={"/login"} />;
  }
  return (
    <section style={{padding:"20px"}}>
      <HeroSection />
      <About />
      <AvailablePositions />
      <HowItWorks />
      <PopularCategories />
      <PopularCompanies />
    </section>
  );
};

export default Home;
