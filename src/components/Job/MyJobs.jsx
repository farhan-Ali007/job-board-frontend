import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Context } from "../../main";

const MyJobs = () => {
  const { isAuthorized, user } = useContext(Context);
  const [myJobs, setMyJobs] = useState([]);
  const [editingMode, setEditingMode] = useState(null);

  // Fetching All Jobs of An Employer
  useEffect(() => {
    const fetchMyJobs = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/v1/job/getmyjobs", {
          withCredentials: true,
        });
        setMyJobs(res.data.myJobs);
      } catch (error) {
        toast.error(error.response.data.message);
        setMyJobs([]);
      }
    };
    fetchMyJobs();
  }, []);

  const handleEnableEdit = (jobId) => {
    setEditingMode(jobId);
  };

  const handleDisableEdit = () => {
    setEditingMode(null);
  };

  const handleUpdateJob = async (jobId) => {
    const updateJob = myJobs.find((job) => job._id === jobId);
    try {
      const res = await axios.put(`http://localhost:8000/api/v1/job/updatemyjob/${jobId}`, updateJob, {
        withCredentials: true,
      });
      toast.success(res.data.message);
      setEditingMode(null);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleDeleteJob = async (jobId) => {
    try {
      const res = await axios.delete(`http://localhost:8000/api/v1/job/deletemyjob/${jobId}`, {
        withCredentials: true,
      });
      toast.success(res.data.message);
      setMyJobs((prevJobs) => prevJobs.filter((job) => job._id !== jobId));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleInputChange = (jobId, field, value) => {
    setMyJobs((prevJobs) =>
      prevJobs.map((job) =>
        job._id === jobId ? { ...job, [field]: value } : job
      )
    );
  };

  const navigateTo = useNavigate();
  if (!isAuthorized || (user && user.role !== "Employer")) {
    navigateTo("/");
  }

  return (
    <div className="my_jobs">
      <h3>Your Posted Jobs</h3>
      {myJobs.length > 0 ? (
        myJobs.map((job) => (
          <div className="care" key={job._id}>
            <div className="contents">
              <div className="short_fields">
                <div>
                  <span>Title :</span>
                  <input
                    type="text"
                    disabled={editingMode !== job._id}
                    value={job.title}
                    onChange={(e) => handleInputChange(job._id, "title", e.target.value)}
                  />
                </div>
                <div>
                  <span>Country :</span>
                  <input
                    type="text"
                    disabled={editingMode !== job._id}
                    value={job.country}
                    onChange={(e) => handleInputChange(job._id, "country", e.target.value)}
                  />
                </div>
                <div>
                  <span>City :</span>
                  <input
                    type="text"
                    disabled={editingMode !== job._id}
                    value={job.city}
                    onChange={(e) => handleInputChange(job._id, "city", e.target.value)}
                  />
                </div>
                <div>
                  <span>Category :</span>
                  <select
                    className="select_field"
                    value={job.category}
                    onChange={(e) => handleInputChange(job._id, "category", e.target.value)}
                    disabled={editingMode !== job._id}
                  >
                    <option value="" disabled>Select Category</option>
                    <option value="Graphics & Design">Graphics & Design</option>
                    <option value="Mobile App Development">Mobile App Development</option>
                    <option value="Frontend Web Development">Frontend Web Development</option>
                    <option value="MERN Stack Development">MERN Stack Development</option>
                    <option value="MEAN Stack Development">MEAN Stack Development</option>
                    <option value="MEVN Stack Development">MEVN Stack Development</option>
                    <option value="Account & Finance">Account & Finance</option>
                    <option value="Artificial Intelligence">Artificial Intelligence</option>
                    <option value="Video Animation">Video Animation</option>
                    <option value="Data Entry Operator">Data Entry Operator</option>
                  </select>
                </div>
                <div>
                  <span>Salary:</span>
                  {job.fixedSalary ? (
                    <input
                      type="number"
                      value={job.fixedSalary}
                      onChange={(e) => handleInputChange(job._id, "fixedSalary", e.target.value)}
                      disabled={editingMode !== job._id}
                    />
                  ) : (
                    <>
                      <input
                        type="number"
                        placeholder="Salary From"
                        value={job.salaryFrom}
                        onChange={(e) => handleInputChange(job._id, "salaryFrom", e.target.value)}
                        disabled={editingMode !== job._id}
                      />
                      <input
                        type="number"
                        placeholder="Salary To"
                        value={job.salaryTo}
                        onChange={(e) => handleInputChange(job._id, "salaryTo", e.target.value)}
                        disabled={editingMode !== job._id}
                      />
                    </>
                  )}
                </div>
                <div>
                  <span>Expired:</span>
                  <select
                    className="select_expire"
                    value={job.expired}
                    onChange={(e) => handleInputChange(job._id, "expired", e.target.value)}
                    disabled={editingMode !== job._id}
                  >
                    <option value="true">True</option>
                    <option value="false">False</option>
                  </select>
                </div>
              </div>
              <div className="long_field">
                <div>
                  <span>Location :</span>
                  <textarea
                    rows="5"
                    value={job.location}
                    onChange={(e) => handleInputChange(job._id, "location", e.target.value)}
                    disabled={editingMode !== job._id}
                  />
                </div>
                <div>
                  <span>Description :</span>
                  <textarea
                    rows="5"
                    value={job.description}
                    onChange={(e) => handleInputChange(job._id, "description", e.target.value)}
                    disabled={editingMode !== job._id}
                  />
                </div>
              </div>
            </div>
            <div className="btn_edit_delete">
              {editingMode === job._id ? (
                <>
                  <button className="edit_btn" onClick={handleDisableEdit}>
                    Cancel
                  </button>
                  <button className="edit_btn" onClick={() => handleUpdateJob(job._id)}>
                    OK
                  </button>
                </>
              ) : (
                <button className="edit_btn" onClick={() => handleEnableEdit(job._id)}>
                  Edit
                </button>
              )}
              {editingMode !== job._id && (
                <button className="delete_btn" onClick={() => handleDeleteJob(job._id)}>
                  Delete
                </button>
              )}
            </div>
          </div>
        ))
      ) : (
        <p>You have not posted any job yet or maybe you deleted all of your jobs!</p>
      )}
    </div>
  );
};

export default MyJobs;
