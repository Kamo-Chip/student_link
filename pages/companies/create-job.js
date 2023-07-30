import { auth, db } from "@/firebase";
import createPageStyles from "@/styles/pages/create.module.css";
import utilityStyles from "@/styles/utils/utilities.module.css";
import { doc, getDoc, addDoc, collection } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import CustomSelect from "@/components/ui_elements/CustomSelect";
import { locations } from "@/public/data/filterOptions.json";
import Router from "next/router";
const CompanyCreateJobPage = () => {
  const [user, loading] = useAuthState(auth);
  const [jobDetails, setJobDetails] = useState({
    title: "",
    location: "",
    type: "",
    link: "",
    profilePhoto: "",
    industry: "",
    company: "",
    companyId: "",
  });
  const [companyDetails, setCompanyDetails] = useState(null);

  const getCompany = async () => {
    const res = await getDoc(doc(db, "companies", user.uid));
    setCompanyDetails(res.data());
  };

  const handleSubmit = async () => {
    await addDoc(collection(db, "jobs"), {
      ...jobDetails,
      companyId: user.uid,
      company: companyDetails.name,
      profilePhoto: companyDetails.profilePhoto,
      industry: companyDetails.industries[0],
    });
    Router.push("/companies/jobs");
  };

  const handleChange = (e) => {
    setJobDetails({ ...jobDetails, [e.target.id]: e.target.value });
  };

  const handleSelectChange = (e) => {
    const source = e.target.parentElement.parentElement.id;
    const value = e.target.innerText;
    setJobDetails({ ...jobDetails, [source]: value });
  };

  useEffect(() => {
    if (user) {
      getCompany();
    }
  }, [user]);

  return (
    <div className={createPageStyles.container}>
      <span
        className={utilityStyles.heading2}
        style={{ textAlign: "center", marginBottom: "1rem" }}
      >
        Create Job
      </span>
      <span>Title</span>
      <input
        type="text"
        id="title"
        style={{ marginBottom: "1rem" }}
        onChange={handleChange}
      />
      <span>Link</span>
      <input
        type="text"
        id="link"
        style={{ marginBottom: "1rem" }}
        onChange={handleChange}
      />
      <span>Location</span>
      <CustomSelect
        id="location"
        title="Select"
        options={locations}
        showSelectedOptionAsTitle
        isSearch
        handleChange={handleSelectChange}
      />
      <span>Type</span>
      <CustomSelect
        id="type"
        title="Select"
        options={["Internship", "Graduate Programme", "Bursary", "Job"]}
        showSelectedOptionAsTitle
        isSearch
        handleChange={handleSelectChange}
      />
      <span
        className={utilityStyles.button}
        style={{ alignSelf: "center" }}
        onClick={handleSubmit}
      >
        Done
      </span>
    </div>
  );
};

export default CompanyCreateJobPage;
