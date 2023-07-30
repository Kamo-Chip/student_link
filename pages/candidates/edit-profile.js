import profileStyles from "@/styles/pages/profile.module.css";
import Image from "next/image";
import { BiUserCircle } from "react-icons/bi";
import utilityStyles from "@/styles/utils/utilities.module.css";
import { Router, useRouter } from "next/router";

const user = {
  profilePhoto: "",
  degree: "Computer Science",
  university: "Wits",
  schoolYear: "Undergraduate",
  location: "Johannesburg",
  name: "Kamogelo Khumalo",
  bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint",
  socials: [
    { title: "LinkedIn", link: "#" },
    { title: "GitHub", link: "#" },
  ],
  documents: [{ title: "Resume", link: "#" }],
  videoIntro: "",
  skills: ["Java", "NextJs"],
  experience: ["Tutor, July 2022 - June 2023"],
  projects: [],
  desiredRoles: ["Software Engineer"],
};

const CandidateEditProfilePage = () => {
  const router = useRouter();

  const handleSubmit = () => {
    router.push("/candidates/profile");
  };
  return (
    <>
      <div className={profileStyles.container}>
        <div className={profileStyles.header}>
          <div>
            {user.profilePhoto ? (
              <Image src={opportunity.logo} height={120} width={120} alt="" />
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
            <input
              type="text"
              className={utilityStyles.tab}
              placeholder={user.degree}
            />
            <input
              type="text"
              className={utilityStyles.tab}
              placeholder={user.university}
            />
            <input
              type="text"
              className={utilityStyles.tab}
              placeholder={user.schoolYear}
            />
            <input
              type="text"
              className={utilityStyles.tab}
              placeholder={user.location}
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
          <input className={utilityStyles.heading2} placeholder={user.name} />
          <textarea style={{ marginTop: "1rem", height: "200px" }}>
            {user.bio}
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
            {user.socials.map((element, idx) => {
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
            {user.documents.map((element, idx) => {
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
      <div className={profileStyles.container} style={{ marginTop: "1rem" }}>
        <span className={utilityStyles.heading3}>Video Intro</span>
        <label htmlFor="videoIntro" className={utilityStyles.button}>
          Upload
        </label>
        <input
          type="file"
          style={{ display: "none" }}
          name="videoIntro"
          id="videoIntro"
        />
        {!user.videoIntro ? (
          <div>No video</div>
        ) : (
          <video autoPlay loop style={{ width: "500px", height: "500px" }}>
            <source src={user.videoIntro} />
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
            {user.skills.map((element, idx) => {
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
            {user.experience.map((element, idx) => {
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
            {user.projects.map((element, idx) => {
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
            {user.desiredRoles.map((element, idx) => {
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
