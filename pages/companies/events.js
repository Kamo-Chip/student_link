import eventsPageStyles from "@/styles/pages/events.module.css";
import utilityStyles from "@/styles/utils/utilities.module.css";
import opportunities from "@/public/data/opportunities.json";
import OpportunityCard from "@/components/app_elements/OpportunityCard";
import Router from "next/router";

const CompaniesEventsPage = () => {
  return (
    <div className={eventsPageStyles.container}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <span className={utilityStyles.heading2}>Events</span>
        <span
          className={utilityStyles.button}
          onClick={() => Router.push("/companies/create-event")}
        >
          Create event
        </span>
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

export default CompaniesEventsPage;
