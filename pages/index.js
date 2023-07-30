import { useRouter } from "next/router";
import landingStyles from "@/styles/landing.module.css";
import utilityStyles from "@/styles/utils/utilities.module.css";
import Image from "next/image";
export default function Home() {
  const router = useRouter();

  return (
    <div className={landingStyles.container}>
      <div
        style={{
          position: "absolute",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          marginTop: "2rem",
          top: "0",
          width: "100vw",
          fontSize: "2rem",
          fontWeight: "600",
          padding: "1rem",
          height: "50px",
        }}
      >
        <Image src="/logo.png" width={101.5} height={58.5} alt="" />
        Student-Link
      </div>
      <span
        style={{
          marginTop: "7rem",
          fontSize: "2rem",
          textAlign: "center",
          fontWeight: "500",
        }}
      >
        CONNECTING DREAMS.
        <br />
        INSPIRING GROWTH.
        <br />
      </span>
      <span
        onClick={() => router.push("/candidates/onboard")}
        className={utilityStyles.button}
        style={{ marginTop: "5rem", marginBottom: "1rem", fontSize: "1.5rem" }}
      >
        Candidate sign
      </span>
      <span
        onClick={() => router.push("/companies/onboard")}
        className={utilityStyles.button}
        style={{ fontSize: "1.5rem" }}
      >
        Company sign up
      </span>
      <Image
        src="/landing.png"
        width={175}
        height={479}
        alt=""
        style={{ marginTop: "2rem" }}
      />
    </div>
  );
}
