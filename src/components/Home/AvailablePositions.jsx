import { FaBuilding, FaSuitcase, FaUserPlus, FaUsers } from "react-icons/fa";
const AvailablePositions = () => {
  const details = [
    {
      id: 1,
      title: "1,23,441",
      subTitle: "Live Job",
      icon: <FaSuitcase />,
    },
    {
      id: 2,
      title: "91220",
      subTitle: "Companies",
      icon: <FaBuilding />,
    },
    {
      id: 3,
      title: "2,34,200",
      subTitle: "Job Seekers",
      icon: <FaUsers />,
    },
    {
      id: 4,
      title: "1,03,761",
      subTitle: "Employers",
      icon: <FaUserPlus />,
    },
  ];

  return (
    <>
      <div className="ap">
        {" "}
        <h1>Available Positions</h1>
      </div>
      <div className="heroSection">
        <div className="details ">
          {details.map((e) => {
            return (
              <div className="card" key={e.id}>
                <div className="icon">{e.icon}</div>
                <div className="content">
                  <p>{e.title}</p>
                  <p>{e.subTitle}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default AvailablePositions;
