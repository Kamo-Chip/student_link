import opportunityStyles from "@/styles/app_elements/opportunityCard.module.css";
import { BiUserCircle } from "react-icons/bi";
import Image from "next/image";
import utilityStyles from "@/styles/utils/utilities.module.css";
import { useRouter } from "next/router";

const OpportunityCard = ({ opportunity, type, isCompanyViewing }) => {
  const router = useRouter();
  return (
    <div className={opportunityStyles.container}>
      <div>
        {opportunity.profilePhoto ? (
          <Image src={opportunity.profilePhoto} height={40} width={40} alt="" />
        ) : (
          <span>
            <BiUserCircle size="40px" />
          </span>
        )}
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginLeft: ".5rem",
        }}
      >
        <span className={utilityStyles.headingsm}>
          {type == "candidate" ? opportunity.name : opportunity.title}
        </span>
        {type != "candidate" ? (
          <>
            <span className={utilityStyles.textsm}>{opportunity.company}</span>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <span className={utilityStyles.tab}>
                📍{opportunity.location}
              </span>
              <span
                className={utilityStyles.tab}
                style={{ marginLeft: ".5rem" }}
              >
                {type != "event" ? "💼" : "🔗"} {opportunity.type}
              </span>
            </div>
          </>
        ) : (
          <div style={{ display: "flex", flexDirection: "row" }}>
            <span className={utilityStyles.tab}>📜{opportunity.degree}</span>
            <span className={utilityStyles.tab} style={{ marginLeft: ".5rem" }}>
              🏛️ {opportunity.university}
            </span>
            <span className={utilityStyles.tab} style={{ marginLeft: ".5rem" }}>
              {type != "event" ? "💼" : "🔗"} {opportunity.schoolYear}
            </span>
          </div>
        )}
      </div>
      <span
        className={utilityStyles.button1}
        style={{ position: "absolute", top: "1rem", right: "1rem" }}
        onClick={() => router.push(`/companies/candidates/${opportunity.id}`)}
      >
        {type == "event"
          ? "View more"
          : type == "candidate"
          ? "Message"
          : isCompanyViewing
          ? "Delete"
          : "Apply"}
      </span>
    </div>
  );
};

export default OpportunityCard;
