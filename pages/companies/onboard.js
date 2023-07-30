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
import { auth, db, storage } from "@/firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { uploadBytes, getDownloadURL, ref } from "firebase/storage";
import Image from "next/image";
import { HiUser } from "react-icons/hi";
import { useAuthState } from "react-firebase-hooks/auth";

const CompanyOnboardPage = () => {
  const [preferences, setPreferences] = useState({
    industries: [],
    locations: [],
    skills: [],
    roles: [],
    values: [],
    profilePhoto: "",
    profilePhotoTitle: "",
    name: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const provider = new GoogleAuthProvider();
  const router = useRouter();

  const userDetails = {
    profilePhoto: "",
    profilePhotoName: "",
    jobPosts: [],
    events: [],
    schoolYear: "",
    locations: [],
    name: "",
    bio: "",
    socials: [],
    skills: [],
    desiredRoles: [],
    profilePhotoTitle: "",
  };

  const storeLogo = async (id) => {
    const storageRef = ref(storage, `${id}/${imageFile.name}`);
    uploadBytes(storageRef, imageFile)
      .then(() => {
        getDownloadURL(storageRef)
          .then((url) => {
            // setPreferences((prevState) => ({
            //   ...prevState,
            //   profilePhoto: url,
            //   profilePhotoTitle: file.name,
            // }));
            userDetails.profilePhoto = url;
            userDetails.profilePhotoTitle = file.name;
            deleteLogo();
          })
          .catch((err) => console.error(err));
      })
      .catch((err) => console.log(err));
  };

  const handleLogoUpload = async () => {
    const file = document.querySelector("#profilePhoto").files[0];
    if (!file) return;
    setImageFile(file);
    const reader = new FileReader();

    reader.onload = () => {
      const dataURL = reader.result;
      localStorage.setItem("profilePhoto", dataURL);
    };

    reader.readAsDataURL(file);
    setPreferences({
      ...preferences,
      profilePhoto: localStorage.getItem("profilePhoto"),
    });
    console.log(preferences.profilePhoto.name);
  };

  const deleteLogo = () => {
    localStorage.removeItem("profilePhoto");
    setPreferences({
      ...preferences,
      profilePhoto: "",
    });
  };

  const handleSubmit = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      if (result.user) {
        router.push("/companies/dashboard");
        await storeLogo(result.user.uid);
        console.log(userDetails);
        await setDoc(doc(db, "companies", result.user.uid), {
          ...userDetails,
          id: result.user.uid,
          name: preferences.name,
          email: result.user.email,
          values: preferences.values,
          desiredRoles: preferences.roles,
          profilePhoto: userDetails.profilePhoto,
          profilePhotoName: userDetails.profilePhotoName,
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
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <div style={{ marginRight: "2rem" }}>
              {preferences.profilePhoto == "" ? (
                <span
                  style={{
                    marginRight: "1rem",
                  }}
                >
                  <HiUser size="90px" color="#000" />
                </span>
              ) : (
                <Image
                  loader={() => preferences.profilePhoto}
                  src={preferences.profilePhoto}
                  alt="logo"
                  height={90}
                  width={90}
                  style={{
                    marginRight: "1rem",
                  }}
                  className={utilityStyles.profilePhoto}
                />
              )}
            </div>
            {preferences.profilePhoto !== "" ? (
              <span
                onClick={() => {
                  deleteLogo();
                }}
                className={utilityStyles.button}
              >
                Delete logo
              </span>
            ) : (
              <label
                htmlFor="profilePhoto"
                style={{ width: "fit-content" }}
                className={utilityStyles.button}
              >
                Upload logo
              </label>
            )}
            <input
              type="file"
              name="profilePhoto"
              id="profilePhoto"
              style={{ display: "none" }}
              onChange={() => {
                handleLogoUpload();
              }}
            />
          </div>
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
