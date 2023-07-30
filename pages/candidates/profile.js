import profileStyles from "@/styles/pages/profile.module.css";
import Image from "next/image";
import { BiUserCircle } from "react-icons/bi";
import utilityStyles from "@/styles/utils/utilities.module.css";
import { Router, useRouter } from "next/router";
import { auth, db } from "@/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import CandidateProfile from "@/components/app_elements/CandidateProfile";

const CandidateProfilePage = () => {
  const router = useRouter();
  const [user, loading] = useAuthState(auth);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [userDetails, setUserDetails] = useState(null);

  const getUser = async () => {
    const res = await getDoc(doc(db, "candidates", user.uid));
    setUserDetails(res.data());
  };
  useEffect(() => {
    if (user) {
      getUser();
    }
    console.log(user);
  }, [loading]);

  if (loading || !userDetails?.name) {
    return <div>Loading</div>;
  }

  return <CandidateProfile userDetails={userDetails} />;
};

export default CandidateProfilePage;
