import CustomSelect from "@/components/ui_elements/CustomSelect";
import opportunities from "@/public/data/opportunities.json";
import SearchPage from "@/components/app_elements/SearchPage";
const CandidateOpportunitiesPage = () => {
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
      elements={opportunities}
    />
  );
};

export default CandidateOpportunitiesPage;
