import navigationStyles from "@/styles/ui_elements/navigation.module.css";
import { MdDashboard, MdSearch, MdEvent } from "react-icons/md";
import { BiSolidMessageDetail } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BsBriefcaseFill } from "react-icons/bs";

const Navigation = () => {
  const router = useRouter();
  const [base, setBase] = useState("");

  useEffect(() => {
    setBase(router.pathname.split("/")[1]);
  }, []);

  return (
    <div className={navigationStyles.container}>
      <span onClick={() => router.push(`/${base}/dashboard`)}>
        <MdDashboard size="1.5rem" />
      </span>
      <span
        onClick={() =>
          router.push(
            base == "candidates"
              ? "/candidates/opportunities"
              : "/companies/candidates"
          )
        }
      >
        <MdSearch size="1.5rem" />
      </span>
      <span onClick={() => router.push(`/${base}/events`)}>
        <MdEvent size="1.5rem" />
      </span>
      {base == "candidates" ? (
        <span onClick={() => router.push("/candidates/profile")}>
          <FaUserCircle size="1.5rem" />
        </span>
      ) : (
        <span onClick={() => router.push("/companies/jobs")}>
          <BsBriefcaseFill size="1.5rem" />
        </span>
      )}
    </div>
  );
};

export default Navigation;
