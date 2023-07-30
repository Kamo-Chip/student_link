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
const CompaniesEventsPage = () => {
  const [events, setEvents] = useState(null);
  const [user] = useAuthState(auth);
  const getEvents = async () => {
    const q = query(
      collection(db, "events"),
      where("companyId", "==", user.uid)
    );
    const querySnapshot = await getDocs(q);

    let newEvents = [];
    querySnapshot.forEach((doc) => {
      newEvents.push(doc.data());
    });

    setEvents(newEvents);
  };

  useEffect(() => {
    if (user) {
      getEvents();
    }
  }, []);

  if (!events) {
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
        <span className={utilityStyles.heading2}>Events</span>
        <span
          className={utilityStyles.button}
          onClick={() => Router.push("/companies/create-event")}
        >
          Create event
        </span>
      </div>
      {events.map((element, idx) => {
        return (
          <div key={`${element}${idx}`} style={{ marginTop: "1rem" }}>
            <OpportunityCard opportunity={element} isCompanyViewing />
          </div>
        );
      })}
    </div>
  );
};

export default CompaniesEventsPage;
