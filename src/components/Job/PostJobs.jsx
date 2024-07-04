import { useContext, useEffect, useState } from "react";
import { Context } from "../../main";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const PostJobs = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [city, setCity] = useState("");
  const [location, setLocation] = useState("");
  const [salaryFrom, setSalaryFrom] = useState("");
  const [salaryTo, setSalaryTo] = useState("");
  const [fixedSalary, setFixedSalary] = useState("");
  const [salaryType, setSalaryType] = useState("default");
  const [country, setCountry] = useState("");

  const { isAuthorized, user } = useContext(Context);

  const payLoad = {
    title,
    description,
    category,
    country,
    city,
    location,
    fixedSalary,
  };

  const handleJobPost = async (e) => {
    e.preventDefault();
    if (salaryType === "Fixed salary") {
      setSalaryFrom("");
      setSalaryTo("");
    } else if (salaryType === "Ranged salary") {
      setFixedSalary("");
    } else {
      setSalaryFrom("");
      setSalaryTo("");
    }
    await axios
      .post(
        "http://localhost:8000/api/v1/job/post",
        fixedSalary.length >= 4
          ? payLoad
          : {
              ...payLoad,
              salaryFrom,
              salaryTo,
            },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        console.log(res);
        toast.success(res.data.message);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        console.log(err);
      });
  };

  const navigateTo = useNavigate();

  if (!isAuthorized || (user && user.role !== "Employer")) {
    navigateTo("/");
  }

  useEffect(() => {
    if (!isAuthorized || (user && user.role !== "Employer")) {
      navigateTo("/");
    }
  }, [isAuthorized, user, navigateTo]);

  return (
    <div className="container">
      <form className="job_form" onSubmit={handleJobPost}>
        <h3>Post New Job</h3>
        <div className="row">
          <div className="column">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Job Title"
            />
          </div>
          <div className="column">
            <input
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              placeholder="Country"
            />
          </div>
        </div>
        <div className="row">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="City"
          />
        </div>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Location"
        />
        <div className="selection">
          <div className="column">
            <select
              className="job_form_select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="" disabled>
                Select Category
              </option>
              <option value="Graphics & Design">Graphics & Design</option>
              <option value="Mobile App Development">
                Mobile App Development
              </option>
              <option value="Frontend Web Development">
                Frontend Web Development
              </option>
              <option value="MERN Stack Development">
                MERN STACK Development
              </option>
              <option value="Account & Finance">Account & Finance</option>
              <option value="Artificial Intelligence">
                Artificial Intelligence
              </option>
              <option value="Video Animation">Video Animation</option>
              <option value="MEAN Stack Development">
                MEAN STACK Development
              </option>
              <option value="MEVN Stack Development">
                MEVN STACK Development
              </option>
              <option value="Data Entry Operator">Data Entry Operator</option>
            </select>
          </div>
          <div className="column">
            <select
              value={salaryType}
              onChange={(e) => setSalaryType(e.target.value)}
            >
              <option value="default" disabled>
                Select Salary Type
              </option>
              <option value="Fixed Salary">Fixed Salary</option>
              <option value="Ranged Salary">Ranged Salary</option>
            </select>
          </div>
        </div>
        {salaryType === "default" ? (
          ""
        ) : salaryType === "Fixed Salary" ? (
          <input
            type="number"
            placeholder="Enter Fixed Salary"
            value={fixedSalary}
            onChange={(e) => setFixedSalary(e.target.value)}
          />
        ) : (
          <div className="row">
            <div className="column">
              <input
                type="number"
                placeholder="Salary From"
                value={salaryFrom}
                onChange={(e) => setSalaryFrom(e.target.value)}
              />
            </div>
            <div className="column">
              <input
                type="number"
                placeholder="Salary To"
                value={salaryTo}
                onChange={(e) => setSalaryTo(e.target.value)}
              />
            </div>
          </div>
        )}
        <textarea
          rows="10"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Job Description"
        />
        <button className="create" type="submit">
          Create Job
        </button>
      </form>
    </div>
  );
};

export default PostJobs;
