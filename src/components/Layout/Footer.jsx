import { useContext } from "react";
import { FaFacebook, FaLinkedin, FaYoutube } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { Context } from "../../main";

const Footer = () => {
  const { isAuthorized } = useContext(Context);

  return (
    <footer className={isAuthorized ? "footerShow" : "footerHide"}>
      <div>&copy; All Rights Reserved</div>
      <div className="footer-icons">
        <Link to={""} target="_blank">
          <FaFacebook />
        </Link>
        <Link to={""} target="_blank">
          <RiInstagramFill />
        </Link>
        <Link to={""} target="_blank">
          <FaLinkedin />
        </Link>
        <Link to={""} target="_blank">
          <FaYoutube />
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
