import OpportunityCard from "@/components/app_elements/OpportunityCard";
import dashboardStyles from "@/styles/pages/dashboard.module.css";
import utilityStyles from "@/styles/utils/utilities.module.css";
import opportunities from "@/public/data/opportunities.json";
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
  const getCandidates = async () => {};
  return (
    <div className={dashboardStyles.container}>
      <span className={utilityStyles.heading3}>Candidate Matches</span>
      <div className={dashboardStyles.itemsContainer}>
        {opportunities.map((element, idx) => {
          return (
            <div key={`opportunity${idx}`} style={{ marginTop: "1rem" }}>
              <OpportunityCard opportunity={element} />
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
