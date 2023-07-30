import { useState, useEffect } from "react";
import {
  roles,
  locations,
  skills,
  values,
  industries,
} from "@/public/data/filterOptions.json";
import PreferencePage from "@/components/app_elements/PreferencePage";
import Router, { useRouter } from "next/router";
import utilityStyles from "@/styles/utils/utilities.module.css";
import { auth, db } from "@/firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";

const CompanyOnboardPage = () => {
  const [preferences, setPreferences] = useState({
    industries: [],
    locations: [],
    skills: [],
    roles: [],
    values: [],
    name: "",
  });
  const [currentPage, setCurrentPage] = useState(0);
  const provider = new GoogleAuthProvider();
  const router = useRouter();
  const userDetails = {
    profilePhoto: "",
    jobPosts: [],
    events: [],
    schoolYear: "",
    locations: [],
    name: "",
    bio: "",
    socials: [],
    skills: [],
    desiredRoles: [],
  };

  const handleSubmit = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      if (result.user) {
        router.push("/companies/dashboard");
        await setDoc(doc(db, "companies", result.user.uid), {
          ...userDetails,
          id: result.user.uid,
          name: preferences.name,
          email: result.user.email,
          values: preferences.values,
          desiredRoles: preferences.roles,
          skills: preferences.skills,
          locations: preferences.locations,
          industries: preferences.industries,
        });
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        paddingTop: "1rem",
      }}
    >
      <div
        style={{
          width: `${((currentPage + 1) / 5) * 100}%`,
          height: "10px",
          backgroundColor: "var(--lime-green)",
          borderRadius: "5px",
          marginBottom: "1rem",
        }}
      ></div>
      {currentPage > 0 ? (
        <span
          onClick={() => setCurrentPage((prevState) => prevState - 1)}
          className={utilityStyles.button}
          style={{ backgroundColor: "var(--grey)" }}
        >
          Back
        </span>
      ) : null}

      {currentPage == 0 ? (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span
            className={utilityStyles.heading3}
            style={{ margin: ".5rem 0", textAlign: "center", width: "100%" }}
          >
            {"Let's get started"}
          </span>

          <input
            type="text"
            placeholder="Enter company name"
            onChange={(e) =>
              setPreferences({ ...preferences, name: e.target.value })
            }
          />
        </div>
      ) : currentPage == 1 ? (
        <ValuePage
          name={preferences.name}
          setPreferences={setPreferences}
          selectedOptions={preferences.values}
          numOptionsToSelect={5}
        />
      ) : currentPage == 2 ? (
        <RolePage
          name={preferences.name}
          setPreferences={setPreferences}
          selectedOptions={preferences.roles}
          numOptionsToSelect={5}
        />
      ) : currentPage == 3 ? (
        <SkillPage
          name={preferences.name}
          setPreferences={setPreferences}
          selectedOptions={preferences.skills}
          numOptionsToSelect={5}
        />
      ) : currentPage == 4 ? (
        <LocationPage
          name={preferences.name}
          setPreferences={setPreferences}
          selectedOptions={preferences.locations}
          // numOptionsToSelect={1}
        />
      ) : currentPage == 5 ? (
        <IndustryPage
          name={preferences.name}
          setPreferences={setPreferences}
          selectedOptions={preferences.industries}
          numOptionsToSelect={1}
        />
      ) : (
        <span>Done</span>
      )}

      {currentPage < 5 ? (
        <span
          className={utilityStyles.button}
          style={{
            alignSelf: "center",

            marginTop: "1rem",
          }}
          onClick={() => setCurrentPage((prevState) => prevState + 1)}
        >
          Save and continue
        </span>
      ) : (
        <span
          className={utilityStyles.button}
          style={{
            alignSelf: "center",
            marginTop: "1rem",
          }}
          onClick={() => {
            console.log(preferences);
            handleSubmit();
          }}
        >
          Done
        </span>
      )}
    </div>
  );
};

const SkillPage = ({
  setPreferences,
  selectedOptions,
  numOptionsToSelect,
  name,
}) => {
  return (
    <PreferencePage
      setPreferences={setPreferences}
      selectedOptions={selectedOptions}
      property="skills"
      optionArr={skills}
      numOptionsToSelect={numOptionsToSelect}
      header="Which skills should candidates have?🤹"
    />
  );
};

const RolePage = ({
  setPreferences,
  selectedOptions,
  numOptionsToSelect,
  name,
}) => {
  return (
    <PreferencePage
      setPreferences={setPreferences}
      selectedOptions={selectedOptions}
      property="roles"
      optionArr={roles}
      numOptionsToSelect={numOptionsToSelect}
      header="What kinds of roles are you looking to fill?🤔"
    />
  );
};

const ValuePage = ({
  setPreferences,
  selectedOptions,
  numOptionsToSelect,
  name,
}) => {
  return (
    <PreferencePage
      setPreferences={setPreferences}
      selectedOptions={selectedOptions}
      property="values"
      optionArr={values}
      numOptionsToSelect={numOptionsToSelect}
      header={`What are ${name ? name : "your company"}  values?✨`}
    />
  );
};

const LocationPage = ({
  setPreferences,
  selectedOptions,
  numOptionsToSelect,
  name,
}) => {
  return (
    <PreferencePage
      setPreferences={setPreferences}
      selectedOptions={selectedOptions}
      property="locations"
      optionArr={locations}
      numOptionsToSelect={numOptionsToSelect}
      header="Where are you based?📍"
    />
  );
};

const IndustryPage = ({
  setPreferences,
  selectedOptions,
  numOptionsToSelect,
  name,
}) => {
  return (
    <PreferencePage
      setPreferences={setPreferences}
      selectedOptions={selectedOptions}
      property="industries"
      optionArr={industries}
      numOptionsToSelect={numOptionsToSelect}
      header="Which industry do you operate within?🏭"
    />
  );
};

export default CompanyOnboardPage;
