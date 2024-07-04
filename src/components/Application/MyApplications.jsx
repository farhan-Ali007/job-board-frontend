import { useContext, useEffect, useState } from "react";
import { Context } from "../../main";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import ResumeModal from "./ResumeModal";
import JobSeekerCard from "../card/JobSeekerCard";
import EmployerCard from "../card/EmployerCard";

const MyApplications = () => {
  const { isAuthorized, user } = useContext(Context);

  const [myApplications, setMyApplications] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [resumeImageUrl, setResumeImageUrl] = useState("");

  useEffect(() => {
    try {
      if (user && user.role === "Employer") {
        axios
          .get("http://localhost:8000/api/v1/application/employer/getall", {
            withCredentials: true,
          })
          .then((res) => {
            setMyApplications(res.data.applications);
          });
      } else {
        axios
          .get("http://localhost:8000/api/v1/application/jobseeker/getall", {
            withCredentials: true,
          })
          .then((res) => {
            setMyApplications(res.data.applications);
          });
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }, [isAuthorized, user]);

  const navigateTo = useNavigate();
  if (!isAuthorized) {
    navigateTo("/login");
  }

  const deleteApplication = async (id) => {
    try {
      await axios
        .delete(`http://localhost:8000/api/v1/application/delete/${id}`, {
          withCredentials: true,
        })
        .then((res) => {
          // console.log("Response ---->",res)
          toast.success(res.data && res.data.message);
          setMyApplications((prevApplications) =>
            prevApplications.filter((application) => application._id !== id)
          );
        });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  // Image modal
  const openModal = (imageUrl) => {
    setResumeImageUrl(imageUrl);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <section>
      {user && user.role === "Job Seeker" ? (
        <>
          <div>
            <h3>My Applications</h3>
            {myApplications.map((application) => (
              <JobSeekerCard
                application={application}
                key={application._id}
                deleteApplication={deleteApplication}
                openModal={openModal}
              />
            ))}
          </div>
        </>
      ) : (
        <>
          <div>
            <h3>Applications</h3>
            {myApplications.map((application) => (
              <EmployerCard
                application={application}
                key={application._id}
                openModal={openModal}
              />
            ))}
          </div>
        </>
      )}
      {modalOpen && (
        <ResumeModal imageUrl={resumeImageUrl} onClose={closeModal} />
      )}
    </section>
  );
};

export default MyApplications;
