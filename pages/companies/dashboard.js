import OpportunityCard from "@/components/app_elements/OpportunityCard";
import dashboardStyles from "@/styles/pages/dashboard.module.css";
import utilityStyles from "@/styles/utils/utilities.module.css";
import opportunities from "@/public/data/opportunities.json";
import { useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "@/firebase";
const events = [
  {
    title: "AdaptIT Hackathon",
    company: "AdaptIT",
    location: "Johannesburg",
    type: "In-person",
    link: "#",
  },
];

const CompanyDashboardPage = () => {
  const [candidates, setCandidates] = useState(null);
  const getCandidates = async () => {
    let newCandidates = [];
    const res = await getDocs(collection(db, "candidates"));
    res.docs.forEach((doc) => {
      newCandidates.push(doc.data());
    });
    setCandidates(newCandidates);
  };

  useEffect(() => {
    getCandidates();
  }, []);

  if (!candidates) {
    return <div>Loading</div>;
  }

  return (
    <div className={dashboardStyles.container}>
      <span className={utilityStyles.heading3}>Candidate Matches</span>
      <div className={dashboardStyles.itemsContainer}>
        {candidates.map((element, idx) => {
          return (
            <div key={`opportunity${idx}`} style={{ marginTop: "1rem" }}>
              <OpportunityCard opportunity={element} type="candidate" />
            </div>
          );
        })}
      </div>
      <span className={utilityStyles.heading3} style={{ marginTop: "2rem" }}>
        Job Posts
      </span>
      <div className={dashboardStyles.itemsContainer}>
        {events.map((element, idx) => {
          return (
            <div key={`event${idx}`} style={{ marginTop: "1rem" }}>
              <OpportunityCard opportunity={element} type="event" />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CompanyDashboardPage;
