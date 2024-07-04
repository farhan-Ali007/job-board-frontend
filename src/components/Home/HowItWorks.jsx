import { FaUserPlus } from "react-icons/fa";
import { MdFindInPage } from "react-icons/md";
import { IoMdSend} from "react-icons/io";

const HowItWorks = () => {
  return (
    <div className="howitworks">
      <div className="container">
        <h3>How This Job House Works?</h3>
        <div className="banner">
          <div className="card card-box">
            <FaUserPlus />
            <p>Create Account</p>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quasi,
              hic inventore. Hic iusto consequatur maiores.
            </p>
          </div>
          <div className="card card-box">
            <MdFindInPage />
            <p>Find a job / Post a job</p>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quasi,
              hic inventore. Hic iusto consequatur maiores.
            </p>
          </div>
          <div className="card card-box">
            <IoMdSend />
            <p>Apply For Job/Recruit Suitable Candidates</p>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quasi,
              hic inventore. Hic iusto consequatur maiores.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
