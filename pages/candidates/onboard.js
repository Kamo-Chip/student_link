import { useState, useEffect } from "react";
import {
  roles,
  locations,
  skills,
  values,
} from "@/public/data/filterOptions.json";
import PreferencePage from "@/components/app_elements/PreferencePage";
import Router, { useRouter } from "next/router";
import utilityStyles from "@/styles/utils/utilities.module.css";
import { auth, db } from "@/firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";

const CandidateOnboardPage = () => {
  const [preferences, setPreferences] = useState({
    values: [],
    locations: [],
    roles: [],
    skills: [],
  });
  const [currentPage, setCurrentPage] = useState(0);
  const router = useRouter();
  const provider = new GoogleAuthProvider();
  const userDetails = {
    profilePhoto: "",
    degree: "",
    university: "",
    schoolYear: "",
    location: "",
    name: "",
    bio: "",
    socials: [],
    documents: [],
    videoIntro: "",
    skills: [],
    experience: [],
    projects: [],
    desiredRoles: [],
  };
  const handleSubmit = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      if (result.user) {
        router.push("/candidates/dashboard");
        await setDoc(doc(db, "candidates", result.user.uid), {
          ...userDetails,
          id: result.user.uid,
          name: result.user.displayName,
          email: result.user.email,
          values: preferences.values,
          desiredRoles: preferences.roles,
          skills: preferences.skills,
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
        <ValuePage
          setPreferences={setPreferences}
          selectedOptions={preferences.values}
          numOptionsToSelect={3}
        />
      ) : currentPage == 1 ? (
        <RolePage
          setPreferences={setPreferences}
          selectedOptions={preferences.roles}
          numOptionsToSelect={3}
        />
      ) : currentPage == 2 ? (
        <SkillPage
          setPreferences={setPreferences}
          selectedOptions={preferences.skills}
          numOptionsToSelect={5}
        />
      ) : currentPage == 3 ? (
        <LocationPage
          setPreferences={setPreferences}
          selectedOptions={preferences.locations}
        />
      ) : (
        <span>Done</span>
      )}

      {currentPage < 3 ? (
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

const SkillPage = ({ setPreferences, selectedOptions, numOptionsToSelect }) => {
  return (
    <PreferencePage
      setPreferences={setPreferences}
      selectedOptions={selectedOptions}
      property="skills"
      optionArr={skills}
      numOptionsToSelect={numOptionsToSelect}
      header="What skills do you have?🤹"
    />
  );
};

const RolePage = ({ setPreferences, selectedOptions, numOptionsToSelect }) => {
  return (
    <PreferencePage
      setPreferences={setPreferences}
      selectedOptions={selectedOptions}
      property="roles"
      optionArr={roles}
      numOptionsToSelect={numOptionsToSelect}
      header="What kinds of roles are you interested in?🤔"
    />
  );
};

const ValuePage = ({ setPreferences, selectedOptions, numOptionsToSelect }) => {
  return (
    <PreferencePage
      setPreferences={setPreferences}
      selectedOptions={selectedOptions}
      property="values"
      optionArr={values}
      numOptionsToSelect={numOptionsToSelect}
      header="What do you value in a role?✨"
    />
  );
};

const LocationPage = ({
  setPreferences,
  selectedOptions,
  numOptionsToSelect,
}) => {
  return (
    <PreferencePage
      setPreferences={setPreferences}
      selectedOptions={selectedOptions}
      property="locations"
      optionArr={locations}
      numOptionsToSelect={numOptionsToSelect}
      header="Location preference📍"
    />
  );
};

export default CandidateOnboardPage;
