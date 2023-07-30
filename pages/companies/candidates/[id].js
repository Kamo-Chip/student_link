import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db, auth } from "@/firebase";
import CandidateProfile from "@/components/app_elements/CandidateProfile";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";

export const getStaticProps = async (context) => {
  const q = query(
    collection(db, "candidates"),
    where("id", "==", context.params.id)
  );
  const querySnapshot = await getDocs(q);

  let candidate = null;
  querySnapshot.forEach((doc) => {
    candidate = doc.data();
  });

  return {
    props: { candidate: candidate },
  };
};

export const getStaticPaths = async () => {
  let candidates = [];
  const snapshot = await getDocs(collection(db, "candidates"));
  snapshot.forEach((doc) => {
    candidates.push({ ...doc.data() });
  });

  const paths = candidates.map((candidate) => {
    return {
      params: { id: candidate.id },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

const CompanyCandidateViewPage = ({ candidate }) => {
  useEffect(() => {
    console.log(candidate);
  });
  if (!candidate) {
    return <div>Loading</div>;
  }
  return <CandidateProfile userDetails={candidate} isCompanyViewing={true} />;
};

export default CompanyCandidateViewPage;
