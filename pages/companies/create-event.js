import { auth } from "@/firebase";
import createPageStyles from "@/styles/pages/create.module.css";
import utilityStyles from "@/styles/utils/utilities.module.css";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
const CompanyCreateEventPage = () => {
  const [user, loading] = useAuthState(auth);
  const [eventDetails, setEventDetails] = useState({
    title: "",
    location: "",
    type: "",
    industry: "",
    company: "",
  });

  const handleSubmit = async () => {};

  return (
    <div className={createPageStyles.container}>
      <span
        className={utilityStyles.heading2}
        style={{ textAlign: "center", marginBottom: "1rem" }}
      >
        Create Event
      </span>
      <span>Title</span>
      <input type="text" id="title" style={{ marginBottom: "1rem" }} />
      <span>Location</span>
      <input type="text" id="location" style={{ marginBottom: "1rem" }} />
      <span>Type</span>
      <input type="text" id="type" style={{ marginBottom: "1rem" }} />
      <span
        className={utilityStyles.button}
        style={{ alignSelf: "center" }}
        onClick={handleSubmit}
      >
        Done
      </span>
    </div>
  );
};

export default CompanyCreateEventPage;
