import { useContext, useState } from "react";
import { Context } from "../../main";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Application = () => {
  const { isAuthorized, user } = useContext(Context);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [resume, setResume] = useState(null);
  const [fileName, setFileName] = useState("Choose File");

  const navigateTo = useNavigate();

  //handle file input change
  const handleFileChange = (e) => {
    const resume = e.target.files[0];
    setResume(resume);
    setFileName(resume ? resume.name : "Choose File");
  };

  const { id } = useParams();

  const handleApplication = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("address", address);
    formData.append("coverLetter", coverLetter);
    formData.append("resume", resume);
    formData.append("jobId", id);

    try {
      const { data } = await axios.post(
        "http://localhost:8000/api/v1/application/post",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setName("");
      setEmail("");
      setPhone("");
      setAddress("");
      setCoverLetter("");
      setResume(null);
      setFileName("Choose File");

      toast.success(data.message);
      navigateTo(`/job/getall`);
    } catch (error) {
      // console.log("Ful error ===>", error);

      if (error.response && error.response.data && error.response.data.error) {
        toast.error(error.response.data.error);
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  };

  if (!isAuthorized || (user && user.role !== "Job Seeker")) {
    navigateTo("/");
  }

  return (
    <section className="application">
      <div className="container">
        <h3 style={{ textAlign: "center", marginTop: "30px" }}>
          Application Form
        </h3>
        <form onSubmit={handleApplication}>
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="number"
            placeholder="Your phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <input
            type="text"
            placeholder="Your address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <textarea
            value={coverLetter}
            onChange={(e) => setCoverLetter(e.target.value)}
            placeholder="Coverletter"
          />
          <div>
            <label htmlFor="resume-upload" className="file-label">
              {fileName}
            </label>
            <input
              type="file"
              id="resume-upload"
              className="file-input"
              onChange={handleFileChange}
              accept=".jpg, .jpeg, .png, .webp"
            />
          </div>
          <button type="submit">Submit Application</button>
        </form>
      </div>
    </section>
  );
};

export default Application;
