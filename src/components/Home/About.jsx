import "../../About.css";

const About = () => {
  return (
    <>
      <div className="about-us">
        <h1>About Us</h1>
      </div>
      <div className="wrapper">
        <div className="items">
          <div className="content">
            <div className="header">
              <span className="heads">Our Mission:</span>
            </div>
            <p className="titles">
              Connecting talented job seekers with top employers for a thriving
              professional community.
            </p>
            <button className="btn-12">
              <span >Learn More </span>
            </button>
          </div>
        </div>
        <div className="items">
          <div className="content">
            <div className="header">
              <span className="heads">Our Vision:</span>
            </div>
            <p className="titles">
              A seamless job search experience, connecting aspirations with
              opportunities effortlessly.
            </p>
            <button className="btn-12">
              <span>Learn More</span>
            </button>
          </div>
        </div>
        <div className="items">
          <div className="content">
            <div className="header">
              <span className="heads">Our Values:</span>
            </div>
            <p className="titles">
              Integrity, innovation, and inclusivity drive our user-friendly,
              fair, and accessible platform.
            </p>
            <button className="btn-12">
              <span>Learn More</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
