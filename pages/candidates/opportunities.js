import CustomSelect from "@/components/ui_elements/CustomSelect";
import opportunities from "@/public/data/opportunities.json";
import SearchPage from "@/components/app_elements/SearchPage";
import { locations, industries } from "@/public/data/filterOptions.json";
import { useState } from "react";
const CandidateOpportunitiesPage = () => {
  const [filters, setFilters] = useState([]);

  const handleChange = (e) => {
    const value = e.target.innerText;
    const source = e.target.parentElement.parentElement.id;

    setFilters([...filters, value]);
  };
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
            handleChange={handleChange}
          />
          <CustomSelect
            id="type"
            title="Location"
            options={locations}
            isSearch
            handleChange={handleChange}
            isSm
          />
          <CustomSelect
            id="type"
            title="Industry"
            options={industries}
            isSearch
            handleChange={handleChange}
            isSm
          />
        </>
      }
      elements={opportunities}
    />
  );
};

export default CandidateOpportunitiesPage;
