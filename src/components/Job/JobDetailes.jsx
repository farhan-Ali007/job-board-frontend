import { useContext, useEffect, useState } from "react";
import { Navigate, useParams, useNavigate } from "react-router-dom";
import { Context } from "../../main";
import axios from "axios";
import { format } from 'date-fns';

const JobDetailes = () => {
  const { id } = useParams();
  const [job, setJob] = useState({});
  const navigate = useNavigate();
  
  const { isAuthorized, user } = useContext(Context);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/v1/job/${id}`, {
        withCredentials: true,
      })
      .then((res) => setJob(res.data.job))
      .catch((err) => {
        console.log(err.response.data);
      });
  }, [id]);

  if (!isAuthorized) {
    return <Navigate to={"/login"} />;
  }

  const handleApplyClick = () => {
    navigate(`/application/${job._id}`);
  };

  const formattedJobPostedOn = job.jobPostedOn
    ? format(new Date(job.jobPostedOn), 'dd MMMM, yyyy')
    : ''; // Format the date


  return (
    <div className="jobDetail page">
      <div className="container">
        <h3>Job Details</h3>
        <div className="banner job">
          <p>
            Title : <span>{job.title}</span>
          </p>
          <p>
            Category : <span>{job.category}</span>
          </p>
          <p>
            Country : <span>{job.country}</span>
          </p>
          <p>
            City : <span>{job.city}</span>
          </p>
          <p>
            Location : <span>{job.location}</span>
          </p>
          <p>
            Description : <span>{job.description}</span>
          </p>
          <p>
            Posted On : <span>{formattedJobPostedOn}</span>
          </p>
          <p>
            Salary:{" "}
            {job.fixedSalary ? (
              <span>{job.fixedSalary}</span>
            ) : (
              <span>
                {job.salaryFrom} - {job.salaryTo}
              </span>
            )}
          </p>
          <p>
            {user && user.role === "Employer" ? (
              <></>
            ) : (
              <button onClick={handleApplyClick}>Apply Now</button>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default JobDetailes;
