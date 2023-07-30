import CustomSelect from "@/components/ui_elements/CustomSelect";
import opportunities from "@/public/data/opportunities.json";
import SearchPage from "@/components/app_elements/SearchPage";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase";
import { useEffect, useState } from "react";
const CompaniesCandidatePage = () => {
  const [candidates, setCandidates] = useState(null);
  const getCandidates = async () => {
    let newCandidates = [];
    const res = await getDocs(collection(db, "candidates"));
    res.docs.forEach((doc) => {
      newCandidates.push(doc.data());
    });
    setCandidates(newCandidates);
  };

  useEffect(() => {
    getCandidates();
  }, []);

  if (!candidates) {
    return <div>Loading</div>;
  }
  return (
    <SearchPage
      placeholder={"Search opportunity"}
      filters={
        <>
          <CustomSelect
            id="type"
            title="Type"
            options={["Internship", "Graduate Programme", "Bursary", "Job"]}
            isSearch
            isSm
          />
          <CustomSelect
            id="type"
            title="Location"
            options={["Internship", "Graduate Programme", "Bursary", "Job"]}
            isSearch
            isSm
          />
          <CustomSelect
            id="type"
            title="Industry"
            options={["Internship", "Graduate Programme", "Bursary", "Job"]}
            isSearch
            isSm
          />
        </>
      }
      elements={candidates}
      type="candidate"
    />
  );
};

export default CompaniesCandidatePage;
