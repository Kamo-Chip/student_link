import OpportunityCard from "@/components/app_elements/OpportunityCard";
import dashboardStyles from "@/styles/pages/dashboard.module.css";
import utilityStyles from "@/styles/utils/utilities.module.css";
import opportunities from "@/public/data/opportunities.json";
import { useRouter } from "next/router";
const events = [
  {
    title: "AdaptIT Hackathon",
    company: "AdaptIT",
    location: "Johannesburg",
    type: "In-person",
    link: "#",
  },
  {
    title: "TECHSPO",
    company: "TECHSPO",
    location: "Cape Town",
    type: "In-person",
    link: "https://techspocapetown.co.za",
  },
  {
    title: "THE ROCKING FUTURE ROADSHOW",
    company: "3RC",
    location: "Pietermaritzburg",
    type: "In-person",
    link: "know more",
  },
];

const CandidateDashboardPage = () => {
  const router = useRouter();

  return (
    <div className={dashboardStyles.container}>
      <span className={utilityStyles.heading3}>Opportunity Matches</span>
      <div className={dashboardStyles.itemsContainer}>
        {opportunities.map((element, idx) => {
          return (
            <div
              key={`opportunity${idx}`}
              style={{ marginTop: "1rem" }}
              onClick={() => router.push(element.link)}
            >
              <OpportunityCard opportunity={element} />
            </div>
          );
        })}
      </div>
      <span className={utilityStyles.heading3} style={{ marginTop: "2rem" }}>
        Recommended Events
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

export default CandidateDashboardPage;
