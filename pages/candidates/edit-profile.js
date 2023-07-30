import profileStyles from "@/styles/pages/profile.module.css";
import Image from "next/image";
import { BiUserCircle } from "react-icons/bi";
import utilityStyles from "@/styles/utils/utilities.module.css";
import { Router, useRouter } from "next/router";
import { auth, db, storage } from "@/firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { setDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import {
  uploadBytes,
  getDownloadURL,
  ref,
  deleteObject,
} from "firebase/storage";
import { useAmp } from "next/amp";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";

const CandidateEditProfilePage = () => {
  const router = useRouter();
  const [user] = useAuthState(auth);
  const [userDetails, setUserDetails] = useState(null);

  const getUser = async () => {
    const res = await getDoc(doc(db, "candidates", user.uid));
    setUserDetails(res.data());
  };

  const handleProfilePhotoUpload = async (e) => {
    e.preventDefault();
    await deleteProfilePhoto();

    const file = document.querySelector("#profilePhoto").files[0];
    if (!file) return;

    const storageRef = ref(storage, `${user.uid}/profilePhoto/${file.name}`);
    uploadBytes(storageRef, file)
      .then(() => {
        getDownloadURL(storageRef)
          .then((url) => {
            setUserDetails((prevState) => ({
              ...prevState,
              profilePhoto: url,
            }));
            setUserDetails((prevState) => ({
              ...prevState,
              imageName: file.name,
            }));
            document.querySelector("#profilePhoto").value = "";
            console.log(file);
          })
          .catch((err) => console.error(err));
      })
      .catch((err) => console.log(err));
  };

  const deleteProfilePhoto = async (e) => {
    const storageRef = ref(
      storage,
      `${user.uid}/profilePhoto/${userDetails.imageName}`
    );

    deleteObject(storageRef)
      .then(() => {
        setUserDetails({ ...userDetails, profilePhoto: "" });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleIntroVideoUpload = async (e) => {
    e.preventDefault();
    await deleteIntroVideo();

    const file = document.querySelector("#video").files[0];
    if (!file) return;

    const storageRef = ref(storage, `${user.uid}/introVideo/${file.name}`);
    uploadBytes(storageRef, file)
      .then(() => {
        getDownloadURL(storageRef)
          .then((url) => {
            setUserDetails((prevState) => ({
              ...prevState,
              introVideo: url,
            }));
            setUserDetails((prevState) => ({
              ...prevState,
              introVideoName: file.name,
            }));
            document.querySelector("#video").value = "";
          })
          .catch((err) => console.error(err));
      })
      .catch((err) => console.log(err));
  };

  const deleteIntroVideo = async (e) => {
    const storageRef = ref(
      storage,
      `${user.uid}/introVideo/${userDetails.introVideoName}`
    );

    deleteObject(storageRef)
      .then(() => {
        setUserDetails({ ...userDetails, introVideo: "", introVideoName: "" });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSubmit = async () => {
    await updateDoc(doc(db, "candidates", user.uid), userDetails);
    router.push("/candidates/profile");
  };

  const handleChange = (e) => {
    setUserDetails({ ...userDetails, [e.target.id]: e.target.value });
  };

  useEffect(() => {
    console.log(userDetails);
  }, [userDetails]);
  useEffect(() => {
    if (user) {
      getUser();
    }
  }, [user]);

  if (!userDetails) {
    return <div>Loading</div>;
  }
  return (
    <>
      <div className={profileStyles.container}>
        <div className={profileStyles.header}>
          <div>
            {userDetails.profilePhoto ? (
              <Image
                loader={() => userDetails.profilePhoto}
                src={userDetails.profilePhoto}
                height={120}
                width={120}
                alt=""
              />
            ) : (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <BiUserCircle size="120px" />
                <label className={utilityStyles.button} htmlFor="profilePhoto">
                  Upload
                </label>
                <input
                  type="file"
                  id="profilePhoto"
                  style={{ display: "none" }}
                  onChange={handleProfilePhotoUpload}
                />
              </div>
            )}
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <input
              type="text"
              id="degree"
              handleChange={handleChange}
              className={utilityStyles.tab}
              placeholder={userDetails.degree}
            />
            <input
              type="text"
              id="university"
              handleChange={handleChange}
              className={utilityStyles.tab}
              placeholder={userDetails.university}
            />
            <input
              type="text"
              id="schoolYear"
              handleChange={handleChange}
              className={utilityStyles.tab}
              placeholder={userDetails.schoolYear}
            />
            <input
              type="text"
              id="location"
              handleChange={handleChange}
              className={utilityStyles.tab}
              placeholder={userDetails.location}
            />
          </div>
          <span
            className={utilityStyles.button1}
            style={{ position: "absolute", top: ".5rem", right: ".5rem" }}
            onClick={handleSubmit}
          >
            Save changes
          </span>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: "1rem",
            paddingBottom: "1rem",
            borderBottom: "solid 1px var(--border-grey)",
          }}
        >
          <input
            className={utilityStyles.heading2}
            id="name"
            onChange={handleChange}
            placeholder={userDetails.name}
          />
          <textarea
            style={{ marginTop: "1rem", height: "200px" }}
            id="bio"
            onChange={handleChange}
          >
            {userDetails.bio}
          </textarea>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: "1rem",
            paddingBottom: "1rem",
            borderBottom: "solid 1px var(--border-grey)",
          }}
        >
          <span className={utilityStyles.heading3}>Socials</span>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              marginTop: ".5rem",
            }}
          >
            {userDetails.socials.map((element, idx) => {
              return (
                <a
                  href={element.link}
                  key={`skill${idx}`}
                  className={utilityStyles.tab}
                  style={{ marginRight: "1rem" }}
                >
                  {element.title}
                </a>
              );
            })}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: "1rem",
          }}
        >
          <span className={utilityStyles.heading3}>Documents</span>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              marginTop: ".5rem",
            }}
          >
            {userDetails.documents.map((element, idx) => {
              return (
                <a
                  href={element.link}
                  key={`skill${idx}`}
                  className={utilityStyles.tab}
                  style={{ marginRight: "1rem" }}
                >
                  {element.title}
                </a>
              );
            })}
          </div>
        </div>
      </div>
      <div
        style={{ marginTop: "1rem", display: "flex", flexDirection: "column" }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "1rem",
          }}
        >
          <span className={utilityStyles.heading3}>Video Intro</span>
          {!userDetails.introVideo ? (
            <label htmlFor="video" className={utilityStyles.button}>
              Upload
            </label>
          ) : (
            <span className={utilityStyles.button}>Delete</span>
          )}
        </div>

        <input
          type="file"
          style={{ display: "none" }}
          name="video"
          id="video"
          onChange={handleIntroVideoUpload}
        />
        {!userDetails.introVideo ? (
          <div>No video</div>
        ) : (
          <video
            controls
            width="200"
            style={{ maxHeight: "140px", width: "auto" }}
            id="introVideo"
          >
            <source src={userDetails.introVideo} type="video/mp4" />
          </video>
        )}
      </div>
      <div className={profileStyles.container} style={{ marginTop: "1rem" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            paddingBottom: "1rem",
            borderBottom: "solid 1px var(--border-grey)",
          }}
        >
          <span className={utilityStyles.heading3}>Skills</span>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              marginTop: ".5rem",
            }}
          >
            {userDetails.skills.map((element, idx) => {
              return (
                <span
                  key={`skill${idx}`}
                  className={utilityStyles.tab}
                  style={{ marginRight: "1rem" }}
                >
                  {element}
                </span>
              );
            })}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            paddingBottom: "1rem",
            marginTop: "1rem",
            borderBottom: "solid 1px var(--border-grey)",
          }}
        >
          <span className={utilityStyles.heading3}>Experience</span>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              marginTop: ".5rem",
            }}
          >
            {userDetails.experience.map((element, idx) => {
              return (
                <span
                  key={`exp${idx}`}
                  className={utilityStyles.tab}
                  style={{ marginRight: "1rem" }}
                >
                  {element}
                </span>
              );
            })}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            paddingBottom: "1rem",
            marginTop: "1rem",
            borderBottom: "solid 1px var(--border-grey)",
          }}
        >
          <span className={utilityStyles.heading3}>Projects</span>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              marginTop: ".5rem",
            }}
          >
            {userDetails.projects.map((element, idx) => {
              return (
                <span
                  key={`proj${idx}`}
                  className={utilityStyles.tab}
                  style={{ marginRight: "1rem" }}
                >
                  {element}
                </span>
              );
            })}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: "1rem",
          }}
        >
          <span className={utilityStyles.heading3}>Desired Roles</span>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              marginTop: ".5rem",
            }}
          >
            {userDetails.desiredRoles.map((element, idx) => {
              return (
                <span
                  key={`role${idx}`}
                  className={utilityStyles.tab}
                  style={{ marginRight: "1rem" }}
                >
                  {element}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default CandidateEditProfilePage;
