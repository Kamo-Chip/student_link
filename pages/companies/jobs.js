import eventsPageStyles from "@/styles/pages/events.module.css";
import utilityStyles from "@/styles/utils/utilities.module.css";
import opportunities from "@/public/data/opportunities.json";
import OpportunityCard from "@/components/app_elements/OpportunityCard";
import Router from "next/router";
import {
  doc,
  query,
  setDoc,
  collection,
  where,
  getDocs,
} from "firebase/firestore";
import { auth, db } from "@/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";
const CompaniesJobsPage = () => {
  const [jobs, setJobs] = useState(null);
  const [user] = useAuthState(auth);
  const getJobs = async () => {
    const q = query(collection(db, "jobs"), where("companyId", "==", user.uid));
    const querySnapshot = await getDocs(q);

    let newJobs = [];
    querySnapshot.forEach((doc) => {
      newJobs.push(doc.data());
    });

    setJobs(newJobs);
  };

  useEffect(() => {
    if (user) {
      getJobs();
    }
  }, []);

  if (!jobs) {
    return <div>Loading</div>;
  }
  return (
    <div className={eventsPageStyles.container}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <span className={utilityStyles.heading2}>Job Posts</span>
        <span
          className={utilityStyles.button}
          onClick={() => Router.push("/companies/create-job")}
        >
          Create job post
        </span>
      </div>
      {jobs.map((element, idx) => {
        return (
          <div key={`${element}${idx}`} style={{ marginTop: "1rem" }}>
            <OpportunityCard opportunity={element} isCompanyViewing />
          </div>
        );
      })}
    </div>
  );
};

export default CompaniesJobsPage;
