import PropTypes from "prop-types";

const EmployerCard = ({ application, openModal }) => {
  const { name, email, phone, address, coverLetter, resume } = application;

  return (
    <>
      <div className="job_seeker_card">
        <div className="contain">
          <div className="resume">
            <img
              src={resume.url}
              onClick={() => openModal(resume.url)}
              alt="Resume"
            />
          </div>
          <div className="detailed_content">
            <p>
              <span className="content_span">Name:</span> {name}
            </p>
            <p>
              <span className="content_span">Email:</span> {email}
            </p>
            <p>
              <span className="content_span">Phone:</span> {phone}
            </p>
            <p>
              <span className="content_span">Address:</span> {address}
            </p>
            <p>
              <span className="content_span">Cover Letter:</span> {coverLetter}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

EmployerCard.propTypes = {
  application: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    coverLetter: PropTypes.string.isRequired,
    resume: PropTypes.shape({
      url: PropTypes.string.isRequired,
    }).isRequired,
    _id: PropTypes.string.isRequired,
  }).isRequired,
  openModal: PropTypes.func.isRequired,
};

export default EmployerCard;
