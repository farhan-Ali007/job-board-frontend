import { useContext, useEffect, useState } from "react";
import { Context } from "../../main";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Jobs = () => {
  const { isAuthorized } = useContext(Context);
  const [jobs, setJobs] = useState([]);
  const navigateTo = useNavigate();

  useEffect(() => {
    try {
      axios
        .get("http://localhost:8000/api/v1/job/getall", {
          withCredentials: true,
        })
        .then((res) => {
          setJobs(res.data);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);
  if (!isAuthorized) {
    navigateTo("/login");
  }

  return (
    <section className="jobs page">
      <div className="container">
        <h1 className="available_jobs">All Available Jobs</h1>
        <div className="banner">
          {jobs.jobs &&
            jobs.jobs.map((e) => {
              return (
                <div className="card" key={e._id}>
                  <p>{e.title}</p>
                  <p>{e.category}</p>
                  <p>{e.country}</p>
                  <Link to={`/job/${e._id}`}>Job Details</Link>
                </div>
              );
            })}
        </div>
      </div>
    </section>
  );
};

export default Jobs;
