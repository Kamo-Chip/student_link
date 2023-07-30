import profileStyles from "@/styles/pages/profile.module.css";
import Image from "next/image";
import { BiUserCircle } from "react-icons/bi";
import utilityStyles from "@/styles/utils/utilities.module.css";
import { Router, useRouter } from "next/router";

const CandidateProfile = ({ userDetails, isCompanyViewing }) => {
  const router = useRouter();

  return (
    <>
      {console.log(userDetails)}
      <div className={profileStyles.container}>
        <div className={profileStyles.header}>
          <div>
            {userDetails.profilePhoto ? (
              <Image
                loader={() => userDetails.profilePhoto}
                src={userDetails.profilePhoto}
                style={{ borderRadius: "50%" }}
                height={120}
                width={120}
                alt=""
              />
            ) : (
              <span>
                <BiUserCircle size="120px" />
              </span>
            )}
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <span className={utilityStyles.tab}>
              📜{userDetails.degree ? userDetails.degree : "Not given"}
            </span>
            <span className={utilityStyles.tab}>
              🏛️{userDetails.university ? userDetails.university : "Not given"}
            </span>
            <span className={utilityStyles.tab}>
              {userDetails.schoolYear == "Undergraduate"
                ? "🐣"
                : userDetails.schoolYear == "Postgraduate"
                ? "🐥"
                : "🐔"}{" "}
              {userDetails.schoolYear}
            </span>
            <span className={utilityStyles.tab}>📍{userDetails.location}</span>
          </div>
          {!isCompanyViewing ? (
            <span
              className={utilityStyles.button1}
              style={{ position: "absolute", top: ".5rem", right: ".5rem" }}
              onClick={() => router.push("/candidates/edit-profile")}
            >
              Edit profile
            </span>
          ) : (
            <a
              className={utilityStyles.button1}
              href={`mailto:${userDetails.email}`}
              style={{ position: "absolute", top: ".5rem", right: ".5rem" }}
            >
              Message
            </a>
          )}
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
          <span className={utilityStyles.heading2}>{userDetails.name}</span>
          <span>{userDetails.bio}</span>
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
        <span className={utilityStyles.heading3}>Video Intro</span>
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

export default CandidateProfile;
