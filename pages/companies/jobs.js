import eventsPageStyles from "@/styles/pages/events.module.css";
import utilityStyles from "@/styles/utils/utilities.module.css";
import opportunities from "@/public/data/opportunities.json";
import OpportunityCard from "@/components/app_elements/OpportunityCard";

const CompaniesJobsPage = () => {
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
        <span className={utilityStyles.button}>Create job post</span>
      </div>
      {opportunities.map((element, idx) => {
        return (
          <div key={`${element}${idx}`} style={{ marginTop: "1rem" }}>
            <OpportunityCard opportunity={element} />
          </div>
        );
      })}
    </div>
  );
};

export default CompaniesJobsPage;
